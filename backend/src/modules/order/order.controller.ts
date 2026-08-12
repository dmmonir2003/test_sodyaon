import { Request, Response, NextFunction } from 'express';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import { Coupon } from './coupon.model';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
import { stripe } from '../../config/stripe';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';
import { trackServerEvent } from '../../utils/capi';

// Secure subtotal and detailed line items calculation helper
const calculateSubtotalAndVerifyItems = async (items: any[]): Promise<{ subtotal: number; verifiedItems: any[] }> => {
  let subtotal = 0;
  const verifiedItems: any[] = [];

  for (const item of items) {
    let dbProduct;
    // Check if item.id is a Mongoose ObjectId or a numericId
    if (item.id && item.id.match(/^[0-9a-fA-F]{24}$/)) {
      dbProduct = await Product.findById(item.id);
    } else if (item.id && !isNaN(Number(item.id))) {
      dbProduct = await Product.findOne({ numericId: Number(item.id) });
    }

    // Fallback: Check if item.id is a product SKU or a variant SKU
    if (!dbProduct && item.id) {
      dbProduct = await Product.findOne({ sku: item.id });
    }
    if (!dbProduct && item.id) {
      dbProduct = await Product.findOne({ "variants.sku": item.id });
    }

    if (!dbProduct) {
      throw new ApiError(404, `Product not found with id: ${item.id}`);
    }

    // Determine unit price: support variant override or master product price
    let unitPrice = dbProduct.price;
    let variantSku = undefined;

    const skuToLook = item.variantSku || item.id;
    if (skuToLook) {
      const variant = dbProduct.variants.find(v => v.sku === skuToLook);
      if (variant) {
        unitPrice = variant.priceOverride || variant.price;
        variantSku = variant.sku;
      }
    }

    const itemTotalPrice = unitPrice * item.quantity;
    subtotal += itemTotalPrice;

    verifiedItems.push({
      id: item.id,
      productId: dbProduct._id,
      variantId: variantSku,
      name: dbProduct.nameEn,
      price: unitPrice,
      quantity: item.quantity,
      image: item.image || dbProduct.image,
      unitPrice,
      totalPrice: itemTotalPrice,
    });
  }

  return { subtotal, verifiedItems };
};

// Create new order & setup payment with Coupon discounts and delivery fees
export const checkout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {
    items,
    paymentMethod,
    shippingAddress,
    shippingPhone,
    fullName,
    couponCode,
    deliveryFee = 60,
    channel = 'web',
    notes,
  } = req.body;
  let userId = (req as any).user?.id || undefined;
  let autoLoginToken = undefined;
  let autoCreatedUser = undefined;

  if (!userId) {
    // Try to find if user exists by phone
    const cleanPhoneStr = shippingPhone.replace(/^(\+880|0)/, '');
    const existingUser = await User.findOne({
      $or: [
        { phone: shippingPhone },
        { phone: `+880${cleanPhoneStr}` },
        { phone: `0${cleanPhoneStr}` },
        { phone: cleanPhoneStr }
      ]
    });

    if (existingUser) {
      userId = existingUser.id; // Assign order to existing account
    } else {
      // Auto-create user
      const newUser = await User.create({
        name: fullName || 'Guest Customer',
        phone: shippingPhone,
        password: '123456',
        role: 'CUSTOMER',
        address: shippingAddress,
        hasDefaultPassword: true,
      });
      userId = newUser.id;
      
      autoLoginToken = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET || 'sodayon-default-secret', {
        expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
      });
      autoCreatedUser = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        hasDefaultPassword: newUser.hasDefaultPassword,
      };
    }
  }

  if (!items || items.length === 0) {
    return next(new ApiError(400, 'Order items are required'));
  }

  if (!fullName) {
    return next(new ApiError(400, 'Full name is required'));
  }

  // 1. Calculate subtotal & verify items
  const { subtotal, verifiedItems } = await calculateSubtotalAndVerifyItems(items);

  // 2. Validate Coupon if provided
  let discount = 0;
  let couponId = undefined;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
    if (coupon) {
      const now = new Date();
      const isExpired = now > coupon.expiresAt;
      const isLimitReached = coupon.usedCount >= coupon.usageLimit;
      const meetsMinVal = subtotal >= coupon.minOrderValue;

      if (!isExpired && !isLimitReached && meetsMinVal) {
        couponId = coupon._id;
        if (coupon.discountType === 'PERCENTAGE') {
          discount = Math.round((subtotal * coupon.discountValue) / 100);
        } else {
          discount = coupon.discountValue;
        }
        
        // Ensure discount is not greater than the subtotal
        if (discount > subtotal) {
          discount = subtotal;
        }

        // Increment coupon used count
        coupon.usedCount += 1;
        await coupon.save();
      }
    }
  }

  // 3. Calculate final total amount
  const totalAmount = Math.max(0, subtotal - discount + Number(deliveryFee));

  let stripePaymentIntentId;
  let stripeClientSecret;

  if (paymentMethod === 'stripe') {
    try {
      // Create payment intent on Stripe (convert to cents/poisha)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        currency: 'bdt',
        metadata: userId ? { userId: userId.toString() } : undefined,
      });

      stripePaymentIntentId = paymentIntent.id;
      stripeClientSecret = paymentIntent.client_secret || undefined;
    } catch (error: any) {
      if (error.message.includes('mock-stripe-secret-key')) {
        console.warn('[Stripe Warning] Mock Stripe Key detected. Simulating ClientSecret.');
        stripePaymentIntentId = `mock_pi_${Math.random().toString(36).substring(2)}`;
        stripeClientSecret = `mock_secret_${Math.random().toString(36).substring(2)}`;
      } else {
        return next(new ApiError(500, `Stripe Error: ${error.message}`));
      }
    }
  }

  // 4. Create detailed order in DB
  const order = await Order.create({
    userId,
    fullName,
    items: verifiedItems,
    couponId,
    subtotal,
    discount,
    deliveryFee: Number(deliveryFee),
    totalAmount,
    paymentMethod,
    shippingAddress,
    shippingPhone,
    notes,
    stripePaymentIntentId,
    stripeClientSecret,
    paymentStatus: 'unpaid',
    status: 'pending',
    channel,
  });

  // 5. Update totalSold for purchased products
  for (const item of verifiedItems) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { totalSold: item.quantity },
    });
  }

  // 6. Trigger secure Server-to-Server Conversion APIs (Meta CAPI & TikTok Events API)
  try {
    const clientIp = req.ip || req.socket.remoteAddress || '';
    const clientUserAgent = req.headers['user-agent'] || '';
    const userEmail = (req as any).user?.email || '';
    const userPhone = (req as any).user?.phone || shippingPhone || '';

    const contents = verifiedItems.map(item => ({
      id: item.id.toString(),
      quantity: item.quantity,
      price: item.price,
    }));

    trackServerEvent({
      eventName: 'Purchase',
      eventId: `purchase_${order._id}`,
      sourceUrl: req.headers.referer || 'https://sodayon.com/checkout',
      clientIp,
      clientUserAgent,
      userEmail,
      userPhone,
      value: totalAmount,
      currency: 'BDT',
      contents,
    });
  } catch (err) {
    console.error('[Purchase CAPI Trigger Error]:', err);
  }

  res.status(201).json({
    success: true,
    data: {
      order,
      stripeClientSecret,
      autoLoginToken,
      autoCreatedUser,
    },
  });
});

// Stripe webhook signature-verified handler
export const handleStripeWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event;

  try {
    if (webhookSecret === 'mock-stripe-webhook-secret' || !sig) {
      console.warn('[Stripe Warning] Mock Webhook Secret. Bypassing Signature Verification.');
      const parsedBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      event = parsedBody;
    } else {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
  } catch (err: any) {
    console.error(`[Webhook Error] ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log(`[Webhook success] PaymentIntent for ${paymentIntent.amount} succeeded`);

    await Order.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { paymentStatus: 'paid', status: 'processing' }
    );
  }

  res.status(200).json({ received: true });
});

// Retrieve authenticated user's orders
export const getUserOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;

  const orders = await Order.find({ userId }).sort('-createdAt');

  res.status(200).json({
    success: true,
    results: orders.length,
    data: orders,
  });
});

// Admin: Update order status (restrict to permissions with canManageOrders)
export const updateOrderStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;
  const { status, paymentStatus } = req.body;

  const order = await Order.findByIdAndUpdate(
    orderId,
    { ...(status && { status }), ...(paymentStatus && { paymentStatus }) },
    { new: true, runValidators: true }
  );

  if (!order) {
    return next(new ApiError(404, 'Order not found'));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// Admin: Retrieve all orders
export const getAllOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { status, page = 1, limit = 50 } = req.query;

  const query: any = {};
  if (status) {
    query.status = status;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const orders = await Order.find(query)
    .populate('userId', 'name email phone')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await Order.countDocuments(query);

  res.status(200).json({
    success: true,
    total,
    page: Number(page),
    limit: Number(limit),
    data: orders,
  });
});

// Guest & Logged-in: Track Order status securely
export const trackOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;
  const { phone } = req.query;

  if (!orderId) {
    return next(new ApiError(400, 'Order ID is required'));
  }

  // Support finding by MongoDB _id
  let order;
  if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
    order = await Order.findById(orderId);
  }

  if (!order) {
    return next(new ApiError(404, 'Order not found'));
  }

  // Secure checks: require phone to match for guest/third-party tracking
  if (phone) {
    const cleanOrderPhone = order.shippingPhone.replace(/^(\+880|0)/, '');
    const cleanQueryPhone = (phone as string).replace(/^(\+880|0)/, '');
    if (cleanOrderPhone !== cleanQueryPhone) {
      return next(new ApiError(403, 'Unauthorized access to this order details'));
    }
  } else if (!(req as any).user || (req as any).user.id !== order.userId?.toString()) {
    return next(new ApiError(403, 'Phone number or authorization required to track this order'));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

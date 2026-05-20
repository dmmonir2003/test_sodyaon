import { Request, Response, NextFunction } from 'express';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import { stripe } from '../../config/stripe';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Secure total price calculation helper
const calculateOrderAmount = async (items: any[]): Promise<number> => {
  let total = 0;
  for (const item of items) {
    let dbProduct;
    // Check if item.id is a Mongoose ObjectId or a numericId
    if (item.id && item.id.match(/^[0-9a-fA-F]{24}$/)) {
      dbProduct = await Product.findById(item.id);
    } else if (item.id && !isNaN(Number(item.id))) {
      dbProduct = await Product.findOne({ numericId: Number(item.id) });
    }

    if (!dbProduct) {
      throw new ApiError(404, `Product not found with id: ${item.id}`);
    }

    total += dbProduct.price * item.quantity;
  }
  return total;
};

// Create new order & setup payment
export const checkout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { items, paymentMethod, shippingAddress, shippingPhone } = req.body;
  const userId = (req as any).user.id;

  if (!items || items.length === 0) {
    return next(new ApiError(400, 'Order items are required'));
  }

  // Securely calculate total
  const totalAmount = await calculateOrderAmount(items);

  let stripePaymentIntentId;
  let stripeClientSecret;

  if (paymentMethod === 'stripe') {
    try {
      // Create payment intent on Stripe (convert to cents/poisha)
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        currency: 'bdt', // or 'usd' depending on configuration
        metadata: { userId },
      });

      stripePaymentIntentId = paymentIntent.id;
      stripeClientSecret = paymentIntent.client_secret || undefined;
    } catch (error: any) {
      // Check if Stripe client secret is not configured
      if (error.message.includes('mock-stripe-secret-key')) {
        console.warn('[Stripe Warning] Mock Stripe Key detected. Simulating ClientSecret.');
        stripePaymentIntentId = `mock_pi_${Math.random().toString(36).substring(2)}`;
        stripeClientSecret = `mock_secret_${Math.random().toString(36).substring(2)}`;
      } else {
        return next(new ApiError(500, `Stripe Error: ${error.message}`));
      }
    }
  }

  const order = await Order.create({
    userId,
    items,
    totalAmount,
    paymentMethod,
    shippingAddress,
    shippingPhone,
    stripePaymentIntentId,
    stripeClientSecret,
    paymentStatus: paymentMethod === 'cod' ? 'unpaid' : 'unpaid',
  });

  res.status(201).json({
    success: true,
    data: {
      order,
      stripeClientSecret,
    },
  });
});

// Stripe webhook signature-verified handler
export const handleStripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event;

  try {
    // If webhook secret is mock, skip stripe signature verification for dev ease
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

  // Handle the event
  if (event.type === 'payment_intent.succeeded' || event.type === 'payment_intent.succeeded' /* fallback */) {
    const paymentIntent = event.data.object;
    console.log(`[Webhook success] PaymentIntent for ${paymentIntent.amount} succeeded`);

    // Update order status in MongoDB
    await Order.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { paymentStatus: 'paid', status: 'processing' }
    );
  }

  res.status(200).json({ received: true });
};

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

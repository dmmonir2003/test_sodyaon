import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function runTest() {
  console.log('🚀 Starting Backend Flow Verification Test...');

  try {
    // 1. Admin Login
    console.log('\n🔐 Logging in as Admin...');
    const adminLoginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@sodayon.com',
      password: 'admin123',
    });

    const adminToken = adminLoginRes.data.data.token;
    console.log(`✅ Admin logged in successfully! Token: ${adminToken.substring(0, 15)}...`);

    const adminHeaders = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    };

    // 2. Add product as Admin
    const uniqueSku = `TEST-LEGO-${Date.now()}`;
    const uniqueSlug = `test-lego-${Date.now()}`;
    console.log(`\n📦 Creating new product as Admin (SKU: ${uniqueSku})...`);

    const productPayload = {
      sku: uniqueSku,
      slug: uniqueSlug,
      brandEn: 'Sodayon Lego Tests',
      brandBn: 'সদায়ণ লেগো টেস্ট',
      nameEn: 'Lego Creator Test Block Set',
      nameBn: 'লেগো ক্রিয়েটর টেস্ট ব্লক সেট',
      name: 'Lego Creator Test Block Set',
      descriptionEn: 'This is a test product created by the automated API validation script.',
      description: 'This is a test product created by the automated API validation script.',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600',
      images: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600'],
      price: 1500,
      status: 'active',
      isPublished: true,
      variants: [
        {
          sku: `${uniqueSku}-VAR`,
          nameEn: 'Default Variant',
          nameBn: 'ডিফল্ট সংস্করণ',
          price: 1500,
          stock: 10,
          options: { Color: 'Standard' },
        },
      ],
    };

    const createProductRes = await axios.post(`${BASE_URL}/products`, productPayload, adminHeaders);
    const createdProduct = createProductRes.data.data;
    const productId = createdProduct.id;
    console.log(`✅ Product created successfully! ID: ${productId}`);

    // 3. Guest Checkout
    console.log('\n🛒 Placing order as Guest Customer...');
    const guestCheckoutPayload = {
      items: [
        {
          id: productId,
          quantity: 1,
        },
      ],
      paymentMethod: 'cod',
      shippingAddress: 'Flat 4A, House 12, Road 5, Dhanmondi, Dhaka',
      shippingPhone: '01999999999',
      fullName: 'John Guest Doe',
      deliveryFee: 60,
    };

    const guestOrderRes = await axios.post(`${BASE_URL}/orders/checkout`, guestCheckoutPayload);
    const guestOrder = guestOrderRes.data.data.order;
    console.log(`✅ Guest order placed successfully! Order ID: ${guestOrder.id || guestOrder._id}`);

    // 4. Register or Login Regular Customer
    const testCustomerEmail = `customer_${Date.now()}@example.com`;
    const testCustomerPhone = `017${Math.floor(10000000 + Math.random() * 90000000)}`;
    console.log(`\n👤 Registering new customer (Email: ${testCustomerEmail}, Phone: ${testCustomerPhone})...`);

    const customerRegisterRes = await axios.post(`${BASE_URL}/auth/register`, {
      name: 'Loggedin Test Customer',
      email: testCustomerEmail,
      phone: testCustomerPhone,
      password: 'customer123',
      address: 'Mirpur, Dhaka',
    });

    const customerToken = customerRegisterRes.data.data.token;
    console.log(`✅ Customer registered/logged in successfully! Token: ${customerToken.substring(0, 15)}...`);

    const customerHeaders = {
      headers: {
        Authorization: `Bearer ${customerToken}`,
      },
    };

    // 5. Customer Checkout (Logged-in)
    console.log('\n🛒 Placing order as Logged-in Customer...');
    const customerCheckoutPayload = {
      items: [
        {
          id: productId,
          quantity: 2, // 2 items this time
        },
      ],
      paymentMethod: 'cod',
      shippingAddress: 'Sector 4, Uttara, Dhaka',
      shippingPhone: testCustomerPhone,
      fullName: 'Loggedin Test Customer',
      deliveryFee: 60,
    };

    const customerOrderRes = await axios.post(`${BASE_URL}/orders/checkout`, customerCheckoutPayload, customerHeaders);
    const customerOrder = customerOrderRes.data.data.order;
    console.log(`✅ Customer order placed successfully! Order ID: ${customerOrder.id || customerOrder._id}`);

    // 6. Admin verify orders
    console.log('\n📋 Fetching orders as Admin to verify...');
    const getOrdersRes = await axios.get(`${BASE_URL}/orders`, adminHeaders);
    const allOrders = getOrdersRes.data.data;

    const guestId = guestOrder.id || guestOrder._id;
    const customerId = customerOrder.id || customerOrder._id;

    const guestOrderVerified = allOrders.find((o: any) => (o.id || o._id) === guestId);
    const customerOrderVerified = allOrders.find((o: any) => (o.id || o._id) === customerId);

    if (guestOrderVerified && customerOrderVerified) {
      console.log('🎉 SUCCESS: Both Guest and Logged-in Customer orders verified in Admin DB!');
      console.log(`- Guest Order: ${guestOrderVerified.id || guestOrderVerified._id} (${guestOrderVerified.fullName}, total: ৳${guestOrderVerified.totalAmount})`);
      console.log(`- Customer Order: ${customerOrderVerified.id || customerOrderVerified._id} (${customerOrderVerified.fullName}, total: ৳${customerOrderVerified.totalAmount})`);
    } else {
      throw new Error('❌ FAILED: Orders could not be verified in the orders list.');
    }

  } catch (error: any) {
    console.error('❌ Test failed with error:');
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

runTest();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const OrderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', OrderSchema, 'orders');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || '');
  console.log('Connected to DB');
  
  const orders = await Order.find({
    fullName: { $in: [/Guest Customer Doe/i, /Logged Customer Smith/i, /Loggedin Test/i] }
  }).sort({ createdAt: -1 });
  console.log('Test orders:');
  console.log(JSON.stringify(orders, null, 2));
  
  await mongoose.disconnect();
}

run().catch(console.error);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../src/modules/product/product.model';
import { PRODUCTS } from '../../frontend/src/data/database';

dotenv.config();

const seed = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/sodayon';
    await mongoose.connect(uri);
    console.log('[Seeding] Connected to MongoDB...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('[Seeding] Cleared existing products in MongoDB');

    // Map frontend data to backend schema
    const mappedProducts = PRODUCTS.map((p: any) => ({
      numericId: p.id,
      name: p.name,
      bengaliName: p.bengaliName,
      categoryId: p.categoryId,
      price: p.price,
      originalPrice: p.originalPrice,
      rating: p.rating,
      reviews: p.reviews,
      image: p.image,
      description: p.description,
      bengaliDescription: p.bengaliDescription,
      ageRange: p.ageRange,
      stock: p.stock || 50,
      tags: p.tags || [],
      features: p.features || [],
      bestseller: !!p.bestseller,
      new: !!p.new,
      discount: p.discount || 0,
    }));

    await Product.insertMany(mappedProducts);
    console.log(`[Seeding Successful] Populated ${mappedProducts.length} products!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('[Seeding Error]', error);
    process.exit(1);
  }
};

seed();

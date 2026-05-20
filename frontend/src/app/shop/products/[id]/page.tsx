// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import { Star, ShoppingCart, Heart, Share2, ArrowLeft, Check } from 'lucide-react';
// import { getProductById, getCategoryById, getProductsByCategory } from '@/data/database';

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function ProductDetailPage({ params }: PageProps) {
//   const { id } = await params;
//   const productId = parseInt(id);
//   const product = getProductById(productId);

//   if (!product) {
//     notFound();
//   }

//   const category = getCategoryById(product.categoryId);
//   const relatedProducts = getProductsByCategory(product.categoryId)
//     .filter(p => p.id !== product.id)
//     .slice(0, 4);

//   return (
//     <main className="min-h-screen bg-white dark:bg-slate-900">
//       {/* Breadcrumb */}
//       <div className="bg-slate-50 dark:bg-slate-800 px-4 sm:px-6 lg:px-8 py-4">
//         <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
//           <Link href="/shop" className="text-primary-600 hover:text-primary-700">
//             Shop
//           </Link>
//           <span className="text-slate-400">/</span>
//           {category && (
//             <>
//               <Link href={`/shop/${category.slug}`} className="text-primary-600 hover:text-primary-700">
//                 {category.bengaliName}
//               </Link>
//               <span className="text-slate-400">/</span>
//             </>
//           )}
//           <span className="text-slate-600 dark:text-slate-400">{product.name}</span>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <Link
//           href="/shop"
//           className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Shop
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Image */}
//           <div className="flex items-center justify-center">
//             <div className={`w-full aspect-square rounded-lg ${product.image} shadow-lg`} />
//           </div>

//           {/* Product Details */}
//           <div className="flex flex-col">
//             {/* Title & Category */}
//             <div className="mb-6">
//               <div className="inline-flex items-center gap-2 mb-3">
//                 {product.bestseller && (
//                   <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full">
//                     Bestseller
//                   </span>
//                 )}
//                 {product.new && (
//                   <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
//                     New
//                   </span>
//                 )}
//                 {product.discount && (
//                   <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-semibold rounded-full">
//                     -{product.discount}%
//                   </span>
//                 )}
//               </div>
//               <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
//                 {product.name}
//               </h1>
//               {product.bengaliName && (
//                 <p className="text-lg text-slate-600 dark:text-slate-400">
//                   {product.bengaliName}
//                 </p>
//               )}
//             </div>

//             {/* Rating */}
//             <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < Math.floor(product.rating)
//                         ? 'fill-amber-400 text-amber-400'
//                         : 'text-slate-300 dark:text-slate-600'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-lg font-semibold text-slate-900 dark:text-white">
//                 {product.rating}
//               </span>
//               <span className="text-sm text-slate-600 dark:text-slate-400">
//                 ({product.reviews} reviews)
//               </span>
//             </div>

//             {/* Price */}
//             <div className="mb-6">
//               <div className="flex items-baseline gap-3">
//                 <span className="text-4xl font-bold text-slate-900 dark:text-white">
//                   ৳{product.price}
//                 </span>
//                 {product.originalPrice && (
//                   <span className="text-xl text-slate-500 dark:text-slate-400 line-through">
//                     ৳{product.originalPrice}
//                   </span>
//                 )}
//               </div>
//               {product.discount && (
//                 <p className="text-sm text-green-600 dark:text-green-400 mt-2">
//                   You save ৳{Math.round((product.originalPrice || product.price) * product.discount / 100)}
//                 </p>
//               )}
//             </div>

//             {/* Description */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
//                 Description
//               </h3>
//               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
//                 {product.description}
//               </p>
//               {product.bengaliDescription && (
//                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
//                   {product.bengaliDescription}
//                 </p>
//               )}
//             </div>

//             {/* Product Info */}
//             <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
//               {product.ageRange && (
//                 <div>
//                   <p className="text-sm text-slate-600 dark:text-slate-400">Age Range</p>
//                   <p className="font-semibold text-slate-900 dark:text-white">
//                     {product.ageRange}
//                   </p>
//                 </div>
//               )}
//               <div>
//                 <p className="text-sm text-slate-600 dark:text-slate-400">Stock</p>
//                 <p className={`font-semibold ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                   {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
//                 </p>
//               </div>
//             </div>

//             {/* Features */}
//             {product.features && product.features.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
//                   Features
//                 </h3>
//                 <ul className="space-y-2">
//                   {product.features.map((feature, i) => (
//                     <li key={i} className="flex items-start gap-2">
//                       <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
//                       <span className="text-slate-600 dark:text-slate-400">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Tags */}
//             {product.tags.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
//                   Tags
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {product.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-3 mt-auto pt-6">
//               <button
//                 disabled={product.stock === 0}
//                 className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 Add to Cart
//               </button>
//               <button className="p-3 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-lg transition-colors">
//                 <Heart className="w-5 h-5" />
//               </button>
//               <button className="p-3 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-lg transition-colors">
//                 <Share2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-16">
//             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
//               Related Products
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {relatedProducts.map((relProduct) => (
//                 <Link
//                   key={relProduct.id}
//                   href={`/shop/products/${relProduct.id}`}
//                   className="group"
//                 >
//                   <div className={`${relProduct.image} aspect-square rounded-lg mb-4 group-hover:shadow-lg transition-shadow`} />
//                   <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
//                     {relProduct.name}
//                   </h3>
//                   <p className="text-primary-600 dark:text-primary-400 font-bold mt-2">
//                     ৳{relProduct.price}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

import { notFound } from "next/navigation";
import {
  getProductById,
  getCategoryById,
  getProductsByCategory,
} from "@/data/database";
import ProductDetailsClient from "@/components/shared/ProductDetailsClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.categoryId);
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Transform database product to match your UI's expected structure
  // Prepare data for the rich UI
  const productData = {
    ...product,
    brand: "Sodayon Selection",
    originalPrice: product.originalPrice || product.price + 500,
    // Ensure these fields exist or provide defaults for the design
    videoUrl: "/videos/demo.mp4",
    personalityType: "মাস্টার বিল্ডার",
    personalityDesc: "লজিক পাজল এবং ক্রিয়েটিভ ডিজাইনের জন্য সেরা।",
    features: product.features || [
      "উচ্চমানের ম্যাটেরিয়াল",
      "সুরক্ষিত কোণা",
      "সহজ ব্যবহার",
    ],
    images: [product.image, "bg-indigo-100", "bg-purple-100", "bg-blue-100"], // Fallback gallery
  };
  return (
    <ProductDetailsClient
      product={productData}
      relatedProducts={relatedProducts}
    />
  );
}

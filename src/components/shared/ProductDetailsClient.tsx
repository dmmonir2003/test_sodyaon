// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import {
//   ChevronRight,
//   Star,
//   Heart,
//   Share2,
//   ShieldCheck,
//   Truck,
//   RotateCcw,
//   Video,
//   Play,
//   ArrowRight,
//   CheckCircle2,
//   ShoppingCart,
//   Baby, // For Age Range
//   Banknote,
//   ThumbsUp,
//   ThumbsDown,
//   Brain,
//   Lightbulb,
//   Layers,
//   Package,
//   Gift,
//   Smartphone,
// } from "lucide-react";
// import ProductCard from "@/components/shared/ProductCard";
// import MobileStickyCart from "@/components/shared/MobileStickyCart";
// import WriteReviewDrawer from "@/components/shared/WriteReviewDrawer";

// // Mock Data
// const MOCK_PRODUCT = {
//   id: 1,
//   name: "ম্যাগনা-টাইলস ১০০-পিস ক্লিয়ার কালারস সেট",
//   brand: "ভ্যালটেক",
//   ageRange: "৩-১০ বছর", // Age Range added
//   price: 11999,
//   originalPrice: 12999,
//   rating: 4.9,
//   reviewsCount: 1284,
//   description:
//     "ঘণ্টার পর ঘণ্টা স্ক্রিন-মুক্ত, কল্পনাপ্রসূত খেলার অনুপ্রেরণা যোগান। এই উজ্জ্বল, স্বচ্ছ চুম্বকীয় টাইলসগুলো গণিত, বিজ্ঞান এবং সৃজনশীলতার মিশ্রণ ঘটায়। বিশাল সব দুর্গ, রকেট এবং অবিরাম জ্যামিতিক নকশা তৈরি করুন।",
//   features: [
//     "স্থানিক যুক্তি এবং সূক্ষ্ম মোটর স্কিল বিকাশ করে",
//     "ফুড-গ্রেড এবিএস প্লাস্টিক দিয়ে তৈরি (বিপিএ-মুক্ত)",
//     "সর্বোচ্চ নিরাপত্তার জন্য স্টেইনলেস স্টিল রিভেট",
//   ],
//   colors: [
//     {
//       name: "ক্লিয়ার কালার",
//       class: "bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400",
//     },
//     { name: "আর্কটিক আইস", class: "bg-cyan-100" },
//     { name: "নিওন গ্লো", class: "bg-lime-400" },
//   ],
//   sizes: [
//     "স্ট্যান্ডার্ড বক্স",
//     "মেগা প্যাক (+৫০ পিস)",
//     "স্টার্টার বক্স (৩২ পিস)",
//   ],
//   images: ["bg-indigo-100", "bg-purple-100", "bg-blue-100", "bg-cyan-100"],
// };

// export default function ProductDetailsClient({
//   product,
//   relatedProducts,
// }: {
//   product: any;
//   relatedProducts: any[];
// }) {
//   const MOCK_PRODUCT = {
//     reviewsCount: 1284,
//     colors: [
//       { name: "ক্লিয়ার কালার", class: "bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400" },
//       { name: "আর্কটিক আইস", class: "bg-cyan-100" },
//       { name: "নিওন গ্লো", class: "bg-lime-400" },
//     ],
//     sizes: ["স্ট্যান্ডার্ড বক্স", "মেগা প্যাক (+৫০ পিস)", "স্টার্টার বক্স (৩২ পিস)"],
//     ...product
//   };
//   const [activeImage, setActiveImage] = useState(0);
//   const [activeColor, setActiveColor] = useState(0);
//   const [activeSize, setActiveSize] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isZooming, setIsZooming] = useState(false);
//   const [zoomStyle, setZoomStyle] = useState({});
//   const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
//   const [isAbsoluteMode, setIsAbsoluteMode] = useState(false);
//   const [mobileTab, setMobileTab] = useState<'description' | 'video'>('description');
//   const [feedbackTab, setFeedbackTab] = useState<'reviews' | 'qa'>('reviews');
//   const bottomMarkerRef = useRef<HTMLDivElement>(null);

//   // Intersection Observer to pin sticky bar to bottom when footer is reached
//   // useEffect(() => {

//   //   const observer = new IntersectionObserver(
//   //     (entries) => {
//   //       const [entry] = entries;
//   //       setIsAbsoluteMode(entry.isIntersecting);
//   //     },
//   //     { threshold: 0 } 
//   //   );

//   //   if (bottomMarkerRef.current) {
//   //     observer.observe(bottomMarkerRef.current);
//   //   }

//   //   return () => observer.disconnect();


//   // }, []);


//   useEffect(() => {
//   const observer = new IntersectionObserver(
//     (entries) => {
//       const [entry] = entries;
//       setIsAbsoluteMode(entry.isIntersecting);
//     },
//     { 
//       threshold: 0.1,
//       rootMargin: "100px 0px 0px 0px"
//     }
//   ); // ← Close IntersectionObserver here

//   if (bottomMarkerRef.current) {
//     observer.observe(bottomMarkerRef.current);
//   }

//   return () => observer.disconnect(); // ← Return here (at useEffect level)
// }, []);
  

//   // Image Zoom Logic
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     setIsZooming(true);
//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomStyle({
//       transformOrigin: `${x}% ${y}%`,
//       transform: "scale(2.5)",
//     });
//   };

//   const handleMouseLeave = () => {
//     setIsZooming(false);
//     setZoomStyle({ transform: "scale(1)", transformOrigin: "center center" });
//   };

//   return (
//     <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-48 relative">
//       {/* Breadcrumbs */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <nav
//           className="flex text-sm text-slate-500 font-medium"
//           aria-label="Breadcrumb"
//         >
//           <Link href="/" className="hover:text-primary-600 transition-colors">
//             হোম
//           </Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <Link
//             href="/shop"
//             className="hover:text-primary-600 transition-colors"
//           >
//             শপ
//           </Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <Link
//             href="/shop/categories/building-sets"
//             className="hover:text-primary-600 transition-colors"
//           >
//             বিল্ডিং
//           </Link>
//           <ChevronRight className="w-4 h-4 mx-2" />
//           <span className="text-slate-900 dark:text-slate-200 line-clamp-1">
//             {MOCK_PRODUCT.name}
//           </span>
//         </nav>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white dark:bg-slate-800 rounded-[2rem] lg:rounded-[2.5rem] p-4 md:p-6 lg:p-12 shadow-2xl border border-slate-100 dark:border-slate-700">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
//             {/* Left: Image Gallery */}
//             <div className="flex flex-row lg:flex-col gap-3 lg:gap-6">
//               {/* Vertical Side Thumbnails on Mobile (Right side via order-last), Horizontal on Desktop */}
//               <div className="flex lg:flex-row flex-col gap-2 lg:gap-4 lg:overflow-x-auto pb-2 custom-scrollbar order-last shrink-0">
//                 {(MOCK_PRODUCT.images || []).map((img: string, idx: number) => (
//                   <button
//                     key={idx}
//                     onClick={() => setActiveImage(idx)}
//                     className={`w-14 h-14 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl lg:rounded-2xl border-[3px] lg:border-4 transition-all overflow-hidden ${activeImage === idx ? "border-primary-500 shadow-md lg:shadow-lg scale-105" : "border-transparent hover:border-primary-300 opacity-70 hover:opacity-100"}`}
//                   >
//                     <div className={`w-full h-full ${img}`}></div>
//                   </button>
//                 ))}
//               </div>

//               {/* Main Image */}
//               <div
//                 className={`flex-1 relative w-full aspect-[4/5] lg:aspect-square rounded-2xl lg:rounded-3xl overflow-hidden cursor-crosshair transition-colors duration-500 ${MOCK_PRODUCT.images[activeImage]} shadow-inner`}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <div
//                   className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply dark:mix-blend-color-burn transition-transform duration-200 ease-out flex items-center justify-center p-12 pointer-events-none"
//                   style={zoomStyle}
//                 >
//                   <div className="hidden lg:flex w-full h-full border-8 border-white/40 border-dashed rounded-full justify-center items-center">
//                     <span className="font-heading font-black text-6xl text-slate-800/20 rotate-[-15deg]">
//                       টয় প্রিভিউ
//                     </span>
//                   </div>
//                 </div>

//                 {!isZooming && (
//                   <>
//                     <div className="absolute top-4 lg:top-6 left-4 lg:left-6 flex flex-col gap-2">
//                       <span className="px-2 py-1 lg:px-3 lg:py-1 bg-red-500 text-white text-[10px] lg:text-xs font-bold uppercase tracking-wider rounded-md lg:rounded-lg shadow-md">
//                         সেল
//                       </span>
//                       <span className="px-2 py-1 lg:px-3 lg:py-1 bg-white text-slate-800 text-[10px] lg:text-xs font-bold uppercase tracking-wider rounded-md lg:rounded-lg shadow-md">
//                         বেস্টসেলার
//                       </span>
//                     </div>

//                     {/* Mobile Only: Share & Wishlist overlay */}
//                     <div className="absolute top-4 right-4 flex lg:hidden flex-col gap-2">
//                       <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors shadow-sm cursor-pointer z-10">
//                         <Heart className="w-4 h-4" />
//                       </button>
//                       <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-500 hover:text-primary-500 transition-colors shadow-sm cursor-pointer z-10">
//                         <Share2 className="w-4 h-4" />
//                       </button>
//                     </div>

//                     <div className="hidden lg:block absolute bottom-6 right-6 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 border border-white/50 shadow-sm pointer-events-none">
//                       জুম করতে হোভার করুন
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Right: Product Details */}
//             <div className="flex flex-col">
//               <div className="mb-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2 lg:gap-3">
//                   <span className="text-[11px] lg:text-sm font-black tracking-widest text-emerald-500 uppercase">
//                     SODAYON SELECTION
//                   </span>
//                   {/* AGE RANGE BADGE */}
//                   <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full border border-slate-200 dark:border-slate-700/60">
//                     <Baby className="w-3.5 h-3.5 text-emerald-500" />
//                     <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
//                       বয়স: {MOCK_PRODUCT.ageRange || '4-6'}
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Desktop Share & Wishlist */}
//                 <div className="hidden lg:flex gap-2">
//                   <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors">
//                     <Heart className="w-5 h-5" />
//                   </button>
//                   <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-primary-500 hover:bg-primary-50 transition-colors">
//                     <Share2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <h1 className="text-[26px] lg:text-4xl md:text-5xl font-black font-heading text-slate-900 dark:text-white leading-[1.1] mb-3 lg:mb-4 tracking-tight">
//                 {MOCK_PRODUCT.name}
//               </h1>

//               <div className="flex items-center gap-2 lg:gap-4 mb-5 lg:mb-6">
//                 <div className="flex items-center gap-1 text-amber-500">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-4 h-4 lg:w-5 lg:h-5 fill-current ${i === 4 ? "opacity-50" : ""}`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-[13px] lg:text-sm font-medium text-slate-400 hover:text-primary-600 cursor-pointer">
//                   {MOCK_PRODUCT.rating} ({MOCK_PRODUCT.reviewsCount} রিভিউস)
//                 </span>
//               </div>

//               <div className="flex items-baseline gap-2.5 lg:gap-4 mb-6 lg:mb-8">
//                 <span className="text-[34px] lg:text-4xl font-black text-slate-900 dark:text-white leading-none">
//                   ৳{MOCK_PRODUCT.price}
//                 </span>
//                 <span className="text-[18px] lg:text-xl font-bold text-[#8fa2b8] line-through">
//                   ৳{MOCK_PRODUCT.originalPrice}
//                 </span>
//                 <span className="px-2 py-0.5 ml-1 bg-emerald-100/50 text-emerald-700 dark:bg-[#123126] dark:text-[#38a169] text-[11px] lg:text-xs font-bold rounded">
//                   ৳১০০০ বাঁচান
//                 </span>
//               </div>

//               <p className="text-slate-600 dark:text-slate-300 text-[15px] lg:text-lg mb-8 lg:mb-10 leading-relaxed max-w-xl">
//                 {MOCK_PRODUCT.description}
//               </p>

//               {/* Options Selection */}
//               <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-10">
//                 <div>
//                   <div className="flex mb-3">
//                     <span className="text-[15px] font-bold text-slate-900 dark:text-white mr-1.5">
//                       রং:
//                     </span>
//                     <span className="text-[15px] text-slate-500 dark:text-slate-400 font-medium">
//                       {MOCK_PRODUCT.colors[activeColor]?.name || "ক্লিয়ার কালার"}
//                     </span>
//                   </div>
//                   <div className="flex gap-3 lg:gap-4">
//                     {(MOCK_PRODUCT.colors || []).map((color: {name: string, class: string}, idx: number) => (
//                       <button
//                         key={idx}
//                         onClick={() => setActiveColor(idx)}
//                         className={`transition-all rounded-full ${activeColor === idx ? "w-12 h-12 lg:w-14 lg:h-14 border-[3px] border-emerald-500 p-0.5" : "w-12 h-12 lg:w-14 lg:h-14 border-transparent p-1 opacity-80 hover:opacity-100 bg-[#2d3748]"}`}
//                       >
//                         <div
//                           className={`w-full h-full rounded-full ${activeColor !== idx && idx !== 0 && color.name.includes("আর্কটিক") ? "bg-cyan-100" : activeColor !== idx && idx !== 0 && color.name.includes("নিওন") ? "bg-lime-400" : color.class}`}
//                         ></div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex justify-between items-end mb-3">
//                     <span className="text-[15px] font-bold text-slate-900 dark:text-white">
//                       সাইজ / স্টাইল:
//                     </span>
//                     <button className="text-[13px] text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 font-medium underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-500">
//                       সাইজ গাইড
//                     </button>
//                   </div>
//                   <div className="flex flex-wrap gap-3">
//                     {(MOCK_PRODUCT.sizes || []).map((size: string, idx: number) => (
//                       <button
//                         key={idx}
//                         onClick={() => setActiveSize(idx)}
//                         className={`px-4 py-2 lg:px-6 lg:py-2.5 rounded-lg border font-bold text-[13px] lg:text-sm transition-all ${activeSize === idx ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-[#123126]/50 shadow-sm" : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400 bg-transparent"}`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//                {/* Inline Quantity block */}
//                <div className="flex items-center gap-4 mb-10 pt-8 border-t border-slate-100 dark:border-slate-700/50">
//                 <div className="flex items-center gap-3 md:gap-4">
//                   <span className="font-bold text-[17px] text-slate-900 dark:text-white lg:hidden">পরিমাণ:</span>
//                   <div className="flex items-center justify-between border border-slate-300 dark:border-slate-700 rounded-xl w-[105px] h-11 overflow-hidden bg-transparent shrink-0">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold text-lg"
//                     >
//                       -
//                     </button>
//                     <span className="flex-1 text-center font-bold text-[15px] text-slate-900 dark:text-white">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold text-lg"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 {/* Desktop Inline Add to Cart Button */}
//                 <button className="hidden lg:flex flex-1 py-4 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white rounded-xl font-black text-lg shadow-lg transition-all items-center justify-center gap-3 transform hover:-translate-y-1">
//                   কার্টে যোগ করুন — ৳{MOCK_PRODUCT.price * quantity}
//                 </button>
//               </div>

//               {/* Desktop/Mobile Guarantees Box */}
//               <div className="flex flex-col gap-4 font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#1a2332] min-h-[160px] p-5 lg:p-6 rounded-[20px] lg:rounded-3xl mt-2 lg:mt-0 mb-2 border border-slate-100 dark:border-transparent">
//                 <div className="flex items-center gap-4">
//                   <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-[15px] pt-0.5">১-বছরের ওয়ারেন্টি</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Truck className="w-5 h-5 text-blue-500 shrink-0" /> <span className="text-[15px] pt-0.5">২৫০০ টাকার উপরে ফ্রি শিপিং</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <RotateCcw className="w-5 h-5 text-orange-500 shrink-0" /> <span className="text-[15px] pt-0.5">৩০-দিনের ফ্রি রিটার্ন</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> <span className="text-[15px] pt-0.5">নন-টক্সিক এবং নিরাপদ</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* UNIQUE SECTION: Play Personality Match */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
//         <div className="bg-emerald-600 rounded-[2rem] p-5 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center gap-5 md:gap-10 relative overflow-hidden">
          
//           <div className="absolute right-0 top-0 opacity-10 pointer-events-none text-[12rem] md:text-[20rem] font-black leading-none translate-x-4 -translate-y-4 md:translate-x-0 md:translate-y-0">
//             ?
//           </div>

//           {/* Desktop Badge Array */}
//           <div className="hidden md:flex w-full md:w-1/3 justify-center z-10">
//             <div className="w-48 h-48 rounded-full border-8 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-2xl">
//               <span className="font-heading font-black text-4xl text-center leading-tight">
//                 মাস্টার<br/>বিল্ডার
//               </span>
//             </div>
//           </div>

//           <div className="w-full md:w-2/3 z-10 text-left">
            
//             {/* Mobile Header Row */}
//             <div className="flex md:hidden items-center gap-4 mb-4">
//               <div className="w-16 h-16 shrink-0 rounded-full border-[3px] border-emerald-300 flex items-center justify-center bg-emerald-500 shadow-md">
//                 <span className="font-heading font-black text-xs text-center leading-tight">
//                   মাস্টার<br/>বিল্ডার
//                 </span>
//               </div>
//               <div className="flex-1">
//                 <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-200 mb-0.5">
//                   প্লে পার্সোনালিটি ম্যাচ
//                 </h2>
//                 <h3 className="text-xl font-black font-heading leading-tight">
//                   আপনার সন্তানের জন্য সঠিক?
//                 </h3>
//               </div>
//             </div>

//             {/* Desktop Header */}
//             <div className="hidden md:block mb-4">
//               <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-100 mb-2">
//                 প্লে পার্সোনালিটি ম্যাচ
//               </h2>
//               <h3 className="text-3xl md:text-5xl font-black font-heading">
//                 এই খেলনাটি কি আপনার সন্তানের জন্য সঠিক?
//               </h3>
//             </div>
            
//             <p className="text-sm md:text-lg text-emerald-50 mb-6 md:mb-8 leading-relaxed opacity-90">
//               <b className="text-white bg-emerald-700/50 px-1 py-0.5 rounded">মাস্টার বিল্ডার</b> এর জন্য পারফেক্ট। যে সব বাচ্চারা লজিক পাজল
//               এবং আর্কিটেকচারাল ডিজাইন পছন্দ করে তারা এই খেলনাটির সাথে ঘণ্টার পর
//               ঘণ্টা মেতে থাকবে।
//             </p>
            
//             <button className="w-full md:w-auto px-6 py-3.5 md:py-4 bg-white text-emerald-700 font-bold rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 relative z-10">
//               পার্সোনালিটি কুইজ খেলুন <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* TABS (DESKTOP & MOBILE) */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 lg:mt-24 border-b border-slate-200 dark:border-slate-800">
//         <div className="flex w-full md:max-w-2xl md:mx-auto">
//           <button 
//             onClick={() => setMobileTab('description')}
//             className={`flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center border-b-2 transition-colors ${mobileTab === 'description' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
//           >
//             Description
//           </button>
//           <button 
//             onClick={() => setMobileTab('video')}
//             className={`flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center border-b-2 transition-colors ${mobileTab === 'video' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
//           >
//             Demo Video
//           </button>
//         </div>
//       </div>

//       {/* GORGEOUS DESCRIPTION SECTION */}
//       <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 lg:mt-12 ${mobileTab === 'description' ? 'block' : 'hidden'}`}>
//         <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] shadow-lg md:shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          
//           {/* Top Banner / Intro */}
//           <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-600 p-6 md:p-10 lg:p-12 text-white text-center relative overflow-hidden">
//             {/* Background glowing elements */}
//             <div className="absolute top-0 right-0 -mr-10 -mt-10 md:-mr-20 md:-mt-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
//             <div className="absolute bottom-0 left-0 -ml-10 -mb-10 md:-ml-20 md:-mb-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-cyan-300 opacity-20 blur-3xl"></div>
            
//             <h3 className="text-2xl md:text-4xl lg:text-5xl font-black font-heading mb-3 md:mb-4 relative z-10 text-white drop-shadow-md leading-tight">
//               সোনামণির হাতেখড়িতে সেরা কম্বো
//             </h3>
//             <p className="text-primary-50 text-[15px] md:text-lg lg:text-xl max-w-3xl mx-auto relative z-10 leading-relaxed font-medium">
//               জায়ান ইন্টেলিজেন্স বুক ও বিশেষ ফ্ল্যাশকার্ড সেট! শিশুর পড়াশোনাকে আনন্দদায়ক করতে আমরা নিয়ে এসেছি একটি প্রিমিয়াম লার্নিং প্যাকেজ। মোবাইল আসক্তি দূর করে আপনার শিশুকে সৃজনশীল শিক্ষায় ব্যস্ত রাখার জন্য এটি একটি আদর্শ উপহার।
//             </p>
//           </div>

//           <div className="p-4 md:p-8 lg:p-12">
            
//             <div className="text-center mb-8 md:mb-10 max-w-3xl mx-auto">
//                 <h4 className="text-[17px] md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">খেলার ছলে নৈতিক ও আধুনিক শিক্ষা 🎓🌟</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-base leading-relaxed">একটি শিশুর প্রাথমিক শিক্ষার ভিত্তি মজবুত করতে প্রয়োজন সঠিক সরঞ্জাম। আমাদের এই বিশেষ কম্বোটি এমনভাবে সাজানো হয়েছে যা শিশুকে সাধারণ শিক্ষার পাশাপাশি ধর্মীয় ও সৃজনশীল শিক্ষায় আগ্রহী করে তুলবে।</p>
//             </div>

//             {/* Elegant Features Row */}
//             <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5 md:mb-6 text-center">কেন এই কম্বোটি প্রয়োজন?</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
              
//               {/* Feature 1 */}
//               <div className="group bg-slate-50 dark:bg-slate-800/30 p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300">
//                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
//                   <Smartphone className="w-6 h-6 md:w-7 md:h-7" />
//                 </div>
//                 <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">মোবাইল আসক্তি মুক্তি</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm leading-relaxed">
//                   টিভি বা ফোনের বদলে শিশুকে শিক্ষণীয় কাজে দীর্ঘক্ষণ ব্যস্ত রাখে।
//                 </p>
//               </div>

//               {/* Feature 2 */}
//               <div className="group bg-slate-50 dark:bg-slate-800/30 p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-amber-100 dark:hover:border-amber-900/50 transition-all duration-300">
//                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
//                   <Lightbulb className="w-6 h-6 md:w-7 md:h-7" />
//                 </div>
//                 <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">সৃজনশীলতা বৃদ্ধি</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm leading-relaxed">
//                   ওয়াটারবুকের মাধ্যমে হাতের লেখা ও আঁকাআঁকির প্রতি শিশুর আগ্রহ বাড়ে।
//                 </p>
//               </div>

//               {/* Feature 3 */}
//               <div className="group bg-slate-50 dark:bg-slate-800/30 p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-emerald-100 dark:hover:border-emerald-900/50 transition-all duration-300">
//                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
//                   <Brain className="w-6 h-6 md:w-7 md:h-7" />
//                 </div>
//                 <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">মেধা বিকাশ</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm leading-relaxed">
//                   ছবি এবং শব্দের সমন্বয়ে শেখার ফলে পড়ার বিষয়গুলো শিশুর মনে দ্রুত গেঁথে যায়।
//                 </p>
//               </div>

//               {/* Feature 4 */}
//               <div className="group bg-slate-50 dark:bg-slate-800/30 p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-pink-100 dark:hover:border-pink-900/50 transition-all duration-300">
//                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
//                   <Gift className="w-6 h-6 md:w-7 md:h-7" />
//                 </div>
//                 <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">উপহার হিসেবে সেরা</h4>
//                 <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm leading-relaxed">
//                   জন্মদিন বা যেকোনো বিশেষ অনুষ্ঠানে সোনামণিদের দেওয়ার জন্য মার্জিত উপহার।
//                 </p>
//               </div>

//             </div>

//              {/* Beautiful What's Included */}
//             <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl md:rounded-[2rem] p-5 md:p-8 lg:p-10 border border-slate-100 dark:border-slate-700/50">
//               <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6 md:mb-8">
//                 <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center shrink-0">
//                    <Package className="w-5 h-5 md:w-8 md:h-8 text-primary-600 dark:text-primary-400" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl md:text-3xl font-black font-heading text-slate-900 dark:text-white mb-1">
//                     প্যাকেজে যা যা থাকছে:
//                   </h3>
//                   <p className="text-slate-500 text-[13px] md:text-sm">প্রিমিয়াম এডুকেশনাল কম্বো প্যাকেজ</p>
//                 </div>
//               </div>
              
//               {/* Flex Tags for included items */}
//               <div className="flex flex-wrap gap-2.5 sm:gap-4 mb-6 md:mb-8">
//                 {[
//                   { count: "১x", text: "জায়ান বুক (৪০ পৃষ্ঠা)" },
//                   { count: "১x", text: "ম্যাজিক ওয়াটারবুক" },
//                   { count: "১x", text: "ম্যাজিক পেন" },
//                   { count: "১৬x", text: "দুয়া ফ্ল্যাশকার্ড" },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-center bg-white dark:bg-slate-900 pl-1 pr-3 md:pr-4 py-1.5 md:py-1.5 rounded-full border border-slate-200 dark:border-slate-700/80 shadow-sm transition-colors cursor-default">
//                     <span className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 font-bold text-[12px] md:text-sm flex items-center justify-center mr-2 md:mr-3 shrink-0">
//                       {item.count}
//                     </span>
//                     <span className="text-slate-700 dark:text-slate-300 font-medium text-[13px] md:text-[15px]">
//                       {item.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//                {/* Details List */}
//                <div className="space-y-4 md:space-y-5 pt-5 md:pt-6 border-t border-slate-200 dark:border-slate-700/50">
//                   <div className="flex gap-3 md:gap-4 items-start">
//                     <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mt-1 md:mt-0.5 shrink-0" />
//                     <div>
//                         <h5 className="font-bold text-slate-900 dark:text-white text-[15px] md:text-base">জায়ান ইন্টেলিজেন্স বুক (৪০ পৃষ্ঠা)</h5>
//                         <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm mt-1">এটি একটি আপডেটেড স্মার্ট লার্নিং বুক। এতে বাংলা, ইংরেজি, গণিত ও আরবি শিক্ষার পাশাপাশি বিশেষ ক্যালকুলেটর ভার্সন রয়েছে, যা শিশুকে উচ্চারণের সাথে নতুন কিছু শিখতে সাহায্য করে।</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-3 md:gap-4 items-start">
//                     <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mt-1 md:mt-0.5 shrink-0" />
//                     <div>
//                         <h5 className="font-bold text-slate-900 dark:text-white text-[15px] md:text-base">ম্যাজিক ওয়াটারবুক + পেন</h5>
//                         <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm mt-1">পানি দিয়ে আঁকাআঁকি করার মজার বই। শুকিয়ে গেলে ছবি আবার উধাও হয়ে যায়, ফলে শিশু বারবার একই বইয়ে রঙ করতে পারে। এটি শিশুর হাতের জড়তা কাটাতে দারুণ কার্যকর।</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-3 md:gap-4 items-start">
//                     <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mt-1 md:mt-0.5 shrink-0" />
//                     <div>
//                         <h5 className="font-bold text-slate-900 dark:text-white text-[15px] md:text-base">১৬টি দুয়া ফ্ল্যাশকার্ড</h5>
//                         <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm mt-1">শিশুদের দৈনন্দিন প্রয়োজনীয় ছোট ছোট দুয়া ও ইসলামিক আদব শেখার জন্য বিশেষ কার্ড। এটি শিশুর মাঝে ধর্মীয় মূল্যবোধ তৈরিতে সাহায্য করে।</p>
//                     </div>
//                   </div>
//                </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* VIDEO DEMONSTRATION SECTION */}
//       <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 ${mobileTab === 'video' ? 'block' : 'hidden'}`}>
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-4">
//             ভিডিওটি দেখুন
//           </h2>
//           <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
//             দেখুন কীভাবে ম্যাগনা-টাইলস সৃজনশীলতাকে জাগ্রত করে।
//           </p>
//         </div>

//         {/* YouTube-like Layout Wrapper */}
//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* Main Video Player (Left) */}
//           <div className="flex-1">
//             <div className="relative w-full aspect-video bg-[#0f172a] rounded-[2rem] shadow-2xl overflow-hidden group cursor-pointer border-[8px] md:border-[12px] border-slate-800">
//               <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply transition-opacity group-hover:opacity-60"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 border border-white/20 shadow-xl">
//                   <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
//                     <Play className="w-6 h-6 text-primary-600 ml-1 fill-current" />
//                   </div>
//                 </div>
//               </div>
//               {/* Fake Progress Bar */}
//               <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
//                 <div className="h-full w-1/3 bg-primary-600"></div>
//               </div>
//             </div>
            
//             {/* Main Video Info */}
//             <div className="mt-5 px-1 lg:px-2">
//               <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
//                 বাচ্চাদের জন্য সেরা এডুকেশনাল খেলনা: কীভাবে খেলবেন?
//               </h3>
//               <div className="flex items-center gap-4 text-slate-500 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">
//                     S
//                   </div>
//                   <span className="font-semibold text-slate-700 dark:text-slate-300">Sodayon Toys</span>
//                 </div>
//                 <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
//                 <span>১১৩কে ভিউজ</span>
//                 <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
//                 <span>৩ সপ্তাহ আগে</span>
//               </div>
//             </div>
//           </div>

//           {/* Related Videos Sidebar (Right) */}
//           <div className="lg:w-[380px] xl:w-[420px] flex flex-col shrink-0">
//             <h4 className="text-slate-900 dark:text-white font-bold mb-4 text-lg">সম্পর্কিত ভিডিও</h4>
            
//             <div className="flex flex-col gap-4 overflow-y-auto max-h-[450px] lg:max-h-[550px] pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              
//               {[
//                 { title: "ম্যাগনা-টাইলস ১০০ পিস আনবক্সিং এবং ওভারভিউ", views: "৪৫কে", time: "১ মাস আগে", duration: "৮:৪৫" },
//                 { title: "বাচ্চাদের ব্রেন ডেভেলপমেন্টে এসব খেলনা কেন জরুরি?", views: "৮৯কে", time: "৩ মাস আগে", duration: "১২:১০" },
//                 { title: "কীভাবে বিশাল দুর্গ বানাবেন? স্টেপ বাই স্টেপ গাইড", views: "২১কে", time: "৩ সপ্তাহ আগে", duration: "৫:৩০" },
//                 { title: "ম্যাগনা-টাইলস বনাম অন্যান্য ব্র্যান্ড: কোনটি কিনবেন?", views: "১১২কে", time: "৫ মাস আগে", duration: "১৫:২০" },
//                 { title: "৫টি মজার গেম যা আপনি এই টাইলস দিয়ে খেলতে পারেন", views: "৬৭কে", time: "৬ মাস আগে", duration: "১০:০৫" },
//                 { title: "ক্রেজি টাওয়ার বিল্ডিং চ্যালেঞ্জ!", views: "১৯কে", time: "২ সপ্তাহ আগে", duration: "৬:৪৫" },
//               ].map((vid, idx) => (
//                 <div key={idx} className="flex gap-3 group cursor-pointer hover:bg-white dark:hover:bg-slate-800 p-2 -mx-2 rounded-xl transition-colors">
//                   {/* Thumbnail Element */}
//                   <div className="relative w-[140px] shrink-0 aspect-video bg-slate-800 rounded-lg overflow-hidden">
//                     <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/10 transition-colors"></div>
//                     <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-medium text-white">{vid.duration}</div>
//                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                        <Play className="w-8 h-8 text-white drop-shadow-md fill-white/20" />
//                     </div>
//                   </div>
//                   {/* Info Element */}
//                   <div className="flex flex-col justify-start pt-0.5">
//                     <h5 className="text-slate-800 dark:text-slate-100 text-[13px] font-bold line-clamp-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
//                       {vid.title}
//                     </h5>
//                     <span className="text-slate-500 text-xs mt-1.5">Sodayon Toys</span>
//                     <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
//                       <span>{vid.views} ভিউজ</span>
//                       <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
//                       <span>{vid.time}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FEEDBACK TABS (Reviews / Q&A) */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
//         <div className="flex border-b border-slate-200 dark:border-slate-800">
//           <button 
//             onClick={() => setFeedbackTab('reviews')}
//             className={`flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center border-b-2 transition-colors ${feedbackTab === 'reviews' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
//           >
//             Reviews and Ratings
//           </button>
//           <button 
//             onClick={() => setFeedbackTab('qa')}
//             className={`flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center border-b-2 transition-colors ${feedbackTab === 'qa' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
//           >
//             Product Q/A
//           </button>
//         </div>
//       </div>

//       {/* REVIEWS SECTION */}
//       <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 ${feedbackTab === 'reviews' ? 'block' : 'hidden'}`}>
        
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
//           {/* Summary Column */}
//           <div className="lg:w-[35%] xl:w-1/3">
//             <div className="flex gap-6 mb-6">
//               {/* Left Score Side */}
//               <div className="flex flex-col w-[120px]">
//                 <span className="text-5xl md:text-6xl text-slate-800 dark:text-white mb-1.5 leading-none font-light">
//                   4.18
//                 </span>
//                 <div className="flex items-center text-amber-500 mb-1.5">
//                   <Star className="w-4 h-4 fill-current" />
//                   <Star className="w-4 h-4 fill-current" />
//                   <Star className="w-4 h-4 fill-current" />
//                   <Star className="w-4 h-4 fill-current" />
//                   <Star className="w-4 h-4" />
//                 </div>
//                 <span className="text-slate-500 text-[13px] leading-snug">
//                   21 Ratings and 17 Reviews
//                 </span>
//               </div>
              
//               {/* Right Bars Side */}
//               <div className="flex-1 flex flex-col gap-1.5 text-[13px] text-slate-500 justify-end pb-1">
//                 {[
//                   { stars: 5, count: 15, percent: 70 },
//                   { stars: 4, count: 2, percent: 10 },
//                   { stars: 3, count: 2, percent: 10 },
//                   { stars: 2, count: 0, percent: 0 },
//                   { stars: 1, count: 3, percent: 15 },
//                 ].map((item) => (
//                   <div key={item.stars} className="flex items-center gap-2">
//                     <span className="w-2">{item.stars}</span>
//                     <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
//                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
//                     </div>
//                     <span className="w-4 text-right">{item.count}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Rate this product */}
//             <div className="mb-6">
//               <p className="text-slate-700 dark:text-slate-300 mb-2 text-[15px]">Rate this product</p>
//               <div className="flex items-center gap-1 text-amber-500 mb-5 cursor-pointer" onClick={() => setIsWriteReviewOpen(true)}>
//                 <Star className="w-6 h-6 stroke-[1.5]" />
//                 <Star className="w-6 h-6 stroke-[1.5]" />
//                 <Star className="w-6 h-6 stroke-[1.5]" />
//                 <Star className="w-6 h-6 stroke-[1.5]" />
//                 <Star className="w-6 h-6 stroke-[1.5]" />
//               </div>
//               <button 
//                 onClick={() => setIsWriteReviewOpen(true)}
//                 className="px-6 py-2 border border-primary-500 text-primary-500 dark:text-primary-400 font-medium rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
//               >
//                 Write a review
//               </button>
//             </div>
            
//             <div className="border-t border-slate-100 dark:border-slate-800 pt-4 hidden lg:block"></div>
//           </div>

//           {/* Feedback Column */}
//           <div className="lg:w-[65%] xl:w-2/3">
            
//             {/* Sorting Dropdown */}
//             <div className="flex items-center gap-2 pb-5 border-b border-slate-100 dark:border-slate-800">
//                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h10M4 18h4"/></svg>
//                <select className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:border-primary-500 cursor-pointer min-w-[120px]">
//                  <option>Default</option>
//                  <option>Recent</option>
//                  <option>Highest Rating</option>
//                </select>
//             </div>

//             <div className="flex flex-col mt-5">
//               {/* Single Review Item */}
//               <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-10 h-10 bg-[#004d40] rounded-full flex items-center justify-center font-bold text-white shrink-0 text-lg">
//                     S
//                   </div>
//                   <div>
//                     <div className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">
//                       By <span className="text-primary-500 dark:text-primary-400">Saifuddin</span>, 15 Oct 2024
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="flex text-amber-500">
//                         <Star className="w-3.5 h-3.5 fill-current" />
//                         <Star className="w-3.5 h-3.5 fill-current" />
//                         <Star className="w-3.5 h-3.5 fill-current" />
//                         <Star className="w-3.5 h-3.5 fill-current" />
//                         <Star className="w-3.5 h-3.5 fill-current" />
//                       </div>
//                       <div className="flex items-center gap-1 text-[#00c853] text-[11px] font-medium">
//                         <CheckCircle2 className="w-3.5 h-3.5" />
//                         Verified Purchase
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
//                   খুব স্মুথলি ফ্যানটা চলে। শোঁ শোঁ বাতাস। চার্জও থাকে দীর্ঘক্ষণ। বাচ্চাকে নিয়ে বাইরে বের হলে ফ্যানটা খুব কাজে দেয়।
//                 </p>
                
//                 <div className="mb-3">
//                   <span className="text-xs text-slate-400">Was this review helpful to you?</span>
//                 </div>
//                 <div className="flex gap-3">
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
//                     <ThumbsUp className="w-4 h-4" strokeWidth={1.5} />
//                     Helpful (8)
//                   </button>
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
//                     <ThumbsDown className="w-4 h-4" strokeWidth={1.5} />
//                     Not Helpful
//                   </button>
//                 </div>
//               </div>

//               {/* Second Review Item */}
//               <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-4">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
//                     <img src="/icons/book.png" alt="Avatar" className="w-full h-full object-cover opacity-50" />
//                   </div>
//                   <div>
//                     <div className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">
//                       By <span className="text-primary-500 dark:text-primary-400">Jakaria</span>, 30 Apr 2025
//                     </div>
//                     <div className="flex text-amber-500">
//                       <Star className="w-3.5 h-3.5 fill-current" />
//                       <Star className="w-3.5 h-3.5 fill-current" />
//                       <Star className="w-3.5 h-3.5 fill-current" />
//                       <Star className="w-3.5 h-3.5 fill-current" />
//                       <Star className="w-3.5 h-3.5 fill-current" />
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-1">
//                   ৪০০০mAh ব্যাটারি খুবই দীর্ঘস্থায়ী—একবার চার্জ দিলেই অনেকক্ষণ চলে। গরমের দিনে বাইরে গেলে বা বিদ্যুৎ না থাকলে এটা সত্যিই খুব কাজে দেয়।
//                 </p>
//                 <div className="mb-4">
//                   <button className="text-primary-500 text-xs font-bold hover:underline">Read More</button>
//                 </div>
                
//                 <div className="mb-3">
//                   <span className="text-xs text-slate-400">Was this review helpful to you?</span>
//                 </div>
//                 <div className="flex gap-3">
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
//                     <ThumbsUp className="w-4 h-4" strokeWidth={1.5} />
//                     Helpful (4)
//                   </button>
//                   <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
//                     <ThumbsDown className="w-4 h-4" strokeWidth={1.5} />
//                     Not Helpful
//                   </button>
//                 </div>
//               </div>

//               {/* Show more Review button */}
//               <div className="py-2">
//                 <button className="text-primary-500 text-sm font-medium hover:underline flex items-center justify-between w-full text-left">
//                   Show more Review(s)
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRODUCT Q/A SECTION */}
//       <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 ${feedbackTab === 'qa' ? 'block' : 'hidden'}`}>
        
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
//           {/* Submission Column (Left) */}
//           <div className="lg:w-[35%] xl:w-1/3">
//             <p className="text-[15px] text-slate-700 dark:text-slate-300 mb-2">Have a question regarding the product?</p>
//             <div className="mb-6">
//               <textarea 
//                 className="w-full h-32 p-3 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:border-primary-500 resize-none mb-4 placeholder:text-slate-400"
//                 placeholder="Write a question..."
//               />
//               <button className="px-6 py-2 border border-primary-500 text-primary-500 dark:text-primary-400 font-medium rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors w-full sm:w-auto">
//                 Submit Question
//               </button>
//             </div>
//             <div className="border-t border-slate-100 dark:border-slate-800 pt-4 hidden lg:block"></div>
//           </div>

//           {/* Q/A List Column (Right) */}
//           <div className="lg:w-[65%] xl:w-2/3">
            
//             {/* Sorting Dropdown */}
//             <div className="flex items-center gap-2 pb-5 border-b border-slate-100 dark:border-slate-800">
//                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h10M4 18h4"/></svg>
//                <select className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:border-primary-500 cursor-pointer min-w-[120px]">
//                  <option>Default</option>
//                  <option>Most Recent</option>
//                  <option>Top Answered</option>
//                </select>
//             </div>

//             <div className="flex flex-col mt-5">
//               {/* Item 1 */}
//               <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
//                 <div className="flex gap-2 sm:gap-3 mb-4">
//                   <span className="font-bold text-slate-800 dark:text-white">Q:</span>
//                   <div>
//                     <p className="text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">ম্যাক্স পাওয়ারে কতক্ষণ চার্জিং ব্যাক আপ পাব??</p>
//                     <p className="text-xs sm:text-[13px] text-slate-500">Questioned by <span className="font-semibold text-slate-600 dark:text-slate-400">880****564</span> on 24 Apr, 2025</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2 sm:gap-3 ml-2 md:ml-6">
//                   <span className="font-bold text-slate-800 dark:text-white">A:</span>
//                   <div>
//                     <p className="text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">প্রিয় গ্রাহক, ম্যাক্স পাওয়ারে প্রায় ৩ ঘণ্টা চার্জিং ব্যাকআপ পাবে।</p>
//                     <p className="text-xs sm:text-[13px] text-slate-500">Answered by <span className="font-semibold text-slate-600 dark:text-slate-400">Rafid Ahmed</span> on 24 Apr, 2025</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Item 2 */}
//               <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-4">
//                 <div className="flex gap-2 sm:gap-3 mb-4">
//                   <span className="font-bold text-slate-800 dark:text-white">Q:</span>
//                   <div>
//                     <p className="text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">Which Colour available? ?</p>
//                     <p className="text-xs sm:text-[13px] text-slate-500">Questioned by <span className="font-semibold text-slate-600 dark:text-slate-400">Sourav Das</span> on 23 Mar, 2025</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2 sm:gap-3 ml-2 md:ml-6">
//                   <span className="font-bold text-slate-800 dark:text-white">A:</span>
//                   <div>
//                     <p className="text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">Dear customer, all three colors are available.</p>
//                     <p className="text-xs sm:text-[13px] text-slate-500">Answered by <span className="font-semibold text-slate-600 dark:text-slate-400">Rafid Ahmed</span> on 23 Mar, 2025</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Show more button */}
//               <div className="py-2">
//                 <button className="text-primary-500 text-sm font-medium hover:underline flex items-center justify-between w-full text-left">
//                   Show more Question(s)
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RELATED PRODUCTS */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32">
//         <h2 className="text-2xl lg:text-3xl font-black font-heading text-slate-900 dark:text-white mb-6 lg:mb-10">
//           এগুলোর সাথে মানানসই
//         </h2>
//         <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0">
//           {relatedProducts.slice(0, 4).map((rel) => (
//             <div key={rel.id} className="w-[calc(50%-8px)] flex-shrink-0 snap-start lg:w-auto">
//               <ProductCard
//                 name={rel.name}
//                 price={`৳${rel.price}`}
//                 img={rel.image || "bg-indigo-100"}
//                 link={`/shop/products/${rel.id}`}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RECENTLY VIEWED PRODUCTS */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-24 mb-12">
//         <h2 className="text-2xl lg:text-3xl font-black font-heading text-slate-900 dark:text-white mb-6 lg:mb-10">
//           রিসেন্টলি দেখা পণ্য
//         </h2>
//         <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0">
//           {relatedProducts.slice(0, 4).reverse().map((rel) => (
//             <div key={`recent-${rel.id}`} className="w-[calc(50%-8px)] flex-shrink-0 snap-start lg:w-auto">
//               <ProductCard
//                 name={rel.name}
//                 price={`৳${rel.price}`}
//                 img={rel.image || "bg-indigo-100"}
//                 link={`/shop/products/${rel.id}`}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* STICKY ADD TO CART BAR (MOBILE ONLY) */}
//       {/* 
//         NOTE: Passed hasAlternative={true} specifically to show the layout from the user's reference image 
//         (the eBook layout). To revert to the previous layout (Cash on Delivery), set hasAlternative={false}.
//         This can be controlled by backend props.
//       */}
//       <MobileStickyCart 
//         isAbsoluteMode={isAbsoluteMode}
//         hasAlternative={true} 
//         alternativeTitle="eBook Version Available"
//         alternativePrice="180"
//         alternativeImage="/next.svg"
//       />

//       {/* WRITE A REVIEW DRAWER */}
//       <WriteReviewDrawer
//         isOpen={isWriteReviewOpen}
//         onClose={() => setIsWriteReviewOpen(false)}
//         productName={MOCK_PRODUCT.name}
//         productImage={MOCK_PRODUCT.images[0]}
//         price={MOCK_PRODUCT.price}
//         oldPrice={MOCK_PRODUCT.oldPrice}
//       />

//       {/* Invisible marker pixel to detect when we reach the end of the page/footer */}
//       {/* <div ref={bottomMarkerRef} className="h-1 lg:hidden w-full absolute bottom-0 pointer-events-none" /> */}

//       {/* Marker for detecting footer - place it 100px+ above where footer content starts */}
// <div ref={bottomMarkerRef} className="h-px lg:hidden w-full pointer-events-none" style={{ marginTop: '100px' }} />
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Video,
  Play,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Baby, // For Age Range
  Banknote,
  ThumbsUp,
  ThumbsDown,
  Brain,
  Lightbulb,
  Layers,
  Package,
  Gift,
  Smartphone,
} from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import MobileStickyCart from "@/components/shared/MobileStickyCart";
import WriteReviewDrawer from "@/components/shared/WriteReviewDrawer";

// Mock Data
const MOCK_PRODUCT = {
  id: 1,
  name: "ম্যাগনা-টাইলস ১০০-পিস ক্লিয়ার কালারস সেট",
  brand: "ভ্যালটেক",
  ageRange: "৩-১০ বছর", // Age Range added
  price: 11999,
  originalPrice: 12999,
  rating: 4.9,
  reviewsCount: 1284,
  description:
    "ঘণ্টার পর ঘণ্টা স্ক্রিন-মুক্ত, কল্পনাপ্রসূত খেলার অনুপ্রেরণা যোগান। এই উজ্জ্বল, স্বচ্ছ চুম্বকীয় টাইলসগুলো গণিত, বিজ্ঞান এবং সৃজনশীলতার মিশ্রণ ঘটায়। বিশাল সব দুর্গ, রকেট এবং অবিরাম জ্যামিতিক নকশা তৈরি করুন।",
  features: [
    "স্থানিক যুক্তি এবং সূক্ষ্ম মোটর স্কিল বিকাশ করে",
    "ফুড-গ্রেড এবিএস প্লাস্টিক দিয়ে তৈরি (বিপিএ-মুক্ত)",
    "সর্বোচ্চ নিরাপত্তার জন্য স্টেইনলেস স্টিল রিভেট",
  ],
  colors: [
    {
      name: "ক্লিয়ার কালার",
      class: "bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400",
    },
    { name: "আর্কটিক আইস", class: "bg-cyan-100" },
    { name: "নিওন গ্লো", class: "bg-lime-400" },
  ],
  sizes: [
    "স্ট্যান্ডার্ড বক্স",
    "মেগা প্যাক (+৫০ পিস)",
    "স্টার্টার বক্স (৩২ পিস)",
  ],
  images: ["bg-indigo-100", "bg-purple-100", "bg-blue-100", "bg-cyan-100"],
};

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const MOCK_PRODUCT = {
    reviewsCount: 1284,
    colors: [
      { name: "ক্লিয়ার কালার", class: "bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400" },
      { name: "আর্কটিক আইস", class: "bg-cyan-100" },
      { name: "নিওন গ্লো", class: "bg-lime-400" },
    ],
    sizes: ["স্ট্যান্ডার্ড বক্স", "মেগা প্যাক (+৫০ পিস)", "স্টার্টার বক্স (৩২ পিস)"],
    ...product
  };
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isAbsoluteMode, setIsAbsoluteMode] = useState(false);
  const [showDesktopStickyCart, setShowDesktopStickyCart] = useState(false);
  const [mobileTab, setMobileTab] = useState<'description' | 'video'>('description');
  const [feedbackTab, setFeedbackTab] = useState<'reviews' | 'qa'>('reviews');
  const bottomMarkerRef = useRef<HTMLDivElement>(null);

  // ✅ WORKING: Sticky cart positioning based on scroll distance from bottom
  useEffect(() => {
    const handleScroll = () => {
      // Calculate distance from bottom of page
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);

      // Switch to absolute mode when within 600px of bottom
      setIsAbsoluteMode(distanceFromBottom < 600);

      // Desktop sticky cart: Show when scrolled past 600px
      setShowDesktopStickyCart(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  // Image Zoom Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsZooming(true);
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.5)",
    });
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({ transform: "scale(1)", transformOrigin: "center center" });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-48 relative">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav
          className="flex text-sm text-slate-500 font-medium"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary-600 transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link
            href="/shop"
            className="hover:text-primary-600 transition-colors"
          >
            শপ
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link
            href="/shop/categories/building-sets"
            className="hover:text-primary-600 transition-colors"
          >
            বিল্ডিং
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 dark:text-slate-200 line-clamp-1">
            {MOCK_PRODUCT.name}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-2 lg:mt-0">
        <div className="bg-transparent sm:bg-white sm:dark:bg-slate-800 rounded-none sm:rounded-[2rem] lg:rounded-[2.5rem] px-4 py-2 sm:p-6 lg:p-12 shadow-none sm:shadow-2xl border-none sm:border border-slate-100 dark:border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-6">
              
              {/* Thumbnails: Vertical on Mobile (Right), Horizontal on Desktop (Bottom) */}
              <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-4 overflow-y-auto lg:overflow-x-auto pb-0 lg:pb-2 custom-scrollbar shrink-0 order-last w-14 sm:w-16 lg:w-auto">
                {(MOCK_PRODUCT.images || []).map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 flex-shrink-0 rounded-xl lg:rounded-2xl border-[2px] lg:border-4 transition-all overflow-hidden ${activeImage === idx ? "border-primary-500 shadow-md lg:shadow-lg scale-105" : "border-transparent hover:border-primary-300 opacity-70 hover:opacity-100"}`}
                  >
                    <div className={`w-full h-full ${img}`}></div>
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div
                className={`flex-1 order-first relative w-full aspect-[4/5] sm:aspect-square lg:aspect-square rounded-2xl lg:rounded-3xl overflow-hidden cursor-crosshair transition-colors duration-500 ${MOCK_PRODUCT.images[activeImage]} shadow-inner`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply dark:mix-blend-color-burn transition-transform duration-200 ease-out flex items-center justify-center p-12 pointer-events-none"
                  style={zoomStyle}
                >
                  <div className="hidden lg:flex w-full h-full border-8 border-white/40 border-dashed rounded-full justify-center items-center">
                    <span className="font-heading font-black text-6xl text-slate-800/20 rotate-[-15deg]">
                      টয় প্রিভিউ
                    </span>
                  </div>
                </div>

                {!isZooming && (
                  <>
                    <div className="absolute top-4 lg:top-6 left-4 lg:left-6 flex flex-col gap-2">
                      <span className="px-2 py-1 lg:px-3 lg:py-1 bg-red-500 text-white text-[10px] lg:text-xs font-bold uppercase tracking-wider rounded-md lg:rounded-lg shadow-md">
                        সেল
                      </span>
                      <span className="px-2 py-1 lg:px-3 lg:py-1 bg-white text-slate-800 text-[10px] lg:text-xs font-bold uppercase tracking-wider rounded-md lg:rounded-lg shadow-md">
                        বেস্টসেলার
                      </span>
                    </div>

                    {/* Mobile Only: Share & Wishlist overlay */}
                    <div className="absolute top-4 right-4 flex lg:hidden flex-col gap-2">
                      <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors shadow-sm cursor-pointer z-10">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-500 hover:text-primary-500 transition-colors shadow-sm cursor-pointer z-10">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="hidden lg:block absolute bottom-6 right-6 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 border border-white/50 shadow-sm pointer-events-none">
                      জুম করতে হোভার করুন
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className="text-[11px] lg:text-sm font-black tracking-widest text-emerald-500 uppercase">
                    SODAYON SELECTION
                  </span>
                  {/* AGE RANGE BADGE */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/60 rounded-full border border-slate-200 dark:border-slate-700/60">
                    <Baby className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      বয়স: {MOCK_PRODUCT.ageRange || '4-6'}
                    </span>
                  </div>
                </div>
                
                {/* Desktop Share & Wishlist */}
                <div className="hidden lg:flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-primary-500 hover:bg-primary-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-[26px] lg:text-4xl md:text-5xl font-black font-heading text-slate-900 dark:text-white leading-[1.1] mb-3 lg:mb-4 tracking-tight">
                {MOCK_PRODUCT.name}
              </h1>

              <div className="flex items-center gap-2 lg:gap-4 mb-5 lg:mb-6">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 lg:w-5 lg:h-5 fill-current ${i === 4 ? "opacity-50" : ""}`}
                    />
                  ))}
                </div>
                <span className="text-[13px] lg:text-sm font-medium text-slate-400 hover:text-primary-600 cursor-pointer">
                  {MOCK_PRODUCT.rating} ({MOCK_PRODUCT.reviewsCount} রিভিউস)
                </span>
              </div>

              <div className="flex items-baseline gap-2.5 lg:gap-4 mb-6 lg:mb-8">
                <span className="text-[34px] lg:text-4xl font-black text-slate-900 dark:text-white leading-none">
                  ৳{MOCK_PRODUCT.price}
                </span>
                <span className="text-[18px] lg:text-xl font-bold text-[#8fa2b8] line-through">
                  ৳{MOCK_PRODUCT.originalPrice}
                </span>
                <span className="px-2 py-0.5 ml-1 bg-emerald-100/50 text-emerald-700 dark:bg-[#123126] dark:text-[#38a169] text-[11px] lg:text-xs font-bold rounded">
                  ৳১০০০ বাঁচান
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-[15px] lg:text-lg mb-8 lg:mb-10 leading-relaxed max-w-xl">
                {MOCK_PRODUCT.description}
              </p>

              {/* Options Selection */}
              <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-10">
                <div>
                  <div className="flex mb-3">
                    <span className="text-[15px] font-bold text-slate-900 dark:text-white mr-1.5">
                      রং:
                    </span>
                    <span className="text-[15px] text-slate-500 dark:text-slate-400 font-medium">
                      {MOCK_PRODUCT.colors[activeColor]?.name || "ক্লিয়ার কালার"}
                    </span>
                  </div>
                  <div className="flex gap-3 lg:gap-4">
                    {(MOCK_PRODUCT.colors || []).map((color: {name: string, class: string}, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveColor(idx)}
                        className={`transition-all rounded-full ${activeColor === idx ? "w-12 h-12 lg:w-14 lg:h-14 border-[3px] border-emerald-500 p-0.5" : "w-12 h-12 lg:w-14 lg:h-14 border-transparent p-1 opacity-80 hover:opacity-100 bg-[#2d3748]"}`}
                      >
                        <div
                          className={`w-full h-full rounded-full ${activeColor !== idx && idx !== 0 && color.name.includes("আর্কটিক") ? "bg-cyan-100" : activeColor !== idx && idx !== 0 && color.name.includes("নিওন") ? "bg-lime-400" : color.class}`}
                        ></div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[15px] font-bold text-slate-900 dark:text-white">
                      সাইজ / স্টাইল:
                    </span>
                    <button className="text-[13px] text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 font-medium underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-500">
                      সাইজ গাইড
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(MOCK_PRODUCT.sizes || []).map((size: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSize(idx)}
                        className={`px-4 py-2 lg:px-6 lg:py-2.5 rounded-lg border font-bold text-[13px] lg:text-sm transition-all ${activeSize === idx ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-[#123126]/50 shadow-sm" : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400 bg-transparent"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

               {/* Inline Quantity block */}
               <div className="flex items-center gap-4 mb-10 pt-8 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="font-bold text-[17px] text-slate-900 dark:text-white lg:hidden">পরিমাণ:</span>
                  <div className="flex items-center justify-between border border-slate-300 dark:border-slate-700 rounded-xl w-[105px] h-11 overflow-hidden bg-transparent shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-[15px] text-slate-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Desktop Inline Action Buttons */}
                <div className="hidden lg:flex flex-1 gap-3">
                  <button className="flex-1 py-4 bg-primary-50 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-slate-700 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-slate-700 rounded-xl font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    কার্টে যোগ করুন
                  </button>
                  <button className="flex-1 py-4 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white rounded-xl font-black text-lg shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    অর্ডার করুন — ৳{MOCK_PRODUCT.price * quantity}
                  </button>
                </div>
              </div>

              {/* Desktop/Mobile Guarantees Box */}
              <div className="flex flex-col gap-4 font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#1a2332] min-h-[160px] p-5 lg:p-6 rounded-[20px] lg:rounded-3xl mt-2 lg:mt-0 mb-2 border border-slate-100 dark:border-transparent">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" /> <span className="text-[15px] pt-0.5">১-বছরের ওয়ারেন্টি</span>
                </div>
                <div className="flex items-center gap-4">
                  <Truck className="w-5 h-5 text-blue-500 shrink-0" /> <span className="text-[15px] pt-0.5">२५००  টাকার উপরে ফ্রি শিপিং</span>
                </div>
                <div className="flex items-center gap-4">
                  <RotateCcw className="w-5 h-5 text-orange-500 shrink-0" /> <span className="text-[15px] pt-0.5">३०-দিনের ফ্রি রিটার্ন</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> <span className="text-[15px] pt-0.5">নন-টক্সিক এবং নিরাপদ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UNIQUE SECTION: Play Personality Match */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="bg-emerald-600 rounded-[2rem] p-5 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center gap-5 md:gap-10 relative overflow-hidden">
          
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none text-[12rem] md:text-[20rem] font-black leading-none translate-x-4 -translate-y-4 md:translate-x-0 md:translate-y-0">
            ?
          </div>

          {/* Desktop Badge Array */}
          <div className="hidden md:flex w-full md:w-1/3 justify-center z-10">
            <div className="w-48 h-48 rounded-full border-8 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-2xl">
              <span className="font-heading font-black text-4xl text-center leading-tight">
                মাস্টার<br/>বিল্ডার
              </span>
            </div>
          </div>

          <div className="w-full md:w-2/3 z-10 text-left">
            
            {/* Mobile Header Row */}
            <div className="flex md:hidden items-center gap-4 mb-4">
              <div className="w-16 h-16 shrink-0 rounded-full border-[3px] border-emerald-300 flex items-center justify-center bg-emerald-500 shadow-md">
                <span className="font-heading font-black text-xs text-center leading-tight">
                  মাস্টার<br/>বিল্ডার
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-200 mb-0.5">
                  প্লে পার্সোনালিটি ম্যাচ
                </h2>
                <h3 className="text-xl font-black font-heading leading-tight">
                  আপনার সন্তানের জন্য সঠিক?
                </h3>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-100 mb-2">
                প্লে পার্সোনালিটি ম্যাচ
              </h2>
              <h3 className="text-3xl md:text-5xl font-black font-heading">
                এই খেলনাটি কি আপনার সন্তানের জন্য সঠিক?
              </h3>
            </div>
            
            <p className="text-sm md:text-lg text-emerald-50 mb-6 md:mb-8 leading-relaxed opacity-90">
              <b className="text-white bg-emerald-700/50 px-1 py-0.5 rounded">মাস্টার বিল্ডার</b> এর জন্য পারফেক্ট। যে সব বাচ্চারা লজিক পাজল
              এবং আর্কিটেকচারাল ডিজাইন পছন্দ করে তারা এই খেলনাটির সাথে ঘণ্টার পর
              ঘণ্টা মেতে থাকবে।
            </p>
            
            <button className="w-full md:w-auto px-6 py-3.5 md:py-4 bg-white text-emerald-700 font-bold rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 relative z-10">
              পার্সোনালিটি কুইজ খেলুন <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* TABS (DESKTOP & MOBILE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 lg:mt-24 border-b border-slate-200 dark:border-slate-800">
        <div className="flex w-full md:max-w-2xl md:mx-auto">
          <button 
            onClick={() => setMobileTab('description')}
            className={`flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center border-b-2 transition-colors ${mobileTab === 'description' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setMobileTab('video')}
            className={`flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center border-b-2 transition-colors ${mobileTab === 'video' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Demo Video
          </button>
        </div>
      </div>

      {/* GORGEOUS DESCRIPTION SECTION */}
      <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 lg:mt-12 ${mobileTab === 'description' ? 'block' : 'hidden'}`}>
        <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] shadow-lg md:shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          {/* Top Banner / Intro */}
          <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-600 p-6 md:p-10 lg:p-12 text-white text-center relative overflow-hidden">
            {/* Background glowing elements */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 md:-mr-20 md:-mt-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 md:-ml-20 md:-mb-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-cyan-300 opacity-20 blur-3xl"></div>
            
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black font-heading mb-3 md:mb-4 relative z-10 text-white drop-shadow-md leading-tight">
              সৃজনশীলতা বিকাশের সেরা খেলনা
            </h3>
            <p className="text-primary-50 text-[15px] md:text-lg lg:text-xl max-w-3xl mx-auto relative z-10 leading-relaxed font-medium">
              ম্যাগনা-টাইলস ১০০-পিস ক্লিয়ার কালারস সেট! মজায় মজায় বিজ্ঞান, গণিত ও স্থাপত্যবিদ্যার হাতেখড়ি নিতে এই ম্যাগনেটিক টাইলস অতুলনীয়। মোবাইল আসক্তি দূর করে আপনার শিশুকে কল্পনাপ্রসূত খেলায় ব্যস্ত রাখার এটি এক আদর্শ উপহার।
            </p>
          </div>

          <div className="p-4 md:p-8 lg:p-12">
            
            <div className="text-center mb-8 md:mb-10 max-w-3xl mx-auto">
                <h4 className="text-[17px] md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">খেলার ছলে ব্রেন ডেভেলপমেন্ট 🎓🌟</h4>
                <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-base leading-relaxed">শিশুর মেধা বিকাশে চাই সঠিক খেলনা। এই ৩ডি ম্যাগনেটিক টাইলস দিয়ে বাচ্চারা নিজেরাই বানাতে পারবে বিশাল দুর্গ, রকেট বা যেকোনো জ্যামিতিক নকশা আকার যা তাদের স্থানিক যুক্তি এবং সূক্ষ্ম মোটর স্কিল বাড়ায়।</p>
            </div>

            {/* Elegant Features Row */}
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5 md:mb-6 text-center">কেন এই সেটটি প্রয়োজন?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
              
              {/* Feature 1 */}
              <div className="group bg-slate-50 dark:bg-slate-800/30 p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900/50 transition-all duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
                  <Smartphone className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">মোবাইল আসক্তি মুক্তি</h4>
                <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm leading-relaxed">
                  টিভি বা ফোনের বদলে শিশুকে শিক্ষণীয় ম্যাগনেটিক ব্লকস তৈরি করতে দীর্ঘক্ষণ ব্যস্ত রাখে।
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-slate-50 dark:bg-slate-800/30 p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-amber-100 dark:hover:border-amber-900/50 transition-all duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                  <Lightbulb className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">সৃজনশীলতা বৃদ্ধি</h4>
                <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm leading-relaxed">
                  অগণিত থ্রিডি মডেল তৈরির মাধ্যমে শিশুর কল্পনাশক্তি ও সৃজনশীলতা বহুগুণ বৃদ্ধি পায়।
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-slate-50 dark:bg-slate-800/30 p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-emerald-100 dark:hover:border-emerald-900/50 transition-all duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
                  <Brain className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">মেধা বিকাশ</h4>
                <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm leading-relaxed">
                  জ্যামিতিক আকৃতি ও রঙ মেলানোর খেলা শিশুর ব্রেনের সঠিক বিকাশ ঘটাতে সাহায্য করে।
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group bg-slate-50 dark:bg-slate-800/30 p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-pink-100 dark:hover:border-pink-900/50 transition-all duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                  <Gift className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 md:mb-2">উপহার হিসেবে সেরা</h4>
                <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm leading-relaxed">
                  ৩ বছর থেকে শুরু করে যেকোনো বয়সের বাচ্চার জন্মদিনের সেরা ও নিরাপদ উপহার।
                </p>
              </div>

            </div>

             {/* Beautiful What's Included */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl md:rounded-[2rem] p-5 md:p-8 lg:p-10 border border-slate-100 dark:border-slate-700/50">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center shrink-0">
                   <Package className="w-5 h-5 md:w-8 md:h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl md:text-3xl font-black font-heading text-slate-900 dark:text-white mb-1">
                    প্যাকেজে যা যা থাকছে:
                  </h3>
                  <p className="text-slate-500 text-[13px] md:text-sm">প্রিমিয়াম এডুকেশনাল কম্বো প্যাকেজ</p>
                </div>
              </div>
              
              {/* Flex Tags for included items */}
              <div className="flex flex-wrap gap-2.5 sm:gap-4 mb-6 md:mb-8">
                {[
                  { count: "৫০x", text: "ছোট স্কয়ার টাইলস" },
                  { count: "২০x", text: "সমবাহু ত্রিভুজ" },
                  { count: "১৫x", text: "সমদ্বিবাহু ত্রিভুজ" },
                  { count: "১৫x", text: "বড় স্কয়ার টাইলস" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white dark:bg-slate-900 pl-1 pr-3 md:pr-4 py-1.5 md:py-1.5 rounded-full border border-slate-200 dark:border-slate-700/80 shadow-sm transition-colors cursor-default">
                    <span className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 font-bold text-[12px] md:text-sm flex items-center justify-center mr-2 md:mr-3 shrink-0">
                      {item.count}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-[13px] md:text-[15px]">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

               {/* Details List */}
               <div className="space-y-4 md:space-y-5 pt-5 md:pt-6 border-t border-slate-200 dark:border-slate-700/50">
                  <div className="flex gap-3 md:gap-4 items-start">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mt-1 md:mt-0.5 shrink-0" />
                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white text-[15px] md:text-base">১০০-পিস ম্যাগনেটিক সেট</h5>
                        <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm mt-1">এই সেটে রয়েছে বিভিন্ন আকৃতির ১০০টি শক্তিশালী ম্যাগনেটিক টাইলস যা দিয়ে অনায়াসেই বিশাল থেকে বিশাল সব ভাস্কর্য তৈরি করা সম্ভব। এটি বাচ্চাদের জ্যামিতি এবং আর্কিটেকচারের প্রাথমিক ধারণা দেয়।</p>
                    </div>
                  </div>
                  <div className="flex gap-3 md:gap-4 items-start">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mt-1 md:mt-0.5 shrink-0" />
                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white text-[15px] md:text-base">বিপিএ-মুক্ত ও সম্পূর্ণ নিরাপদ</h5>
                        <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm mt-1">সবগুলো টাইলস নন-টক্সিক ফুড-গ্রেড এবিএস (ABS) প্লাস্টিক দিয়ে তৈরি এবং এতে কোনো ক্ষতিকারক রাসায়নিক নেই। প্রতিটি টাইলসে অত্যন্ত নিরাপত্তার জন্য স্টেইনলেস স্টিল রিভেট ব্যবহার করা হয়েছে।</p>
                    </div>
                  </div>
                  <div className="flex gap-3 md:gap-4 items-start">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 mt-1 md:mt-0.5 shrink-0" />
                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white text-[15px] md:text-base">উজ্জ্বল ক্লিয়ার কালারস</h5>
                        <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-sm mt-1">টাইলসগুলো সূর্যের আলোতে বা ঘরের লাইটে অত্যন্ত আকর্ষণীয় দেখায় যা বাচ্চাদের মনোযোগ আকর্ষণ করে এবং রঙ पहचानने (কালার রিকগনিশন) দক্ষতা বাড়ায়।</p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* VIDEO DEMONSTRATION SECTION */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 ${mobileTab === 'video' ? 'block' : 'hidden'}`}>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-4">
            ভিডিওটি দেখুন
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            দেখুন কীভাবে ম্যাগনা-টাইলস সৃজনশীলতাকে জাগ্রত করে।
          </p>
        </div>

        {/* YouTube-like Layout Wrapper */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Video Player (Left) */}
          <div className="flex-1">
            <div className="relative w-full aspect-video bg-[#0f172a] rounded-[2rem] shadow-2xl overflow-hidden group cursor-pointer border-[8px] md:border-[12px] border-slate-800">
              <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply transition-opacity group-hover:opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 border border-white/20 shadow-xl">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary-600 ml-1 fill-current" />
                  </div>
                </div>
              </div>
              {/* Fake Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                <div className="h-full w-1/3 bg-primary-600"></div>
              </div>
            </div>
            
            {/* Main Video Info */}
            <div className="mt-5 px-1 lg:px-2">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                বাচ্চাদের জন্য সেরা এডুকেশনাল খেলনা: কীভাবে খেলবেন?
              </h3>
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">
                    S
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Sodayon Toys</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span>१००के ভিউজ</span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span>३ সপ্তাহ আগে</span>
              </div>
            </div>
          </div>

          {/* Related Videos Sidebar (Right) */}
          <div className="lg:w-[380px] xl:w-[420px] flex flex-col shrink-0">
            <h4 className="text-slate-900 dark:text-white font-bold mb-4 text-lg">সম্পর্কিত ভিডিও</h4>
            
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[450px] lg:max-h-[550px] pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              
              {[
                { title: "ম্যাগনা-টাইলস १००० পিস আনবক্সিং এবং ওভারভিউ", views: "४५के", time: "१ মাস আগে", duration: "८:४५" },
                { title: "বাচ্চাদের ব্রেন ডেভেলপমেন্টে এসব খেলনা কেন জরুরি?", views: "८९कে", time: "३ মাস আগে", duration: "१२:१०" },
                { title: "কীভাবে বিশাল দুর্গ বানাবেন? স্টেপ বাই স্টেপ গাইড", views: "२१कে", time: "३ সপ্তাহ আগে", duration: "५:३०" },
                { title: "ম্যাগনা-টাইলস বনাম অন্যান্য ব্র্যান্ড: কোনটি কিনবেন?", views: "११२के", time: "५ মাস আগে", duration: "१५:२०" },
                { title: "५টি মজার গেম যা আপনি এই টাইলস দিয়ে খেলতে পারেন", views: "६७कে", time: "६ মাস আগে", duration: "१०:०५" },
                { title: "ক্রেজি টাওয়ার বিল্ডিং চ্যালেঞ্জ!", views: "१९के", time: "२ সপ্তাহ আগে", duration: "६:४५" },
              ].map((vid, idx) => (
                <div key={idx} className="flex gap-3 group cursor-pointer hover:bg-white dark:hover:bg-slate-800 p-2 -mx-2 rounded-xl transition-colors">
                  {/* Thumbnail Element */}
                  <div className="relative w-[140px] shrink-0 aspect-video bg-slate-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/10 transition-colors"></div>
                    <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-medium text-white">{vid.duration}</div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Play className="w-8 h-8 text-white drop-shadow-md fill-white/20" />
                    </div>
                  </div>
                  {/* Info Element */}
                  <div className="flex flex-col justify-start pt-0.5">
                    <h5 className="text-slate-800 dark:text-slate-100 text-[13px] font-bold line-clamp-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {vid.title}
                    </h5>
                    <span className="text-slate-500 text-xs mt-1.5">Sodayon Toys</span>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                      <span>{vid.views} ভিউজ</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                      <span>{vid.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>

      {/* FEEDBACK TABS (Reviews / Q&A) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setFeedbackTab('reviews')}
            className={`flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center border-b-2 transition-colors ${feedbackTab === 'reviews' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Reviews and Ratings
          </button>
          <button 
            onClick={() => setFeedbackTab('qa')}
            className={`flex-1 py-3 md:py-4 text-sm md:text-base font-bold text-center border-b-2 transition-colors ${feedbackTab === 'qa' ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Product Q/A
          </button>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 ${feedbackTab === 'reviews' ? 'block' : 'hidden'}`}>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Summary Column */}
          <div className="lg:w-[35%] xl:w-1/3">
            <div className="flex gap-6 mb-6">
              {/* Left Score Side */}
              <div className="flex flex-col w-[120px]">
                <span className="text-5xl md:text-6xl text-slate-800 dark:text-white mb-1.5 leading-none font-light">
                  4.18
                </span>
                <div className="flex items-center text-amber-500 mb-1.5">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-slate-500 text-[13px] leading-snug">
                  21 Ratings and 17 Reviews
                </span>
              </div>
              
              {/* Right Bars Side */}
              <div className="flex-1 flex flex-col gap-1.5 text-[13px] text-slate-500 justify-end pb-1">
                {[
                  { stars: 5, count: 15, percent: 70 },
                  { stars: 4, count: 2, percent: 10 },
                  { stars: 3, count: 2, percent: 10 },
                  { stars: 2, count: 0, percent: 0 },
                  { stars: 1, count: 3, percent: 15 },
                ].map((item) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className="w-2">{item.stars}</span>
                    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                       <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
                    </div>
                    <span className="w-4 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rate this product */}
            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300 mb-2 text-[15px]">Rate this product</p>
              <div className="flex items-center gap-1 text-amber-500 mb-5 cursor-pointer" onClick={() => setIsWriteReviewOpen(true)}>
                <Star className="w-6 h-6 stroke-[1.5]" />
                <Star className="w-6 h-6 stroke-[1.5]" />
                <Star className="w-6 h-6 stroke-[1.5]" />
                <Star className="w-6 h-6 stroke-[1.5]" />
                <Star className="w-6 h-6 stroke-[1.5]" />
              </div>
              <button 
                onClick={() => setIsWriteReviewOpen(true)}
                className="px-6 py-2 border border-primary-500 text-primary-500 dark:text-primary-400 font-medium rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              >
                Write a review
              </button>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 hidden lg:block"></div>
          </div>

          {/* Feedback Column */}
          <div className="lg:w-[65%] xl:w-2/3">
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 pb-5 border-b border-slate-100 dark:border-slate-800">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h10M4 18h4"/></svg>
               <select className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:border-primary-500 cursor-pointer min-w-[120px]">
                 <option>Default</option>
                 <option>Recent</option>
                 <option>Highest Rating</option>
               </select>
            </div>

            <div className="flex flex-col mt-5">
              {/* Single Review Item */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#004d40] rounded-full flex items-center justify-center font-bold text-white shrink-0 text-lg">
                    S
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">
                      By <span className="text-primary-500 dark:text-primary-400">Saifuddin</span>, 15 Oct 2024
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div className="flex items-center gap-1 text-[#00c853] text-[11px] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Purchase
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
                  সোনামণির খুব পছন্দের একটি খেলনা! ঘণ্টার পর ঘণ্টা সে এটা দিয়ে দুর্গ, ঘর, এবং গাড়ি বানাচ্ছে। কোয়ালিটি সত্যিই চমৎকার আর শক্তিশালী ম্যাগনেট হওয়ার কারণে ব্লকগুলো সহজেই লেগে থাকে।
                </p>
                
                <div className="mb-3">
                  <span className="text-xs text-slate-400">Was this review helpful to you?</span>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <ThumbsUp className="w-4 h-4" strokeWidth={1.5} />
                    Helpful (8)
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <ThumbsDown className="w-4 h-4" strokeWidth={1.5} />
                    Not Helpful
                  </button>
                </div>
              </div>

              {/* Second Review Item */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                    <img src="/icons/book.png" alt="Avatar" className="w-full h-full object-cover opacity-50" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">
                      By <span className="text-primary-500 dark:text-primary-400">Jakaria</span>, 30 Apr 2025
                    </div>
                    <div className="flex text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-1">
                  বাচ্চারা মোবাইল ছেড়ে এই টাইলস নিয়ে ব্যস্ত থাকে, এটাই সবচেয়ে বড় সুবিধা। প্লাস্টিকগুলো অনেক মজবুত, কয়েকবার হাত থেকে পড়লেও একটুও ভাঙেনি। হাইলি রেকমেন্ডেড!
                </p>
                <div className="mb-4">
                  <button className="text-primary-500 text-xs font-bold hover:underline">Read More</button>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs text-slate-400">Was this review helpful to you?</span>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <ThumbsUp className="w-4 h-4" strokeWidth={1.5} />
                    Helpful (4)
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <ThumbsDown className="w-4 h-4" strokeWidth={1.5} />
                    Not Helpful
                  </button>
                </div>
              </div>

              {/* Show more Review button */}
              <div className="py-2">
                <button className="text-primary-500 text-sm font-medium hover:underline flex items-center justify-between w-full text-left">
                  Show more Review(s)
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT Q/A SECTION */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 ${feedbackTab === 'qa' ? 'block' : 'hidden'}`}>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Submission Column (Left) */}
          <div className="lg:w-[35%] xl:w-1/3">
            <p className="text-[15px] text-slate-700 dark:text-slate-300 mb-2">Have a question regarding the product?</p>
            <div className="mb-6">
              <textarea 
                className="w-full h-32 p-3 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:border-primary-500 resize-none mb-4 placeholder:text-slate-400"
                placeholder="Write a question..."
              />
              <button className="px-6 py-2 border border-primary-500 text-primary-500 dark:text-primary-400 font-medium rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors w-full sm:w-auto">
                Submit Question
              </button>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 hidden lg:block"></div>
          </div>

          {/* Q/A List Column (Right) */}
          <div className="lg:w-[65%] xl:w-2/3">
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 pb-5 border-b border-slate-100 dark:border-slate-800">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h10M4 18h4"/></svg>
               <select className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:border-primary-500 cursor-pointer min-w-[120px]">
                 <option>Default</option>
                 <option>Most Recent</option>
                 <option>Top Answered</option>
               </select>
            </div>

            <div className="flex flex-col mt-5">
              {/* Item 1 */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
                <div className="flex gap-2 sm:gap-3 mb-4">
                  <span className="font-bold text-slate-800 dark:text-white">Q:</span>
                  <div>
                    <p className="text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">এই সেট দিয়ে কি গাড়ি বানানো যাবে?</p>
                    <p className="text-xs sm:text-[13px] text-slate-500">Questioned by <span className="font-semibold text-slate-600 dark:text-slate-400">880****564</span> on 24 Apr, 2025</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 ml-2 md:ml-6">
                  <span className="font-bold text-slate-800 dark:text-white">A:</span>
                  <div>
                    <p className="text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">প্রিয় গ্রাহক, এই সেটে চাকাযুক্ত কোনো বেস নেই, তবে আপনি স্কয়ার টাইলস দিয়ে গাড়ির বডি বানাতে পারবেন।</p>
                    <p className="text-xs sm:text-[13px] text-slate-500">Answered by <span className="font-semibold text-slate-600 dark:text-slate-400">Rafid Ahmed</span> on 24 Apr, 2025</p>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-4">
                <div className="flex gap-2 sm:gap-3 mb-4">
                  <span className="font-bold text-slate-800 dark:text-white">Q:</span>
                  <div>
                    <p className="text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">Are the plastics totally safe for kids?</p>
                    <p className="text-xs sm:text-[13px] text-slate-500">Questioned by <span className="font-semibold text-slate-600 dark:text-slate-400">Sourav Das</span> on 23 Mar, 2025</p>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 ml-2 md:ml-6">
                  <span className="font-bold text-slate-800 dark:text-white">A:</span>
                  <div>
                    <p className="text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">Dear customer, yes! The tiles are made of Food-grade ABS plastic which is BPA free and completely safe.</p>
                    <p className="text-xs sm:text-[13px] text-slate-500">Answered by <span className="font-semibold text-slate-600 dark:text-slate-400">Rafid Ahmed</span> on 23 Mar, 2025</p>
                  </div>
                </div>
              </div>

              {/* Show more button */}
              <div className="py-2">
                <button className="text-primary-500 text-sm font-medium hover:underline flex items-center justify-between w-full text-left">
                  Show more Question(s)
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32">
        <h2 className="text-2xl lg:text-3xl font-black font-heading text-slate-900 dark:text-white mb-6 lg:mb-10">
          এগুলোর সাথে মানানসই
        </h2>
        <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0">
          {relatedProducts.slice(0, 4).map((rel) => (
            <div key={rel.id} className="w-[calc(50%-8px)] flex-shrink-0 snap-start lg:w-auto">
              <ProductCard
                name={rel.name}
                price={`৳${rel.price}`}
                img={rel.image || "bg-indigo-100"}
                link={`/shop/products/${rel.id}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* RECENTLY VIEWED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-24 mb-12">
        <h2 className="text-2xl lg:text-3xl font-black font-heading text-slate-900 dark:text-white mb-6 lg:mb-10">
          রিসেন্টলি দেখা পণ্য
        </h2>
        <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0">
          {relatedProducts.slice(0, 4).reverse().map((rel) => (
            <div key={`recent-${rel.id}`} className="w-[calc(50%-8px)] flex-shrink-0 snap-start lg:w-auto">
              <ProductCard
                name={rel.name}
                price={`৳${rel.price}`}
                img={rel.image || "bg-indigo-100"}
                link={`/shop/products/${rel.id}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* STICKY ADD TO CART BAR (MOBILE ONLY) */}
      <MobileStickyCart 
        isAbsoluteMode={isAbsoluteMode}
        hasAlternative={false} 
        alternativeTitle="eBook Version Available"
        alternativePrice="180"
        alternativeImage="/next.svg"
      />

      {/* DESKTOP STICKY ADD TO CART FAB (Middle Right Side) */}
      <div className={`hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex-col items-end gap-3 transition-all duration-500 transform ${showDesktopStickyCart ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0 pointer-events-none'}`}>
         
         {/* Expandable Cart Button */}
         <button className="group relative flex items-center justify-end h-16 bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 border-y border-l border-primary-200 dark:border-slate-700 hover:bg-primary-100 dark:hover:bg-slate-700 rounded-l-2xl shadow-[-4px_0_15px_rgba(0,0,0,0.05)] transition-all duration-300 w-16 hover:w-[200px] overflow-hidden">
            <span className="text-[14px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 pl-5">
               কার্টে যোগ করুন
            </span>
            <div className="w-16 h-16 shrink-0 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
            </div>
            {/* Notification Dot */}
            {quantity > 1 && (
              <span className="absolute top-1.5 right-2.5 w-4 h-4 bg-primary-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm transition-opacity group-hover:opacity-0">
                {quantity}
              </span>
            )}
         </button>

         {/* Expandable Buy Now Button */}
         <button className="group relative flex items-center justify-end h-16 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white rounded-l-2xl shadow-[-8px_0_20px_rgba(0,0,0,0.15)] transition-all duration-300 w-16 hover:w-[240px] overflow-hidden border-y border-l border-primary-500/30">
            <span className="text-[14px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 pl-4">
               অর্ডার করুন
               <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0"></span>
               ৳{MOCK_PRODUCT.price * quantity}
            </span>
            <div className="w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
         </button>
      </div>

      {/* WRITE A REVIEW DRAWER */}
      <WriteReviewDrawer
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        productName={MOCK_PRODUCT.name}
        productImage={MOCK_PRODUCT.images[0]}
        price={MOCK_PRODUCT.price}
        oldPrice={MOCK_PRODUCT.originalPrice}
      />
    </div>
  );
}
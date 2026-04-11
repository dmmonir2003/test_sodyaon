"use client";

import { useState } from "react";
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
  Baby, // For Age Range
} from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";

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
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-32">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 lg:p-12 shadow-2xl border border-slate-100 dark:border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="space-y-6">
              <div
                className={`relative w-full aspect-square rounded-3xl overflow-hidden cursor-crosshair transition-colors duration-500 ${MOCK_PRODUCT.images[activeImage]} shadow-inner`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply dark:mix-blend-color-burn transition-transform duration-200 ease-out flex items-center justify-center p-12"
                  style={zoomStyle}
                >
                  <div className="w-full h-full border-8 border-white/40 border-dashed rounded-full flex justify-center items-center">
                    <span className="font-heading font-black text-6xl text-slate-800/20 rotate-[-15deg]">
                      টয় প্রিভিউ
                    </span>
                  </div>
                </div>

                {!isZooming && (
                  <>
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md">
                        সেল
                      </span>
                      <span className="px-3 py-1 bg-white text-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md">
                        বেস্টসেলার
                      </span>
                    </div>
                    <div className="absolute bottom-6 right-6 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 border border-white/50 shadow-sm pointer-events-none">
                      জুম করতে হোভার করুন
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {(MOCK_PRODUCT.images || []).map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-24 flex-shrink-0 rounded-2xl border-4 transition-all overflow-hidden ${activeImage === idx ? "border-primary-500 shadow-lg scale-105" : "border-transparent hover:border-primary-300 opacity-70 hover:opacity-100"}`}
                  >
                    <div className={`w-full h-full ${img}`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
                    {MOCK_PRODUCT.brand}
                  </span>
                  {/* AGE RANGE BADGE */}
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600">
                    <Baby className="w-3.5 h-3.5 text-primary-500" />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      বয়স: {MOCK_PRODUCT.ageRange}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-primary-500 hover:bg-primary-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white leading-tight mb-4">
                {MOCK_PRODUCT.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 fill-current ${i === 4 ? "opacity-50" : ""}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-500 hover:text-primary-600 cursor-pointer">
                  {MOCK_PRODUCT.rating} ({MOCK_PRODUCT.reviewsCount} রিভিউস)
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  ৳{MOCK_PRODUCT.price}
                </span>
                <span className="text-xl font-bold text-slate-400 line-through">
                  ৳{MOCK_PRODUCT.originalPrice}
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 text-xs font-bold rounded-md">
                  ৳১০০০ বাঁচান
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
                {MOCK_PRODUCT.description}
              </p>

              {/* Options Selection */}
              <div className="space-y-8 mb-10">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-bold text-slate-900 dark:text-white">
                      রং:{" "}
                      <span className="text-slate-500 font-medium">
                        {MOCK_PRODUCT.colors[activeColor].name}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {(MOCK_PRODUCT.colors || []).map((color: {name: string, class: string}, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveColor(idx)}
                        className={`w-12 h-12 rounded-full border-4 transition-all ${activeColor === idx ? "border-primary-500 scale-110 shadow-md" : "border-slate-200 dark:border-slate-700 hover:border-slate-400"}`}
                      >
                        <div
                          className={`w-full h-full rounded-full ${color.class}`}
                        ></div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-bold text-slate-900 dark:text-white">
                      সাইজ / স্টাইল:
                    </span>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium underline underline-offset-4">
                      সাইজ গাইড
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(MOCK_PRODUCT.sizes || []).map((size: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSize(idx)}
                        className={`px-5 py-3 rounded-xl border-2 font-bold text-sm transition-all ${activeSize === idx ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between border-2 border-slate-200 dark:border-slate-700 rounded-2xl w-full sm:w-36 overflow-hidden bg-white dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-14 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-14 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-black text-lg shadow-lg transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
                  কার্টে যোগ করুন — ৳{MOCK_PRODUCT.price * quantity}
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" /> ১-বছরের
                  ওয়ারেন্টি
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-500" /> ২৫০০ টাকার উপরে
                  ফ্রি শিপিং
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-orange-500" /> ৩০-দিনের
                  ফ্রি রিটার্ন
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" /> নন-টক্সিক
                  এবং নিরাপদ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UNIQUE SECTION: Play Personality Match */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none text-[20rem] font-black leading-none">
            ?
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-2xl">
              <span className="font-heading font-black text-4xl text-center leading-tight">
                মাস্টার
                <br />
                বিল্ডার
              </span>
            </div>
          </div>
          <div className="w-full md:w-2/3 z-10 text-center md:text-left">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-100 mb-2">
              প্লে পার্সোনালিটি ম্যাচ
            </h2>
            <h3 className="text-3xl md:text-5xl font-black font-heading mb-4">
              এই খেলনাটি কি আপনার সন্তানের জন্য সঠিক?
            </h3>
            <p className="text-lg text-emerald-50 mb-8 max-w-2xl">
              <b>মাস্টার বিল্ডার</b> এর জন্য পারফেক্ট। যে সব বাচ্চারা লজিক পাজল
              এবং আর্কিটেকচারাল ডিজাইন পছন্দ করে তারা এই খেলনাটির সাথে ঘণ্টার পর
              ঘণ্টা মেতে থাকবে।
            </p>
            <button className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-colors flex items-center gap-2 mx-auto md:mx-0">
              পার্সোনালিটি কুইজ খেলুন <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* VIDEO DEMONSTRATION SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-4">
            ভিডিওটি দেখুন
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            দেখুন কীভাবে ম্যাগনা-টাইলস সৃজনশীলতাকে জাগ্রত করে।
          </p>
        </div>
        <div className="relative w-full max-w-5xl mx-auto aspect-video bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden group cursor-pointer border-[12px] border-slate-800">
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply transition-opacity group-hover:opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 border border-white/40">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-primary-600 ml-1 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 border-t border-slate-200 dark:border-slate-800 pt-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-black font-heading text-slate-900 dark:text-white mb-6">
              কাস্টমার রিভিউ
            </h2>
            <div className="flex items-center gap-4 mb-8 text-amber-400">
              <span className="text-6xl font-black text-slate-900 dark:text-white mr-2">
                ৪.৯
              </span>
              <div className="flex flex-col">
                <div className="flex">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="text-slate-500 text-sm font-medium">
                  {MOCK_PRODUCT.reviewsCount} টি রিভিউস
                </span>
              </div>
            </div>
            <button className="w-full py-4 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white rounded-xl font-bold transition-colors">
              রিভিউ লিখুন
            </button>
          </div>
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                  খেলার সময়ের জন্য সেরা বিনিয়োগ!
                </h4>
                <span className="text-slate-400 text-sm">২ দিন আগে</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                আমার ৪ বছরের মেয়ে এটি নিয়ে খেলতে ভীষন পছন্দ করে। হাইলি
                রিকমেন্ডেড!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
                  SJ
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  সারাহ জেনকিন্স
                </span>
              </div>
            </div>
            <button className="text-primary-600 font-bold hover:underline flex items-center gap-2">
              সব রিভিউ দেখুন <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <h2 className="text-3xl font-black font-heading text-slate-900 dark:text-white mb-10">
          এগুলোর সাথে মানানসই
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.slice(0, 4).map((rel) => (
            <ProductCard
              key={rel.id}
              name={rel.name}
              price={`৳${rel.price}`}
              img={rel.image || "bg-indigo-100"}
              link={`/shop/products/${rel.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

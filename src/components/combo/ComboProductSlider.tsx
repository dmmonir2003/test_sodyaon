"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const comboProducts = [
  {
    id: 101,
    name: "অ্যাডভান্সড রোবটিক্স কিট + কোডিং গাইড",
    brand: "STEM Master",
    oldPrice: "৳ ৪,৫০০",
    currentPrice: "৳ ৩,৫০০",
    discount: "২২% ছাড়",
    rating: 5,
    reviews: 45,
    image: "/images/combo/combo_slide_1.png",
    inStock: true,
  },
  {
    id: 102,
    name: "ম্যাগনেটিক বিল্ডিং ব্লকস + প্লে ম্যাট",
    brand: "Creative Kids",
    oldPrice: "৳ ৩,২০০",
    currentPrice: "৳ ২,৫০০",
    discount: "২১% ছাড়",
    rating: 4,
    reviews: 32,
    image: "/images/combo/combo_card_bg_2.png",
    inStock: true,
  },
  {
    id: 103,
    name: "আর্ট অ্যান্ড ক্রাফট মেগা সেট + ক্যানভাস",
    brand: "Artistic Souls",
    oldPrice: "৳ ২,৮০০",
    currentPrice: "৳ ২,১০০",
    discount: "২৫% ছাড়",
    rating: 5,
    reviews: 28,
    image: "/images/combo/combo_card_bg_1.png",
    inStock: true,
  },
  {
    id: 104,
    name: "বেবি সেন্সরি টয় + মিউজিক্যাল জিম",
    brand: "Tiny Steps",
    oldPrice: "৳ ৫,৫০০",
    currentPrice: "৳ ৪,২০০",
    discount: "২৩% ছাড়",
    rating: 4,
    reviews: 56,
    image: "/images/combo/combo_slide_2.png",
    inStock: true,
  },
  {
    id: 105,
    name: "আউটডোর এক্সপ্লোরেশন কিট + বাইনোকুলার",
    brand: "Nature Explorer",
    oldPrice: "৳ ৩,০০০",
    currentPrice: "৳ ২,২৫০",
    discount: "২৫% ছাড়",
    rating: 5,
    reviews: 19,
    image: "/images/combo/combo_slide_4.png",
    inStock: true,
  },
  {
    id: 106,
    name: "ডিজিটাল কীবোর্ড + লার্নিং পিয়ানো ম্যাট",
    brand: "Music Joy",
    oldPrice: "৳ ৬,০০০",
    currentPrice: "৳ ৫,০০০",
    discount: "১৬% ছাড়",
    rating: 4,
    reviews: 41,
    image: "/images/combo/combo_slide_3.png",
    inStock: true,
  },
  {
    id: 107,
    name: "৩ডি উডেন পাজল + সায়েন্স এক্সপেরিমেন্ট",
    brand: "Brainy Toys",
    oldPrice: "৳ ২,৫০০",
    currentPrice: "৳ ১,৯০০",
    discount: "২৪% ছাড়",
    rating: 5,
    reviews: 37,
    image: "/images/combo/combo_card_bg_1.png",
    inStock: true,
  },
  {
    id: 108,
    name: "ম্যাজিক কালারিং বুক + ওয়াটার পেন সেট",
    brand: "Color Magic",
    oldPrice: "৳ ১,৫০০",
    currentPrice: "৳ ১,২০০",
    discount: "২০% ছাড়",
    rating: 4,
    reviews: 22,
    image: "/images/combo/combo_card_bg_2.png",
    inStock: true,
  },
];

export default function ComboProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;
        
        // Dynamic scroll step based on screen size
        const step = window.innerWidth < 768 ? 141 : 214; // card width + gap

        if (scrollLeft >= maxScrollLeft - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="w-full py-12 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              জনপ্রিয় কম্বো পণ্যসমূহ
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">সবচেয়ে জনপ্রিয় খেলনা কম্বো প্যাকগুলো এখানে দেখুন</p>
          </div>
          <Link href="/shop" className="text-primary-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            সব দেখুন <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex overflow-x-auto pb-8 gap-2 md:gap-4 hide-scrollbar scroll-smooth snap-x"
        >
          {comboProducts.map((product) => (
            <div 
              key={product.id}
              className="flex-shrink-0 snap-start"
              style={{ width: 'var(--card-width)', height: 'var(--card-height)' }}
            >
              {/* Responsive Container with CSS Variables for exact sizing */}
              <div className="w-[133px] h-[282.328px] md:w-[198px] md:h-[384px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                
                {/* Image Section */}
                <Link href={`/shop/products/${product.id}`} className="relative h-[120px] md:h-[180px] w-full bg-slate-50 dark:bg-slate-900 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2 md:p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded shadow-sm">
                      {product.discount}
                    </div>
                  )}
                </Link>

                {/* Content Section */}
                <div className="p-2 md:p-4 flex flex-col flex-grow">
                  <span className="text-[9px] md:text-[11px] text-slate-400 dark:text-slate-500 font-medium">{product.brand}</span>
                  <Link href={`/shop/products/${product.id}`}>
                    <h3 className="text-[11px] md:text-[14px] font-bold text-slate-800 dark:text-white leading-tight mt-1 line-clamp-2 h-[2.5em] group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-2.5 h-2.5 md:w-3 h-3 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700'}`} 
                      />
                    ))}
                    <span className="text-[9px] md:text-[11px] text-slate-400 ml-1">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="mt-auto pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] md:text-[16px] font-black text-slate-900 dark:text-white">{product.currentPrice}</span>
                      {product.oldPrice && (
                        <span className="text-[10px] md:text-[12px] text-slate-400 line-through">{product.oldPrice}</span>
                      )}
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button className="w-full mt-2 md:mt-3 py-1.5 md:py-2 flex items-center justify-center gap-1.5 bg-primary-600 text-white text-[10px] md:text-xs font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 active:scale-95">
                      <ShoppingCart className="w-3 h-3 md:w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

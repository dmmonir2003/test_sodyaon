"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export type BrandItem = {
  id: number;
  name: string;
  logo: string;
  category: string;
};

interface BrandScrollerProps {
  title?: string;
  brands: BrandItem[];
}

export default function BrandScroller({ 
  title = "Our Brands", 
  brands 
}: BrandScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [brands]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-10 md:py-14 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex justify-between items-center mb-8 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-800 dark:text-white uppercase tracking-wider">
              {title}
            </h2>
            <div className="absolute -bottom-[3px] left-0 w-12 h-[3px] bg-primary-600"></div>
          </div>
          
          <Link 
            href="/shop?view=brands" 
            className="flex items-center gap-1 text-slate-400 hover:text-primary-600 font-bold text-xs sm:text-sm uppercase tracking-widest transition-colors group"
          >
            <span>See All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroller Container */}
        <div className="relative group/scroller">
          {/* Arrows - Desktop Only */}
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-primary-600 transition-all opacity-0 group-hover/scroller:opacity-100 hidden md:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-primary-600 transition-all opacity-0 group-hover/scroller:opacity-100 hidden md:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Cards Row */}
          <div 
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar snap-x pb-6"
          >
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/shop?brand=${brand.id}`}
                className="min-w-[140px] sm:min-w-[180px] md:min-w-[240px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-xl hover:border-primary-500/30 transition-all duration-300 snap-start flex flex-col items-center justify-center group relative overflow-hidden transform -skew-x-12 origin-bottom"
              >
                {/* Content follows the card skew */}
                <div className="flex flex-col items-center justify-center w-full">
                  {/* Logo Container */}
                  <div className="relative w-full h-10 sm:h-14 mb-3 flex items-center justify-center">
                     <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                       <Image 
                         src={brand.logo}
                         alt={brand.name}
                         fill
                         className="object-contain"
                         sizes="(max-width: 640px) 100px, 160px"
                       />
                     </div>
                  </div>
                  
                  {/* Brand Info with its own skewed labels */}
                  <div className="text-center w-full space-y-1">
                     <div className="bg-slate-50 dark:bg-slate-900/50 py-1 px-2 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                       <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white transition-colors group-hover:text-primary-600 leading-tight">
                         {brand.name}
                       </h4>
                     </div>
                     <div className="bg-primary-600 text-white py-0.5 px-3 inline-block">
                       <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                         {brand.category}
                       </p>
                     </div>
                  </div>
                </div>

                {/* Decorative Accent on edge */}
                <div className="absolute top-0 right-0 w-1.5 h-full bg-primary-600/0 group-hover:bg-primary-600 transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Pagination Indicators - Mobile Only decoration */}
          <div className="flex md:hidden justify-center gap-1.5 mt-2">
             <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          </div>
        </div>

      </div>
    </section>
  );
}

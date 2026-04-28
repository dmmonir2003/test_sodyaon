"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import QuickDealCard, { QuickDealProductProps } from "./QuickDealCard";
import { useColors } from "@/hooks/useColors";

interface QuickDealSectionProps {
  title?: string;
  products: QuickDealProductProps[];
  bgPattern?: string;
  bgPatternDark?: string;
  autoSlideInterval?: number;
}

export default function QuickDealSection({ 
  title = "Quick Deal",
  products, 
  bgPattern = "/mock/quick_deal_bg.png",
  bgPatternDark = "/mock/quick_deal_bg_dark.png",
  autoSlideInterval = 3000
}: QuickDealSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const colors = useColors();
  const totalPairs = Math.ceil(products.length / 2);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 280;

      if (direction === "right") {
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  }, []);

  // Desktop auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scroll("right");
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isPaused, scroll, autoSlideInterval]);

  // Mobile auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (mobileScrollRef.current) {
        const container = mobileScrollRef.current;
        const nextDot = (activeDot + 1) % totalPairs;
        container.scrollTo({
          left: nextDot * container.clientWidth,
          behavior: 'smooth'
        });
      }
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isPaused, activeDot, totalPairs, autoSlideInterval]);

  // Track active dot from scroll position
  useEffect(() => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActiveDot(index);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-x-hidden py-10 md:py-16">
      {/* Background with Pattern */}
      <div 
        className={`absolute inset-0 z-0 ${colors.mode === 'dark' ? 'opacity-40' : 'opacity-100'}`}
        style={{ 
          backgroundColor: colors.modeColor(colors.warning[50], colors.dark.backgroundSecondary),
          backgroundImage: colors.mode === 'light' 
            ? (bgPattern ? `url('${bgPattern}')` : 'none')
            : (bgPatternDark ? `url('${bgPatternDark}')` : 'none'),
          backgroundSize: '300px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Soft gradient overlay for smooth edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-slate-950 dark:to-slate-950 opacity-40 z-[1] pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex justify-between items-end mb-6 md:mb-10">
          <div className="flex items-center gap-2">
            <div className="bg-accent-500 p-1.5 rounded-lg shadow-lg shadow-accent-500/20">
               <Zap className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
            </div>
            <h2 className="text-xl md:text-3xl font-black font-heading text-slate-800 dark:text-white tracking-tight">
              {title}
            </h2>
          </div>
          
          <Link 
            href="/deals" 
            className="group flex items-center gap-1 text-primary-600 hover:text-primary-700 font-bold text-sm md:text-base border-2 border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-1.5 md:px-6 md:py-2 rounded-lg transition-all"
          >
            <span>Shop More</span>
            <ChevronRight className="w-4 h-4 md:w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel Area - DESKTOP ONLY */}
        <div 
          className="hidden md:block relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-14 bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-600 z-50 transition-all hover:shadow-2xl hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Right Arrow */}
          <button 
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-14 bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-600 z-50 transition-all hover:shadow-2xl hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrolling Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory pb-4 mx-10"
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-[220px] max-w-[220px] lg:min-w-[260px] lg:max-w-[260px] snap-start flex-shrink-0">
                <QuickDealCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel - 2 Column Pairs with Auto-slide */}
        <div 
          className="md:hidden relative"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
        >
          <div 
            ref={mobileScrollRef}
            className="flex overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
          >
            {/* Group products into pairs of 2 */}
            {Array.from({ length: Math.ceil(products.length / 2) }).map((_, pairIndex) => (
              <div 
                key={pairIndex} 
                className="min-w-full w-full snap-start flex-shrink-0 grid grid-cols-2 gap-1.5 px-0.5"
              >
                {products.slice(pairIndex * 2, pairIndex * 2 + 2).map((product) => (
                  <QuickDealCard key={product.id} {...product} />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

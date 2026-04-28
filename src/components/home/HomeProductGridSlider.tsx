"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import HomeProductCard, { HomeProductCardProps } from './HomeProductCard';

interface HomeProductGridSliderProps {
  title: string;
  viewAllLink: string;
  products: HomeProductCardProps[];
  bgColor?: string;
}

export default function HomeProductGridSlider({
  title,
  viewAllLink,
  products,
  bgColor = "bg-white dark:bg-slate-950"
}: HomeProductGridSliderProps) {
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // standard scroll offset
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`py-8 md:py-12 border-b border-slate-200 dark:border-slate-800 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header - Matches Desktop Layout */}
        <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200">
            {title}
          </h2>
          {/* Desktop View All Button */}
          <Link
            href={viewAllLink}
            className="hidden md:inline-flex px-4 py-1.5 text-sm font-medium text-primary-600 border border-primary-300 dark:border-primary-800 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Content Area - Responsive Layout */}
        <div className="relative group">
           
           {/* Desktop Only: Horizontal Scroller */}
           <div className="hidden md:block">
              {/* Desktop Left Arrow Hint */}
              <div 
                onClick={() => scroll('left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-md"
              >
                  <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>

              <div 
                 ref={scrollContainerRef}
                 className="flex overflow-x-auto md:snap-x hide-scrollbar pb-4 -mx-2 px-2"
              >
                {products.map((product) => (
                  <div key={product.id} className="min-w-[220px] max-w-[220px] snap-start flex-shrink-0 px-2">
                     <HomeProductCard {...product} />
                  </div>
                ))}
              </div>

              {/* Desktop Right Arrow Hint */}
              <div 
                onClick={() => scroll('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-md"
              >
                  <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>
           </div>

           {/* Mobile Only: 2x2 Grid (Sliced to 4 items) */}
           <div className="grid grid-cols-2 gap-2 sm:gap-4 md:hidden">
             {products.slice(0, 4).map((product) => (
               <div key={`mobile-${product.id}`}>
                  <HomeProductCard {...product} />
               </div>
             ))}
           </div>

        </div>

        {/* Mobile View All Button - Shown only on small screens below the grid */}
        <div className="mt-4 block md:hidden">
           <Link
            href={viewAllLink}
            className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-primary-600 border border-primary-300 dark:border-slate-700 rounded hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-transparent"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
}

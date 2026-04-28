"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export type CollectionItem = {
  name: string;
  img: string; 
  link: string;
};

export type CollectionBlock = {
  id: number;
  title: string;
  items: CollectionItem[];
  seeMoreLink: string;
};

interface HomeCategoryCollectionProps {
  blocks: CollectionBlock[];
  bgColor?: string;
}

export default function HomeCategoryCollection({ 
  blocks,
  bgColor = "bg-slate-50 dark:bg-slate-950"
}: HomeCategoryCollectionProps) {

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

        if (isAtEnd) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, blocks.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`py-8 md:py-12 border-b border-slate-200 dark:border-slate-800 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Horizontal Scrollable Wrapper */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
           
           {/* Desktop Only: Left Arrow Hint */}
           <div 
             onClick={() => scroll('left')}
             className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-md"
           >
               <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
           </div>

           <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 md:gap-6">
             {blocks.map((block) => (
               <div 
                  key={block.id} 
                  className="min-w-[280px] max-w-[280px] sm:min-w-[320px] sm:max-w-[320px] lg:min-w-[382px] lg:max-w-[382px] snap-start flex-shrink-0 bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-800 shadow-sm"
               >
                  {/* Block Title */}
                  <h3 className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 line-clamp-1">
                    {block.title}
                  </h3>

                  {/* 2x2 Grid of Items */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    {block.items.slice(0, 4).map((item, idx) => (
                      <Link 
                        key={idx} 
                        href={item.link}
                        className="flex flex-col items-center group/item"
                      >
                         {/* Item Image Container */}
                         <div className="w-full aspect-square rounded-lg bg-slate-50 dark:bg-slate-800 relative mb-2 overflow-hidden border border-slate-100 dark:border-slate-800">
                             <Image 
                               src={item.img}
                               alt={item.name}
                               fill
                               className="object-cover transition-transform duration-500 group-hover/item:scale-110"
                               sizes="(max-width: 640px) 140px, 160px"
                             />
                             <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/5 transition-colors"></div>
                         </div>
                         {/* Item Text */}
                         <span className="text-xs sm:text-[13px] text-center font-medium text-slate-600 dark:text-slate-400 group-hover/item:text-primary-600 transition-colors line-clamp-1 px-1">
                           {item.name}
                         </span>
                      </Link>
                    ))}
                  </div>

                  {/* Footer / See More */}
                  <Link 
                    href={block.seeMoreLink} 
                    className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    See More <ChevronRight className="w-4 h-4 ml-0.5" />
                  </Link>
               </div>
             ))}
           </div>

           {/* Desktop Only: Right Arrow Hint */}
           <div 
             onClick={() => scroll('right')}
             className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-md"
           >
               <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
           </div>

        </div>

      </div>
    </section>
  );
}

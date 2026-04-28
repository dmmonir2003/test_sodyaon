"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star } from 'lucide-react';
import { useColors } from '@/hooks/useColors';

export type ComboItem = {
  id: number;
  name: string;
  img: string;
  price: string;
  oldPrice?: string;
};

interface ComboOffersRowProps {
  title: string;
  items: ComboItem[];
}

export default function ComboOffersRow({ title, items }: ComboOffersRowProps) {
  const colors = useColors();

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary-600 font-bold tracking-widest uppercase text-xs sm:text-sm">
              <Star className="w-4 h-4 fill-primary-600" />
              <span>Special Collection</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
          </div>
          
          <Link 
            href="/bundles" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 font-bold transition-colors text-sm sm:text-base border-b-2 border-transparent hover:border-primary-600 pb-1"
          >
            সবগুলো দেখুন
            <ShoppingBag className="w-4 h-4" />
          </Link>
        </div>

        {/* Combos Row */}
        <div className="flex pt-5 overflow-x-auto hide-scrollbar gap-6 sm:gap-8 pb-4 sm:mx-0 sm:px-0 snap-x">
          {items.map((item) => (
            <Link 
              key={item.id} 
              href={`/shop/products/${item.id}`}
              className="flex flex-col items-center min-w-[140px] sm:min-w-[180px] md:min-w-[200px] snap-start group"
            >
              {/* Circular Avatar Container */}
              <div className="relative mb-4">
                {/* Decorative Rotating Ring */}
                <div className="absolute -inset-2 border-2 border-dashed border-primary-200 dark:border-primary-900/30 rounded-full group-hover:rotate-180 transition-transform duration-[2000ms] ease-linear"></div>
                
                {/* Main Image Circle */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                   <Image 
                     src={item.img}
                     alt={item.name}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-110"
                     sizes="(max-width: 640px) 120px, 160px"
                   />
                   
                   {/* Overlay on Hover */}
                   <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white text-primary-600 p-2 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300">
                        <ShoppingBag className="w-5 h-5 sm:w-6 h-6" />
                      </div>
                   </div>
                </div>

                {/* Floating Badge (e.g. Save %) */}
                {item.oldPrice && (
                   <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] sm:text-xs font-black px-2 py-1 rounded-full shadow-lg z-10 animate-bounce">
                     COMBO
                   </div>
                )}
              </div>
              
              {/* Info */}
              <div className="text-center space-y-1">
                <h4 className="font-bold text-sm sm:text-base md:text-lg text-slate-800 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1">
                  {item.name}
                </h4>
                <div className="flex flex-col items-center">
                   <span className="text-primary-600 font-extrabold text-base sm:text-lg">
                     {item.price}
                   </span>
                   {item.oldPrice && (
                     <span className="text-slate-400 dark:text-slate-500 text-xs line-through">
                       {item.oldPrice}
                     </span>
                   )}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

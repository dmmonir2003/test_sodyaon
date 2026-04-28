"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ShoppingCart, Plus } from 'lucide-react';
import { useColors } from '@/hooks/useColors';

export type CompactProduct = {
  id: number;
  name: string;
  price: string;
  img: string;
};

export type ListColumnInfo = {
  title: string;
  items: CompactProduct[];
};

export default function MultiListSection({ columns }: { columns: ListColumnInfo[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const colors = useColors();

  // A helper component to render the list of items consistently
  const RenderListColumn = ({ col }: { col: ListColumnInfo }) => (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
      
      {/* Column Title */}
      <h3 className="hidden md:flex text-xl font-bold font-heading text-slate-800 dark:text-white mb-5 pb-3 border-b border-slate-100 dark:border-slate-800 items-center gap-2">
         <span className="w-1.5 h-6 bg-primary-600 rounded-full inline-block"></span>
         {col.title}
      </h3>

      {/* Items List - Scrollable vertically */}
      <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto hide-scrollbar sm:pr-2">
        {col.items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-3 group relative p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            {/* Link wrapper for the product info */}
            <Link 
              href={`/shop/products/${item.id}`}
              className="flex items-center gap-3 flex-grow min-w-0"
            >
              {/* Item Thumbnail */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex-shrink-0 relative overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 transition-transform group-hover:scale-[1.05] flex items-center justify-center">
                 {item.img.startsWith('bg-') ? (
                    <div className={`w-full h-full ${item.img} flex items-center justify-center`}>
                      <Package className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                    </div>
                 ) : (
                    <Image 
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                 )}
                 <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              {/* Item Details */}
              <div className="flex flex-col flex-grow py-1 min-w-0">
                <h4 className="font-semibold text-[13px] sm:text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight mb-1">
                  {item.name}
                </h4>
                <span className="font-bold text-primary-600 text-sm sm:text-base">{item.price}</span>
              </div>
            </Link>

            {/* Direct Add to Cart Button */}
            <button 
              className="flex-shrink-0 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-2 group/btn"
              title="কার্টে যোগ করুন"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">কার্টে যোগ করুন</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-8 md:py-12 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MOBILE VIEW: Tab System */}
        <div className="block md:hidden">
           {/* Tabs Header */}
           <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 dark:border-slate-700 mb-4 snap-x">
             {columns.map((col, idx) => (
               <button
                 key={idx}
                 onClick={() => setActiveTab(idx)}
                 className={`whitespace-nowrap px-4 py-3 text-sm font-semibold snap-start transition-colors border-b-2 ${
                   activeTab === idx 
                     ? 'border-primary-600 text-primary-600 dark:text-primary-400' 
                     : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                 }`}
               >
                 {col.title}
               </button>
             ))}
           </div>
           
           {/* Active Tab Content */}
           <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
             <RenderListColumn col={columns[activeTab]} />
           </div>
        </div>

        {/* DESKTOP VIEW: Grid System */}
        <div className="hidden  md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {columns.map((col, idx) => (
            <RenderListColumn key={idx} col={col} />
          ))}
        </div>

      </div>
    </section>
  );
}

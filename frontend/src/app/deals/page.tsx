"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Clock, Zap } from "lucide-react";
import { useGetSpecialOffersQuery } from "@/store/admin/adminContentApi";

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 15 });

  // Faux countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            hours = Math.max(0, hours - 1);
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic Query from optimized backend MongoDB Deals API!
  const { data: dealsData, isLoading } = useGetSpecialOffersQuery({ limit: 40 });
  const dbDeals = dealsData?.data || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
      {/* Hero / Countdown UI */}
      <div className="bg-secondary-600 dark:bg-secondary-900 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500 dark:bg-secondary-800 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 text-secondary-900 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" /> Live Now
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-4 tracking-tight">FLASH DEALS</h1>
            <p className="text-secondary-100 text-lg max-w-xl">Hurry! These massive discounts vanish when the timer hits zero or stock runs out.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-secondary-100 text-sm font-bold uppercase tracking-wider mb-2">Sale Ends In</span>
            <div className="flex items-center gap-3">
              <TimeBox value={timeLeft.hours} label="Hours" />
              <span className="text-2xl font-bold text-secondary-300">:</span>
              <TimeBox value={timeLeft.minutes} label="Mins" />
              <span className="text-2xl font-bold text-secondary-300">:</span>
              <TimeBox value={timeLeft.seconds} label="Secs" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Deals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-3xl h-96 border border-slate-100 dark:border-slate-700"></div>
            ))}
          </div>
        ) : dbDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dbDeals.map((prod: any, i: number) => {
              const oldPrice = prod.originalPrice || prod.price;
              const newPrice = prod.price;
              return (
                <div key={i} className="relative group">
                  {prod.discount > 0 && (
                    <div className="absolute top-4 left-4 z-20 bg-red-500 text-white font-black px-3 py-1 rounded-full shadow-lg transform -rotate-3 text-xs uppercase tracking-wider">
                      SAVE {prod.discount}%
                    </div>
                  )}
                  <ProductCard 
                    id={prod.id || prod._id}
                    name={prod.nameEn || prod.name} 
                    price={`৳${newPrice}`} 
                    img={prod.image || "bg-indigo-100"} 
                    link={`/shop/products/${prod.slug || prod.id || prod._id}`}
                  />
                  {oldPrice > newPrice && (
                    <div className="absolute bottom-5 left-4 z-10">
                      <span className="text-slate-400 dark:text-slate-500 line-through text-xs font-bold mr-2 ml-16 sm:ml-20">৳{oldPrice}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl">
            <p className="text-slate-400 font-medium">কোনো ডিসকাউন্ট অফার পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-lg mb-2">
        <span className="text-3xl font-black text-secondary-600 dark:text-secondary-400 font-mono">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-secondary-200 font-bold uppercase">{label}</span>
    </div>
  );
}

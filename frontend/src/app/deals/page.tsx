"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Clock, Zap } from "lucide-react";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DealCard name="Magna-Tiles 100-Piece" oldPrice="$119.99" newPrice="$89.99" img="bg-indigo-100" />
          <DealCard name="Dinosaur STEM Kit" oldPrice="$34.99" newPrice="$19.99" img="bg-emerald-100" />
          <DealCard name="Interactive Learning Globe" oldPrice="$59.99" newPrice="$39.99" img="bg-blue-100" />
          <DealCard name="Wooden Train Set" oldPrice="$89.99" newPrice="$49.99" img="bg-red-100" />
          
          <DealCard name="Magic Chemistry Lab" oldPrice="$29.99" newPrice="$14.99" img="bg-purple-100" />
          <DealCard name="RC Stunt Car 360" oldPrice="$24.99" newPrice="$12.50" img="bg-orange-100" />
          <DealCard name="Musical Floor Piano" oldPrice="$45.00" newPrice="$22.50" img="bg-yellow-100" />
          <DealCard name="Giant Teddy Bear" oldPrice="$39.99" newPrice="$25.00" img="bg-pink-100" />
        </div>
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

function DealCard({ name, oldPrice, newPrice, img }: { name: string; oldPrice: string; newPrice: string; img: string }) {
  // Extract numeric values to calculate percentage
  const oldNum = parseFloat(oldPrice.replace('$', ''));
  const newNum = parseFloat(newPrice.replace('$', ''));
  const discount = Math.round(((oldNum - newNum) / oldNum) * 100);

  return (
    <div className="relative group">
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-20 bg-secondary-500 text-white font-black px-3 py-1 rounded-full shadow-lg transform -rotate-3 text-sm">
        SAVE {discount}%
      </div>
      <ProductCard name={name} price={newPrice} img={img} />
      
      {/* Cross-out Price Overlay */}
      <div className="absolute bottom-5 left-4 z-10">
        <span className="text-slate-400 dark:text-slate-500 line-through text-sm font-bold mr-2 ml-16 sm:ml-20">{oldPrice}</span>
      </div>
    </div>
  );
}

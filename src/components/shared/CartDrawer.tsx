"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setCartOpen, removeItem, updateQuantity } from "@/store/user/cart/cartSlice";

// Mock products for "You May Also Like"
const RELATED_PRODUCTS = [
  {
    id: 101,
    name: "অ্যাশওয়াগন্ধা পাউডার ১০০গ্রাম (ইউএসডিএ অর্গানিক)",
    price: 600,
    originalPrice: 800,
    img: "bg-amber-100", // Fallback color block
  },
  {
    id: 102,
    name: "লিচু ফুলের মধু ১ কেজি",
    price: 950,
    originalPrice: 1200,
    img: "bg-orange-100",
  },
  {
    id: 103,
    name: "সরিষার তেল ৫ লিটার",
    price: 1550,
    originalPrice: 1600,
    img: "bg-yellow-100",
  },
];

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 180;
      if (direction === 'left') {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };



  return (
    <div 
      className={`fixed inset-0 z-[200] flex justify-end transition-all duration-300 ${
        isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Drawer */}
      <div 
        className={`relative w-full max-w-md h-[100dvh] bg-white dark:bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-100 dark:border-slate-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h2 className="font-heading font-black text-lg text-slate-800 dark:text-white uppercase tracking-wider">
            SHOPPING CART
          </h2>
          <button
            onClick={() => dispatch(setCartOpen(false))}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <span className="text-sm font-medium">Close</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto w-full">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-500">
              <span className="text-4xl mb-4">🛒</span>
              <p className="font-medium text-lg">আপনার কার্ট খালি!</p>
              <button 
                onClick={() => dispatch(setCartOpen(false))}
                className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-xl font-bold"
              >
                কেনাকাটা চালিয়ে যান
              </button>
            </div>
          ) : (
            <div className="p-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm relative pr-10 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                  
                  {/* Remove Button (Positioned at top right like in mockup) */}
                  <button 
                    onClick={() => dispatch(removeItem(item.id))}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className={`w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-700 shrink-0 border border-slate-200 dark:border-slate-600 flex items-center justify-center overflow-hidden`}>
                    {/* Simulated image if item.img is a class vs actual URL */}
                    {item.img && item.img.startsWith('bg-') ? (
                       <div className={`w-full h-full ${item.img}`} />
                    ) : (
                       <span className="text-2xl">📦</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col flex-1 justify-between py-0.5">
                    <h3 className="font-bold text-[15px] sm:text-base text-slate-800 dark:text-white leading-tight pr-2 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-end justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                              } else {
                                dispatch(removeItem(item.id));
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-800 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Price Calculation (Quantity x Price) */}
                      <div className="text-right">
                         <span className="text-slate-400 text-xs mr-2">
                           × ৳{item.price.toLocaleString()}
                         </span>
                         <span className="font-bold text-[15px] text-slate-900 dark:text-white block mt-0.5">
                           = ৳{(item.price * item.quantity).toLocaleString()}
                         </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area with Related Products & Checkout */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex flex-col">
          
          {/* You May Also Like Slider */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
               <h3 className="font-bold text-lg text-slate-800 dark:text-white">You May Also Like</h3>
               <div className="flex gap-2">
                 <button 
                  onClick={() => scrollSlider('left')}
                  className="w-7 h-7 rounded-full bg-primary-600/20 text-primary-700 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                 >
                   <ChevronLeft className="w-4 h-4" />
                 </button>
                 <button 
                  onClick={() => scrollSlider('right')}
                  className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors shadow-sm"
                 >
                   <ChevronRight className="w-4 h-4" />
                 </button>
               </div>
            </div>

            {/* Horizontal Slider Area */}
            <div 
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {RELATED_PRODUCTS.map((prod) => (
                <div key={prod.id} className="snap-start shrink-0 w-[240px] bg-white dark:bg-slate-800 rounded-[1.25rem] border border-slate-200 dark:border-slate-700 p-2 flex gap-3">
                   <div className={`w-[80px] h-[80px] rounded-xl ${prod.img} shrink-0 bg-slate-100 dark:bg-slate-700 flex items-center justify-center`}>
                      <span className="text-xl">🌿</span>
                   </div>
                   <div className="flex flex-col flex-1 justify-center py-1">
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white line-clamp-2 mb-1 pr-1 leading-tight">
                        {prod.name}
                      </h4>
                      <span className="text-slate-500 text-xs mb-1.5 strike-through">
                        ৳{prod.originalPrice}
                      </span>
                      <button className="flex items-center gap-1.5 bg-primary-600 text-white px-3 py-1.5 rounded-full w-max mt-auto hover:bg-primary-700 transition-colors shadow-sm active:scale-95">
                         <Plus className="w-3.5 h-3.5" />
                         <span className="text-[11px] font-bold">Add</span>
                      </button>
                   </div>
                </div>
              ))}
            </div>
            
             {/* Small style tag just to ensure hide-scrollbar works if global utility is missing */}
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          {/* Checkout Final Total & Button */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600 dark:text-slate-300 font-bold text-lg">Total:</span>
              <span className="font-black text-2xl text-slate-900 dark:text-white">
                ৳{totalAmount.toLocaleString()}
              </span>
            </div>
            
            <Link
              href="/checkout"
              onClick={() => dispatch(setCartOpen(false))}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-xl shadow-lg hover:shadow-xl transition-all block text-center uppercase tracking-wider text-sm sm:text-base active:scale-[0.98]"
            >
              Checkout
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

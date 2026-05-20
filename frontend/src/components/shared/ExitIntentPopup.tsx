"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Gift } from "lucide-react";

export default function ExitIntentPopup() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Hide popup completely on Admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    // Only trigger once per session
    if (hasTriggered) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves out of the top of the viewport
      if (e.clientY <= 0) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasTriggered]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image/Hero Section side */}
        <div className="md:w-1/2 bg-primary-500 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden hidden md:flex">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <Gift className="w-24 h-24 text-white drop-shadow-xl mb-4 relative z-10 animate-bounce" />
          <h2 className="text-3xl font-bold font-heading text-white relative z-10">Wait, don't go!</h2>
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 p-8 md:py-12 flex flex-col justify-center">
          <div className="md:hidden flex justify-center mb-4 text-primary-500">
            <Gift className="w-16 h-16 animate-bounce" />
          </div>
          <h2 className="md:hidden text-2xl font-bold font-heading text-slate-900 dark:text-white text-center mb-2">Wait, don't go!</h2>
          
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 text-center md:text-left">Take <span className="text-accent-500 text-2xl font-black">15% OFF</span> your order!</h3>
          <p className="text-slate-500 text-sm mb-6 text-center md:text-left">Use this exclusive code at checkout. Valid for today only.</p>
          
          <div className="border-2 border-dashed border-primary-300 bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl text-center mb-6 relative group cursor-pointer hover:border-primary-500 transition-colors">
            <span className="font-mono text-2xl font-bold text-primary-600 dark:text-primary-400 tracking-wider">FUNPLAY15</span>
            <div className="absolute inset-0 bg-primary-600 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white font-bold">Copy to Clipboard</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 dark:shadow-none mb-3"
          >
            Claim Discount & Shop
          </button>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-center"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
}

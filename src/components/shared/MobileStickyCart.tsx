"use client";

import { ShoppingCart, Banknote, RotateCcw, CloudDownload } from "lucide-react";
import React from "react";

export interface MobileStickyCartProps {
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  
  /** 
   * Whether to switch from fixed position to absolute position
   * (used for pinning above the footer)
   */
  isAbsoluteMode?: boolean;

  /** 
   * Whether to show the default trust badges (e.g. Cash on Delivery)
   * This can be controlled from backend product data.
   */
  showTrustBadges?: boolean;
  
  /** 
   * Whether this product has an alternative version (e.g., eBook, PDF, lightweight version) 
   */
  hasAlternative?: boolean;
  alternativeImage?: string;
  alternativeTitle?: string;
  alternativePrice?: string | number;
  alternativeButtonText?: string;
  onAlternativeClick?: () => void;
}

export default function MobileStickyCart({
  onAddToCart,
  onBuyNow,
  isAbsoluteMode = false,
  showTrustBadges = true,
  hasAlternative = false,
  alternativeImage,
  alternativeTitle = "eBook Version Available",
  alternativePrice = "180",
  alternativeButtonText = "Buy to Read",
  onAlternativeClick,
}: MobileStickyCartProps) {
  return (
    <div className={`lg:hidden left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] w-full pb-safe ${isAbsoluteMode ? 'absolute bottom-0' : 'fixed bottom-0'}`}>
      
      {/* Conditionally show alternative version banner (e.g., eBook) */}
      {hasAlternative && (
        <div className="px-3 pt-3">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative rounded shadow-sm overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                {alternativeImage ? (
                  <img src={alternativeImage} alt={alternativeTitle} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">IMAGE</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200">{alternativeTitle}</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-white mt-0.5">TK. {alternativePrice}</span>
              </div>
            </div>
            <button 
              onClick={onAlternativeClick}
              className="px-3 py-1.5 border border-primary-500 text-primary-600 dark:text-primary-400 text-xs font-bold rounded flex items-center gap-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors shrink-0"
            >
              <CloudDownload className="w-3.5 h-3.5" strokeWidth={2.5}/>
              {alternativeButtonText}
            </button>
          </div>
        </div>
      )}

      {/* Conditionally show standard trust badges ONLY if no alternative is showing, or based on backend prop */}
      {!hasAlternative && showTrustBadges && (
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2.5 w-[48%]">
            <Banknote className="w-5 h-5 text-slate-700 dark:text-slate-300 shrink-0" strokeWidth={1.5} />
            <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight">
              পণ্য হাতে পেয়ে মূল্য<br/>পরিশোধের সুযোগ
            </span>
          </div>
          <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2.5 w-[48%] pl-2">
            <RotateCcw className="w-5 h-5 text-slate-700 dark:text-slate-300 shrink-0" strokeWidth={1.5} />
            <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight">
              ৭ দিনের মধ্যে<br/>পরিবর্তনের সুযোগ
            </span>
          </div>
        </div>
      )}

      {/* Primary Action Buttons */}
      <div className={`px-3 pb-3 ${(!hasAlternative && showTrustBadges) ? 'pt-1' : 'pt-3'} flex gap-3`}>
        <button 
          onClick={onAddToCart}
          className="flex-1 py-3 bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-400 font-bold text-[15px] sm:text-base rounded-xl transition-colors flex items-center justify-center gap-2 border border-primary-200 dark:border-slate-700 hover:bg-primary-100 dark:hover:bg-slate-700"
        >
          <ShoppingCart className="w-[18px] h-[18px] sm:w-5 sm:h-5 shrink-0" />
          কার্টে যোগ করুন
        </button>
        <button 
          onClick={onBuyNow}
          className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-bold text-[15px] sm:text-base rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          অর্ডার করুন
        </button>
      </div>
    </div>
  );
}

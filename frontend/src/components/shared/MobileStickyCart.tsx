"use client";

import { ShoppingCart, Banknote, RotateCcw, CloudDownload, Phone, Zap } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa'; // Assuming we can use react-icons, if not we'll use a lucide icon
import React from "react";
import Link from "next/link";
import Image from "next/image";

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

  /** 
   * Admin dynamic settings to show/hide quick order buttons
   */
  showWhatsapp?: boolean;
  whatsappNumber?: string;
  showCall?: boolean;
  phoneNumber?: string;
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
  showWhatsapp = false,
  whatsappNumber = "+8801900000000",
  showCall = false,
  phoneNumber = "+8801900000000",
}: MobileStickyCartProps) {

  const handleWhatsapp = () => {
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  const handleCall = () => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
    }
  };

  return (
    <div className={`lg:hidden left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] w-full pb-safe ${isAbsoluteMode ? 'absolute bottom-0' : 'fixed bottom-0'}`}>
      
      {/* Conditionally show alternative version banner (e.g., eBook) */}
      {hasAlternative && (
        <div className="px-3 pt-3">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative rounded shadow-sm overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                {alternativeImage ? (
                  <Image src={alternativeImage} alt={alternativeTitle || "Product"} fill sizes="40px" className="object-cover" />
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
      <div className={`px-3 pb-3 ${(!hasAlternative && showTrustBadges) ? 'pt-1' : 'pt-3'} flex flex-col gap-2.5`}>
        
        {/* Row 1: Add to Cart and Buy Now */}
        <div className="flex gap-2.5">
          <button 
            onClick={onAddToCart}
            className="flex-1 py-2.5 sm:py-3 bg-[#f39422] hover:bg-[#e67e22] text-white font-bold text-[13px] sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-[18px] h-[18px] shrink-0" />
            <span className="uppercase tracking-wide">ADD TO CART</span>
          </button>
          <Link 
            href="/checkout"
            className="flex-1 py-2.5 sm:py-3 bg-[#0a1b24] hover:bg-[#061118] text-white font-bold text-[13px] sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="w-[18px] h-[18px] shrink-0" />
            <span className="uppercase tracking-wide">BUY NOW</span>
          </Link>
        </div>

        {/* Row 2: WhatsApp and Call For Order (Conditionally Rendered based on props) */}
        {(showWhatsapp || showCall) && (
           <div className="flex gap-2.5">
            {showWhatsapp && (
              <button 
                onClick={handleWhatsapp}
                className="flex-1 py-2.5 sm:py-3 bg-[#24b05a] hover:bg-[#1f964c] text-white font-bold text-[13px] sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5 shrink-0" />
                <span className="tracking-wide">Order On WhatsApp</span>
              </button>
            )}
            {showCall && (
              <button 
                onClick={handleCall}
                className="flex-1 py-2.5 sm:py-3 bg-[#2b4491] hover:bg-[#203679] text-white font-bold text-[13px] sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="tracking-wide">Call For Order</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


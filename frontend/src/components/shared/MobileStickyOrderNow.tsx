"use client";

import React from "react";
import { ArrowRight, ShoppingBag, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export interface MobileStickyOrderNowProps {
  buttonText?: string;
  onClick?: () => void;
  showWhatsapp?: boolean;
  whatsappNumber?: string;
  showCall?: boolean;
  phoneNumber?: string;
}

export default function MobileStickyOrderNow({
  buttonText = "এখনই অর্ডার করুন",
  onClick,
  showWhatsapp = true,
  whatsappNumber = "+8801700000000",
  showCall = true,
  phoneNumber = "+8801700000000",
}: MobileStickyOrderNowProps) {
  
  const handleWhatsapp = () => {
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`, "_blank");
    }
  };

  const handleCall = () => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] w-full pb-safe p-3">
      <div className="flex flex-col gap-2">
        {/* Main Order Now Button */}
        <Link
          href="/checkout"
          className="w-full py-4 bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-black text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
        >
          <ShoppingBag className="w-5 h-5" />
          {buttonText}
          <ArrowRight className="w-5 h-5 ml-1" />
        </Link>

        {/* Quick Contact Buttons Row */}
        {(showWhatsapp || showCall) && (
          <div className="flex gap-2">
            {showWhatsapp && (
              <button
                onClick={handleWhatsapp}
                className="flex-1 py-2.5 bg-[#24b05a] hover:bg-[#1f964c] text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            )}
            {showCall && (
              <button
                onClick={handleCall}
                className="flex-1 py-2.5 bg-[#2b4491] hover:bg-[#203679] text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useColors } from "@/hooks/useColors";
import { useAppDispatch } from "@/store/hooks";
import { addItem, setCartOpen } from "@/store/user/cart/cartSlice";

export interface QuickDealProductProps {
  id: number;
  name: string;
  brand: string;
  oldPrice: string;
  currentPrice: string;
  discountBadge: string;
  img: string;
  soldCount?: string;
  stockCount?: number;
  totalStock?: number;
}

/** Parse a price string like "৳2,600" into a number */
function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^\d.]/g, '');
  return parseFloat(cleaned) || 0;
}

export default function QuickDealCard({
  id,
  name,
  brand,
  oldPrice,
  currentPrice,
  discountBadge,
  img,
  soldCount,
  stockCount,
  totalStock = 100,
}: QuickDealProductProps) {
  const colors = useColors();
  const dispatch = useAppDispatch();

  const progress = stockCount 
    ? (stockCount / totalStock) * 100 
    : (parseInt(soldCount || "0") / totalStock) * 100;

  const handleAddToCart = () => {
    dispatch(addItem({
      id: id.toString(),
      name,
      price: parsePrice(currentPrice),
      quantity: 1,
      image: img,
    }));
    dispatch(setCartOpen(true));
  };

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group h-full border border-slate-100 dark:border-slate-800 relative w-full">
      
      {/* Top Section: Forced Aspect Ratio Container */}
      <div className="relative aspect-square w-full bg-white dark:bg-slate-900">
        {/* Sawtooth Discount Badge */}
        <div className="absolute top-2.5 left-2.5 z-40 w-11 h-11 flex items-center justify-center filter drop-shadow-md">
           <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-red-600">
             <path d="M50 0 L58 13 L73 10 L75 25 L90 27 L85 42 L100 50 L85 58 L90 73 L75 75 L73 90 L58 87 L50 100 L42 87 L27 90 L25 75 L10 73 L15 58 L0 50 L15 42 L10 27 L25 25 L27 10 L42 13 Z" />
           </svg>
           <div className="relative z-10 flex flex-col items-center justify-center text-white font-black leading-none">
             <span className="text-[12px]">{discountBadge.split('%')[0]}%</span>
             <span className="text-[8px] uppercase mt-0.5">OFF</span>
           </div>
        </div>

        {/* Product Image: Fixed size, identical for all cards */}
        <Link href={`/shop/products/${id}`} className="block w-full h-full relative">
          <Image
            src={img}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 300px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={id === 601 || id === 602}
          />
        </Link>

        {/* Desktop Add to Cart Overlay */}
        <div className="hidden md:flex absolute inset-0 bg-white/40 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center z-30 px-6">
           <button 
             onClick={handleAddToCart}
             className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded shadow-lg transition-all duration-300 transform scale-90 group-hover:scale-100 active:scale-95"
           >
             Add to Cart
           </button>
        </div>
      </div>

      {/* Product Content: Fixed Spacing for Alignment */}
      <div className="flex flex-col p-2 sm:p-4 pt-1 h-full flex-grow">
        
        {/* Title: Minimum height to align brands */}
        <h3 className="text-[13px] font-medium text-slate-500 dark:text-slate-400 line-clamp-2 mb-1 min-h-[38px]">
          <Link href={`/shop/products/${id}`}>{name}</Link>
        </h3>
        
        {/* Brand: Single line consistent height */}
        <p className="text-[12px] text-slate-400 dark:text-slate-500 mb-2 truncate h-[16px]">{brand}</p>
        
        {/* Pricing: Standardized margin */}
        <div className="flex items-center gap-1.5 mb-4 h-[20px]">
          <span className="text-[12px] text-slate-300 line-through">
            ৳{oldPrice.replace(/[৳,]/g, '')}
          </span>
          <span className="text-[15px] font-bold text-slate-400 dark:text-slate-300">
            ৳{currentPrice.replace(/[৳,]/g, '')}
          </span>
          <span className="text-[12px] text-red-400 font-medium">
            {discountBadge}
          </span>
        </div>

        {/* Dynamic Footer Area: Occupies persistent space */}
        <div className="mt-auto relative h-[36px] md:h-[44px]">
           
           {/* Default State: Progress Bar */}
           <div className="transition-opacity duration-300 md:group-hover:opacity-0 flex flex-col justify-center h-full">
              <div className="w-full h-1 md:h-1.5 bg-accent-200/50 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                <div 
                  className="h-full bg-accent-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                  style={{ width: `${Math.max(15, progress)}%` }}
                />
              </div>
              <div className="flex justify-center">
                 <span className="text-[9px] md:text-[10px] text-slate-400 font-medium truncate">
                   {stockCount !== undefined ? `${stockCount} In Stock` : `${soldCount} Sold`}
                 </span>
              </div>
           </div>

           {/* Hover State: View Details Link - DESKTOP ONLY */}
           <div className="hidden md:flex absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 items-center justify-center -mx-5 -mb-5 bg-primary-600 hover:bg-primary-700 pointer-events-none group-hover:pointer-events-auto cursor-pointer">
              <Link 
                href={`/shop/products/${id}`}
                className="text-[14px] font-bold tracking-tight w-full h-full flex items-center justify-center text-white"
              >
                View Details
              </Link>
           </div>
        </div>

        {/* Mobile ONLY Persistent Action */}
        <button 
          onClick={handleAddToCart}
          className="md:hidden w-full mt-2 bg-primary-600 text-white font-semibold py-1.5 rounded text-[10px] shadow-sm active:scale-95 transition-transform"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

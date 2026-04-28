import Link from "next/link";
import Image from "next/image";
import { Star, Package } from "lucide-react";

export type HomeProductCardProps = {
  id: number;
  name: string;
  brand: string;
  oldPrice?: string;
  currentPrice: string;
  discountBadge?: string;
  badgeColor?: "yellow" | "red";
  img: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
};

export default function HomeProductCard({
  id,
  name,
  brand,
  oldPrice,
  currentPrice,
  discountBadge,
  badgeColor = "yellow",
  img,
  rating,
  reviewCount,
  inStock,
}: HomeProductCardProps) {
  
  // Choose badge background based on color choice from Rokomari image (yellow or red starburst)
  const badgeBg = badgeColor === "red" ? "bg-red-600 text-white" : "bg-amber-400 text-slate-900";

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-transparent shadow-sm hover:shadow-xl hover:border-slate-100 dark:hover:border-slate-700 transition-all duration-300 relative group overflow-hidden">
      
      {/* Discount Badge - Top Left with Starburst shape mimic */}
      {discountBadge && (
        <div className={`absolute top-2 left-2 z-10 w-12 h-12 flex flex-col items-center justify-center rounded-full ${badgeBg} font-black text-xs leading-none shadow-md transform -rotate-12`}>
          <span>{discountBadge.split(' ')[0]}</span>
          <span className="text-[10px] uppercase font-bold">{discountBadge.split(' ')[1] || 'OFF'}</span>
        </div>
      )}

      {/* Product Image Wrapper */}
      <Link href={`/shop/products/${id}`} className="relative block aspect-square w-full sm:h-48 flex-shrink-0 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50">
        {!img.startsWith('bg-') ? (
          <Image 
            src={img}
            alt={name}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 200px, 250px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-300 dark:text-slate-600">
            <Package className="w-12 h-12" />
          </div>
        )}
      </Link>

      {/* Product Details - Centered as per Rokomari design */}
      <div className="flex flex-col flex-grow items-center text-center p-3 sm:p-4 pt-1">
        
        {/* Title */}
        <h4 className="font-medium text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-snug line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
          <Link href={`/shop/products/${id}`}>{name}</Link>
        </h4>

        {/* Brand Name */}
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
          {brand}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-orange-400 text-orange-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'}`} 
            />
          ))}
          <span className="text-xs text-slate-500 ml-1">({reviewCount})</span>
        </div>

        {/* Stock Status */}
        <div className={`text-[11px] sm:text-xs font-medium mb-2 ${inStock ? 'text-green-500' : 'text-red-500'}`}>
          {inStock ? "Product In Stock" : "Out of Stock"}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 mt-auto">
          {oldPrice && (
            <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
              {oldPrice}
            </span>
          )}
          <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {currentPrice}
          </span>
        </div>

        {/* Desktop Contextual / Mobile Persistent Action Button */}
        <div className="w-full mt-auto">
          <button className="w-full py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-primary-600 border border-primary-600 rounded bg-white dark:bg-transparent hover:bg-primary-600 hover:text-white transition-colors">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

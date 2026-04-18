import { Star, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductCard({
  name,
  price,
  img,
  link,
}: {
  name: string;
  price: string | number;
  img: string;
  link?: string;
}) {
  let finalLink = link;
  if (!finalLink || finalLink === "/shop/products/1") {
    const defaultId = 101 + (name.length % 12);
    finalLink = `/shop/products/${defaultId}`;
  } else if (finalLink.startsWith("/shop/products/")) {
    const idMatch = finalLink.match(/\/shop\/products\/(\d+)$/);
    if (idMatch) {
      const parsedId = parseInt(idMatch[1]);
      if (parsedId < 100) {
        finalLink = `/shop/products/${101 + (parsedId % 12)}`;
      }
    }
  }

  // Fallback if finalLink is undefined for some reason, though it shouldn't be
  const resolvedLink = finalLink || "/shop/products/101";
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all group flex flex-col h-full overflow-hidden">
      {/* Product Image Container */}
      <Link
        href={resolvedLink}
        className={`w-full aspect-square sm:h-48 rounded-none sm:rounded-xl ${img} relative overflow-hidden flex items-center justify-center cursor-pointer flex-shrink-0`}
      >
        <Package className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400/50" />
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 sm:px-6 py-2 bg-white text-slate-900 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform text-xs sm:text-sm">
            কুইক ভিউ
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-3 sm:p-4">
        {/* Product Title */}
        <h4 className="font-bold text-slate-900 dark:text-white line-clamp-2 text-sm sm:text-base mb-2">
          <Link
            href={resolvedLink}
            className="hover:text-primary-600 transition-colors"
          >
            {name}
          </Link>
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-accent-400 text-accent-400" />
          ))}
          <span className="text-xs text-slate-500 ml-1">(१२४)</span>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-auto pt-3 sm:pt-4 border-t border-slate-50 dark:border-slate-700/50">
          <span className="font-bold text-lg sm:text-lg text-primary-600">{price}</span>
          <Link
            href={resolvedLink}
            className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
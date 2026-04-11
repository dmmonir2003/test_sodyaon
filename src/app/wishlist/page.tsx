import ProductCard from "@/components/shared/ProductCard";
import { Heart, User } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-black font-heading text-slate-900 dark:text-white">Your Wishlist</h1>
              <p className="text-slate-500 text-sm">3 items saved for later</p>
            </div>
          </div>
          
          <Link href="/profile" className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <User className="w-4 h-4" /> Go to Profile
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard name="Interactive Smart Robot" price="$89.99" img="bg-indigo-100" />
          <ProductCard name="Programmable Music Keyboard" price="$49.99" img="bg-purple-100" />
          <ProductCard name="Dinosaur Fossil Dig Kit" price="$24.99" img="bg-amber-100" />
          
          {/* Add more placeholder */}
          <Link href="/shop" className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 border-dashed hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group flex flex-col items-center justify-center text-center min-h-[300px]">
             <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-slate-400 group-hover:text-primary-500 group-hover:scale-110 transition-all">
                <Heart className="w-8 h-8" />
             </div>
             <h3 className="font-bold text-slate-900 dark:text-white mb-2">Find More Favorites</h3>
             <p className="text-sm text-slate-500 max-w-[200px]">Browse our catalog and tap the heart icon to save items here.</p>
          </Link>
        </div>

      </div>
    </div>
  );
}

'use client';
// Force rebuild - v0 cache clear

import FiltersSidebar from "@/components/shop/FiltersSidebar";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductCard from "@/components/shared/ProductCard";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MobileFilterDrawer from '@/components/shared/MobileFilterDrawer';
import MobileSortDrawer from '@/components/shared/MobileSortDrawer';
import { BABY_CARE_PRODUCTS } from "@/data/products";

export default function BabyCareProductsPage() {
  const category = {
    name: "শিশু যত্ন পণ্য",
    description: "শিশুর ত্বক এবং স্বাস্থ্যের যত্নের জন্য প্রাকৃতিক এবং নিরাপদ পণ্যের সম্পূর্ণ পরিসর।",
    theme: "bg-teal-500"
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
      {/* Category Header */}
      <div className={`${category.theme} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-white/70 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">হোম</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/shop" className="hover:text-white transition-colors">শপ</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium">{category.name}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-2">{category.name}</h1>
          <p className="text-white/80 max-w-2xl">{category.description}</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 flex-shrink-0">
            <FiltersSidebar />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-medium hidden md:block">১২টি পণ্য পাওয়া গেছে</span>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setFilterOpen(true)}
                  className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" /> ফিল্টার
                </button>
                <button
                  onClick={() => setSortOpen(true)}
                  className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  সর্ট
                </button>
                <div className="hidden md:block">
                  <SortDropdown />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {BABY_CARE_PRODUCTS.map((prod, i) => (
                <ProductCard 
                  key={i} 
                  name={prod.name} 
                  price={prod.price} 
                  img={prod.img}
                  link={`/shop/products/${i}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <MobileFilterDrawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <MobileSortDrawer isOpen={sortOpen} onClose={() => setSortOpen(false)} />
    </div>
  );
}


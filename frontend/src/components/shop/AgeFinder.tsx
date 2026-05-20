"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/shared/ProductCard";
import SortDropdown from "@/components/shop/SortDropdown";
import FiltersSidebar from "@/components/shop/FiltersSidebar";
import { PRODUCTS } from "@/data/database";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import MobileFilterDrawer from '@/components/shared/MobileFilterDrawer';
import MobileSortDrawer from '@/components/shared/MobileSortDrawer';

const AGES = [
  { id: "0-1", label: "Babies", range: "0-1 Years" },
  { id: "1-3", label: "Toddlers", range: "1-3 Years" },
  { id: "4-6", label: "Preschool", range: "4-6 Years" },
  { id: "7-9", label: "Grade School", range: "7-9 Years" },
  { id: "10-12", label: "Pre-Teens", range: "10-12 Years" },
  { id: "13+", label: "Teens", range: "13+ Years" },
];

export default function AgeFinder() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active range from URL, default to "1-3"
  const currentRangeId = searchParams.get("range");
  const activeAge = AGES.find((a) => a.id === currentRangeId) || AGES[0];

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const handleAgeChange = (id: string) => {
    router.push(`/shop/age?range=${encodeURIComponent(id)}`);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-primary-600 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-5xl font-bold font-heading mb-3 md:mb-4">
            Find The Perfect Toy By Age
          </h1>
          <p className="text-primary-100 text-sm md:text-base max-w-2xl mx-auto">
            Children&lsquo;s brains develop rapidly. Filtering toys by the
            precise age stage ensures max safety and fun. Select an age below to
            filter the catalog.
          </p>
        </div>
      </div>

      {/* Age Group Navigation Section */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 -mt-6 md:-mt-8 relative z-10 mb-8 md:mb-12">
        {/* Mobile View: Single Row Navigation */}
        <div className="md:hidden flex flex-row justify-between items-center gap-1">
          {AGES.map((age) => {
            const isActive = activeAge.id === age.id;
            return (
              <button
                key={age.id}
                onClick={() => handleAgeChange(age.id)}
                className={`transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
                  ${isActive 
                    ? "bg-gradient-to-br from-primary-500 to-primary-700 text-white scale-110 shadow-lg shadow-primary-500/50 border-white/20" 
                    : "bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-transparent hover:border-primary-300 dark:text-slate-200 text-slate-700 shadow-sm"}
                  w-[15%] aspect-square rounded-full border-2 md:w-auto md:h-auto md:aspect-auto md:p-6 md:rounded-2xl`}
              >
                <span className={`font-bold transition-all ${isActive ? "text-sm" : "text-xs"} md:text-2xl mb-0 md:mb-1 leading-none`}>
                  {age.id}
                </span>
                <span className={`hidden md:block text-xs font-medium uppercase tracking-wider ${isActive ? "text-primary-100" : "text-slate-500 dark:text-slate-400"}`}>
                  {age.label}
                </span>
                <span className={`md:hidden text-[6px] font-bold uppercase tracking-tighter ${isActive ? "text-primary-100" : "text-slate-400"}`}>
                  {age.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop View: Original Grid Layout */}
        <div className="hidden md:grid md:grid-cols-6 gap-4">
          {AGES.map((age) => {
            const isActive = activeAge.id === age.id;
            return (
              <button
                key={age.id}
                onClick={() => handleAgeChange(age.id)}
                className={`p-6 rounded-2xl shadow-sm border-2 transition-all flex flex-col items-center justify-center cursor-pointer
                  ${isActive ? "bg-primary-50 border-primary-500 text-primary-700 scale-105 shadow-md dark:bg-primary-900/30 dark:text-primary-400" : "bg-white dark:bg-slate-800 border-transparent hover:border-primary-300 dark:text-slate-200 text-slate-700"}`}
              >
                <span className="text-2xl font-bold mb-1">{age.id}</span>
                <span className="text-xs font-medium uppercase tracking-wider">
                  {age.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            Toys for {activeAge.range}
          </h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setFilterOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> ফিল্টার
            </button>
            <button
              onClick={() => setSortOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              সর্ট
            </button>
            <div className="hidden md:block">
              <SortDropdown />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 shrink-0">
            <FiltersSidebar />
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {PRODUCTS.filter((prod) => prod.ageRange === activeAge.id).map(
                (prod) => (
                  <ProductCard
                    key={prod.id}
                    name={prod.name}
                    price={prod.price}
                    img={prod.image}
                    link={`/shop/products/${prod.id}`}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      
      <MobileFilterDrawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <MobileSortDrawer isOpen={sortOpen} onClose={() => setSortOpen(false)} />
    </div>
  );
}

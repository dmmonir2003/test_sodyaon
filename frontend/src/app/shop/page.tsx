'use client';

import { useState, Suspense } from 'react';
import FiltersSidebar from "@/components/shop/FiltersSidebar";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductCard from "@/components/shared/ProductCard";

import { SlidersHorizontal, ChevronRight } from "lucide-react";
import Link from "next/link";
import MobileFilterDrawer from '@/components/shared/MobileFilterDrawer';
import MobileSortDrawer from '@/components/shared/MobileSortDrawer';
import { useGetAdminProductsQuery, useGetCategoriesQuery } from "@/store/admin/adminContentApi";
import { useSearchParams } from 'next/navigation';

function ShopPageContent() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const searchParams = useSearchParams();

  // Extract query filters
  const categoryId = searchParams.get('category') || '';
  const ageRange = searchParams.get('ageRange') || '';
  const search = searchParams.get('search') || '';

  // Fetch real products from the MongoDB backend with dynamic filters!
  const { data: prodData, isLoading } = useGetAdminProductsQuery({ 
    limit: 50,
    categoryId,
    ageRange,
    search
  });
  const dbProducts = prodData?.data || [];

  // Fetch categories from DB to get selected category name
  const { data: catData } = useGetCategoriesQuery({ tree: true });
  const categories = catData?.data || [];

  const findCategoryById = (cats: any[], id: string): any => {
    for (const cat of cats) {
      if (cat.id === id || cat._id === id) {
        return cat;
      }
      if (cat.children && cat.children.length > 0) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedCategoryObj = categoryId ? findCategoryById(categories, categoryId) : null;
  const pageTitle = selectedCategoryObj ? (selectedCategoryObj.nameBn || selectedCategoryObj.nameEn) : "সব খেলনা দেখুন";

  // Mapped live products or standard static fallbacks
  const displayProducts = dbProducts.length > 0
    ? dbProducts.map((p: any) => ({
        id: p.id || p._id,
        name: p.nameEn || p.name,
        price: `৳${p.price}`,
        img: p.image || "bg-indigo-100",
        link: `/shop/products/${p.slug || p.id || p._id}`
      }))
    : PRODUCTS.map((prod: any, i: number) => ({
        id: i + 101,
        name: prod.name,
        price: prod.price,
        img: prod.img,
        link: `/shop/products/${i}`
      }));

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600 transition-colors">হোম</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">{pageTitle}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white">{pageTitle}</h1>
              <p className="text-slate-500 mt-2">{displayProducts.length}টি পণ্যের তালিকা</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setFilterOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" /> ফিল্টার
              </button>
              <SortDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FiltersSidebar />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="w-full h-80 bg-white dark:bg-slate-800 rounded-2xl animate-pulse border border-slate-100 dark:border-slate-700/80 p-4 space-y-4">
                    <div className="w-full h-48 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    <div className="w-2/3 h-5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="w-1/3 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : displayProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {displayProducts.map((prod: any, i: number) => (
                  <ProductCard key={i} id={prod.id} name={prod.name} price={prod.price} img={prod.img} link={prod.link} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl">
                <p className="text-slate-400 font-medium">কোনো খেলনা পাওয়া যায়নি।</p>
              </div>
            )}

            {/* Pagination Controls */}
            {displayProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="inline-flex gap-2">
                  <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-not-allowed text-slate-400">
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-primary-600 text-white font-bold shadow-md">১</button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 font-medium transition-colors cursor-not-allowed text-slate-400">২</button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 font-medium transition-colors cursor-not-allowed text-slate-400">৩</button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-not-allowed text-slate-400">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawers */}
      <MobileFilterDrawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
      <MobileSortDrawer isOpen={sortOpen} onClose={() => setSortOpen(false)} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}

const PRODUCTS = [
  { name: "ম্যাগনা-টাইলস ১০০-পিস সেট", price: "৳११९९९", img: "bg-indigo-100" },
  { name: "উডেন অ্যাক্টিভিটি কিউব", price: "৳४৫০০", img: "bg-amber-100" },
  { name: "ডাইনোসর স্টেম বিল্ডিং কিট", price: "৳३४९९", img: "bg-emerald-100" },
  { name: "ইন্টারঅ্যাক্টিভ লার্নিং গ্লোব", price: "৳५९९९", img: "bg-blue-100" },
  { name: "স্পেস এক্সপ্লোরার ড্রোন", price: "৳७९९९", img: "bg-slate-200" },
  { name: "মিউজিক্যাল ম্যাট ফ্লোর পিয়ানো", price: "৳३৫০০", img: "bg-yellow-100" },
  { name: "জায়ান্ট টেডি বিয়ার হাগ", price: "৳३९९९", img: "bg-pink-100" },
  { name: "কিডস ডিজিটাল ক্যামেরা ১০৮০পি", price: "৳२९५০", img: "bg-cyan-100" },
  { name: "উডেন ট্রেন সেট (প্রিমিয়াম)", price: "৳८९९९", img: "bg-red-100" },
  { name: "ম্যাজিক কেমিস্ট্রি ল্যাব স্টার্টার", price: "৳१९९९", img: "bg-purple-100" },
  { name: "আরসি স্টান্ট কার ৩৬০", price: "৳२४९९", img: "bg-orange-100" },
  { name: "গ্লো-ইন-দ্য ডার্ক স্টার্স সিলিং", price: "৳१४९९", img: "bg-green-100" },
];
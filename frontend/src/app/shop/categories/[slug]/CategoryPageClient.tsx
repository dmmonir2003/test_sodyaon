"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Layers, Tag, ShoppingCart, Star, Sparkles } from "lucide-react";
import { useGetCategoryBySlugQuery, useGetAdminProductsQuery, useGetCategoriesQuery } from "@/store/admin/adminContentApi";
import ProductCard from "@/components/shared/ProductCard";

export default function CategoryPageClient({ slug }: { slug: string }) {
  const [activeSubcategory, setActiveSubcategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");

  // Fetch Category details by slug
  const { data: catResponse, isLoading: isCatLoading } = useGetCategoryBySlugQuery(slug);
  const { data: allCatsData } = useGetCategoriesQuery({ tree: true });

  // If direct lookup returns category
  const directCategory = catResponse?.data;

  // Fallback: search tree if not returned directly
  const findCategoryInTree = (cats: any[], targetSlug: string): any => {
    for (const c of cats) {
      if (c.slug?.toLowerCase() === targetSlug?.toLowerCase()) return c;
      if (c.children && c.children.length > 0) {
        const found = findCategoryInTree(c.children, targetSlug);
        if (found) return found;
      }
    }
    return null;
  };

  const category = directCategory || (allCatsData?.data ? findCategoryInTree(allCatsData.data, slug) : null);
  const subcategories = category?.children || [];

  // Fetch live products for this category & optional active subcategory
  const { data: prodResponse, isLoading: isProdsLoading } = useGetAdminProductsQuery({
    categoryId: slug,
    subcategoryId: activeSubcategory || undefined,
    limit: 50,
  });

  const products = prodResponse?.data || [];

  // Apply sorting
  const sortedProducts = [...products].sort((a: any, b: any) => {
    if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  const categoryTitle = category?.nameBn || category?.nameEn || slug.replace(/-/g, " ");
  const categoryEnglishTitle = category?.nameEn || "";
  const categoryDesc = category?.descriptionBn || category?.descriptionEn || "সদায়নের প্রিমিয়াম ও বাছাইকৃত সেরা কালেকশন।";
  const isImageIcon = category?.icon && (category.icon.startsWith("http") || category.icon.startsWith("/") || category.icon.startsWith("data:"));

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-indigo-900 text-white py-10 sm:py-14 shadow-md relative overflow-hidden">
        {/* Ambient Decorative Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-xs text-primary-200/80 mb-4 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">হোম</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 opacity-60" />
            <Link href="/shop" className="hover:text-white transition-colors">শপ</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 opacity-60" />
            <span className="text-white font-bold font-bengali">{categoryTitle}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Category Icon */}
              {isImageIcon ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <img src={category.icon} alt={categoryTitle} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-primary-200" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-4xl font-black font-bengali tracking-tight text-white">
                    {categoryTitle}
                  </h1>
                  {categoryEnglishTitle && (
                    <span className="text-sm font-medium text-primary-200/80 bg-white/10 px-3 py-0.5 rounded-full backdrop-blur-sm">
                      {categoryEnglishTitle}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-primary-100/90 max-w-2xl mt-2 font-bengali leading-relaxed">
                  {categoryDesc}
                </p>
              </div>
            </div>

            {/* Total Results Counter */}
            <div className="self-start md:self-auto bg-black/20 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span className="text-xs font-bold font-bengali text-white">
                {products.length} টি পণ্য পাওয়া গেছে
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-6">
        {/* Horizontal Subcategories Filter Bar */}
        {subcategories.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-primary-600" />
                সাব-ক্যাটাগরি ফিল্টার:
              </span>
              {activeSubcategory && (
                <button
                  onClick={() => setActiveSubcategory("")}
                  className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline"
                >
                  সব দেখান (Clear Filter)
                </button>
              )}
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
              {/* "All" Pill */}
              <button
                type="button"
                onClick={() => setActiveSubcategory("")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSubcategory === ""
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/30 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span>সব পণ্য (All)</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-black/20 rounded-full font-mono">
                  {products.length}
                </span>
              </button>

              {/* Individual Subcategories */}
              {subcategories.map((sub: any) => {
                const isSelected = activeSubcategory === (sub.slug || sub.id || sub._id);
                return (
                  <button
                    key={sub.id || sub._id}
                    type="button"
                    onClick={() => setActiveSubcategory(sub.slug || sub.id || sub._id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 font-bengali ${
                      isSelected
                        ? "bg-primary-600 text-white shadow-md shadow-primary-600/30 scale-105"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>{sub.nameBn || sub.nameEn}</span>
                    {sub.nameEn && sub.nameBn && (
                      <span className="text-[10px] opacity-75 font-sans">({sub.nameEn})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Toolbar Bar: Sorting & Filter summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
            প্রদর্শন হচ্ছে: <span className="text-slate-900 dark:text-white font-bold">{sortedProducts.length} টি পণ্য</span>
            {activeSubcategory && (
              <span className="text-primary-600 dark:text-primary-400 ml-1">
                (ফিল্টার করা হয়েছে)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <label className="text-xs font-semibold text-slate-500">সাজান:</label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:border-primary-500 shadow-sm"
            >
              <option value="newest">নতুন পণ্য (Newest)</option>
              <option value="price-low">দাম: কম থেকে বেশি (Price: Low to High)</option>
              <option value="price-high">দাম: বেশি থেকে কম (Price: High to Low)</option>
            </select>
          </div>
        </div>

        {/* Products Catalog Grid */}
        {isProdsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 animate-pulse space-y-3">
                <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.map((p: any) => (
              <ProductCard
                key={p.id || p._id}
                id={p.id || p._id}
                name={p.nameBn || p.nameEn || p.name}
                price={p.price}
                img={p.image || "https://sodayon.com/default-product.jpg"}
                link={`/shop/products/${p.slug || p.id || p._id}`}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-950/60 flex items-center justify-center text-primary-500">
              <Layers className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white font-bengali">
                এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                সদায়ন টিম খুব শীঘ্রই নতুন আকর্ষণীয় পণ্য যোগ করছে। অন্য ক্যাটাগরির পণ্য দেখতে নিচের বাটনে ক্লিক করুন।
              </p>
            </div>
            <Link
              href="/shop"
              className="bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md shadow-primary-600/20"
            >
              সব পণ্য দেখুন (Browse All)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

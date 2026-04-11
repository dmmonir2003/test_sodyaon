"use client";
// Force rebuild - v0 cache clear

import FiltersSidebar from "@/components/shop/FiltersSidebar";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductCard from "@/components/shared/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { getProductsByCategory, getCategoryBySlug } from "@/data/database";
import { BABY_FOOD_PRODUCTS } from "@/data/products";

export default function BabyFoodPage() {
  const category = getCategoryBySlug("baby-food");
  const products = category ? getProductsByCategory(category.id) : [];

  if (!category) {
    return <div className="text-center py-12">Category not found</div>;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
      {/* Category Header */}
      <div className="bg-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex text-sm text-white/70 mb-4"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              হোম
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/shop" className="hover:text-white transition-colors">
              শপ
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium">{category.name}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-2">
            {category.name}
          </h1>
          <p className="text-white/80 max-w-2xl">{category.description}</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 shrink-0">
            <FiltersSidebar />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-medium">
                {products.length}টি পণ্য পাওয়া গেছে
              </span>
              <SortDropdown />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <ProductCard
                  key={prod.id}
                  name={prod.name}
                  price={prod.price}
                  img={prod.image}
                  link={`/shop/products/${prod.id}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BABY_FOOD_PRODUCTS.map((prod, i) => (
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
    </div>
  );
}

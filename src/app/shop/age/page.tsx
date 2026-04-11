"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/shared/ProductCard";
import SortDropdown from "@/components/shop/SortDropdown";
import FiltersSidebar from "@/components/shop/FiltersSidebar";
import { PRODUCTS } from "@/data/database";

const AGES = [
  { id: "0-1", label: "Babies", range: "0-1 Years" },
  { id: "1-3", label: "Toddlers", range: "1-3 Years" },
  { id: "4-6", label: "Preschool", range: "4-6 Years" },
  { id: "7-9", label: "Grade School", range: "7-9 Years" },
  { id: "10-12", label: "Pre-Teens", range: "10-12 Years" },
  { id: "13+", label: "Teens", range: "13+ Years" },
];

export default function AgeFinderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active range from URL, default to "1-3"
  const currentRangeId = searchParams.get("range");
  const activeAge = AGES.find((a) => a.id === currentRangeId) || AGES[0];

  const handleAgeChange = (id: string) => {
    router.push(`/shop/age?range=${encodeURIComponent(id)}`);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Find The Perfect Toy By Age
          </h1>
          <p className="text-primary-100 max-w-2xl mx-auto">
            Children&lsquo;s brains develop rapidly. Filtering toys by the
            precise age stage ensures max safety and fun. Select an age below to
            filter the catalog.
          </p>
        </div>
      </div>

      {/* Age Group Navigation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {AGES.map((age) => {
            console.log(age.id === activeAge.id, "sdfsdfsfdfdsfdafdsa");
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Toys for {activeAge.range}
          </h2>
          <SortDropdown />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 shrink-0">
            <FiltersSidebar />
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}

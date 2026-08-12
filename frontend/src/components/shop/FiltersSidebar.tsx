"use client";

import { useState, Suspense } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useGetCategoriesQuery } from "@/store/admin/adminContentApi";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const AGE_RANGES = [
  { label: "০-১ বছর (0-1 Years)", value: "0-1" },
  { label: "১-৩ বছর (1-3 Years)", value: "1-3" },
  { label: "৪-৬ বছর (4-6 Years)", value: "4-6" },
  { label: "৭-৯ বছর (7-9 Years)", value: "7-9" },
  { label: "১০+ বছর (10+ Years)", value: "10-12" }
];

function FiltersSidebarContent() {
  const [openSection, setOpenSection] = useState<string | null>("Categories");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Selected values from URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedAge = searchParams.get("ageRange") || "";

  // Fetch categories from DB
  const { data: catData, isLoading } = useGetCategoriesQuery({ tree: true });
  const categories = catData?.data || [];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCategorySelect = (catId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory === catId) {
      params.delete("category");
    } else {
      params.set("category", catId);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleAgeSelect = (ageVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedAge === ageVal) {
      params.delete("ageRange");
    } else {
      params.set("ageRange", ageVal);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 sticky top-24 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold font-heading text-lg text-slate-900 dark:text-white">ফিল্টারসমূহ</h3>
        {(selectedCategory || selectedAge) && (
          <button 
            onClick={handleClearFilters}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            সব মুছুন
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Categories Filter */}
        <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
          <button 
            className="flex justify-between items-center w-full font-semibold text-slate-800 dark:text-slate-200"
            onClick={() => toggleSection("Categories")}
          >
            ক্যাটাগরি
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Categories" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "Categories" && (
            <div className="mt-3 space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin">
              {isLoading ? (
                <p className="text-xs text-slate-450">লোড হচ্ছে...</p>
              ) : categories.length > 0 ? (
                categories.map((cat: any) => (
                  <div key={cat.id || cat._id} className="space-y-2">
                    {/* Parent Category Checkbox */}
                    <div className="flex items-center gap-3 group">
                      <button 
                        onClick={() => handleCategorySelect(cat.id || cat._id)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                          selectedCategory === (cat.id || cat._id) 
                            ? 'bg-primary-500 border-primary-500 text-white' 
                            : 'border-slate-300 dark:border-slate-600 group-hover:border-primary-400 bg-transparent'
                        }`}
                      >
                        {selectedCategory === (cat.id || cat._id) && <Check className="w-3 h-3" />}
                      </button>
                      <span 
                        onClick={() => handleCategorySelect(cat.id || cat._id)}
                        className={`text-sm cursor-pointer transition-colors ${
                          selectedCategory === (cat.id || cat._id) 
                            ? 'text-primary-600 font-bold dark:text-primary-400' 
                            : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                        }`}
                      >
                        {cat.nameBn} ({cat.nameEn})
                      </span>
                    </div>

                    {/* Subcategories (if any) */}
                    {cat.children && cat.children.length > 0 && (
                      <div className="pl-6 space-y-2 border-l border-slate-100 dark:border-slate-700/80 ml-2.5">
                        {cat.children.map((sub: any) => (
                          <div key={sub.id || sub._id} className="flex items-center gap-3 group">
                            <button 
                              onClick={() => handleCategorySelect(sub.id || sub._id)}
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                selectedCategory === (sub.id || sub._id) 
                                  ? 'bg-primary-500 border-primary-500 text-white' 
                                  : 'border-slate-300 dark:border-slate-600 group-hover:border-primary-400 bg-transparent'
                              }`}
                            >
                              {selectedCategory === (sub.id || sub._id) && <Check className="w-2.5 h-2.5" />}
                            </button>
                            <span 
                              onClick={() => handleCategorySelect(sub.id || sub._id)}
                              className={`text-xs cursor-pointer transition-colors ${
                                selectedCategory === (sub.id || sub._id) 
                                  ? 'text-primary-600 font-bold dark:text-primary-400' 
                                  : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                              }`}
                            >
                              {sub.nameBn} ({sub.nameEn})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">কোনো ক্যাটাগরি পাওয়া যায়নি।</p>
              )}
            </div>
          )}
        </div>

        {/* Age Range Filter */}
        <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
          <button 
            className="flex justify-between items-center w-full font-semibold text-slate-800 dark:text-slate-200"
            onClick={() => toggleSection("Age")}
          >
            বয়সসীমা
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "Age" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "Age" && (
            <div className="mt-3 space-y-2">
              {AGE_RANGES.map((age) => (
                <div key={age.value} className="flex items-center gap-3 group">
                  <button 
                    onClick={() => handleAgeSelect(age.value)}
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                      selectedAge === age.value 
                        ? 'bg-primary-500 border-primary-500 text-white' 
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-primary-400 bg-transparent'
                    }`}
                  >
                    {selectedAge === age.value && <Check className="w-3 h-3" />}
                  </button>
                  <span 
                    onClick={() => handleAgeSelect(age.value)}
                    className={`text-sm cursor-pointer transition-colors ${
                      selectedAge === age.value 
                        ? 'text-primary-600 font-bold dark:text-primary-400' 
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {age.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FiltersSidebar() {
  return (
    <Suspense fallback={
      <div className="w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm text-xs text-slate-400">
        লোড হচ্ছে...
      </div>
    }>
      <FiltersSidebarContent />
    </Suspense>
  );
}

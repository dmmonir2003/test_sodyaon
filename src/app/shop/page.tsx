import FiltersSidebar from "@/components/shop/FiltersSidebar";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductCard from "@/components/shared/ProductCard";
import { SlidersHorizontal, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "সব খেলনা দেখুন | দারুণ দারুণ খেলনা আবিষ্কার করুন",
  description: "শিশুদের সকল বয়সের জন্য মজাদার এবং শিক্ষামূলক খেলনার আমাদের বিস্তৃত সংগ্রহ ব্রাউজ করুন। সেরা উপহারটি খুঁজুন আজই।",
};

export default function ShopPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600 transition-colors">হোম</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">সব খেলনা দেখুন</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white">সব খেলনা দেখুন</h1>
              <p className="text-slate-500 mt-2">১৪৫টি পণ্যের মধ্যে ১-১২ দেখাচ্ছে</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="md:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-medium">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((prod, i) => (
                <ProductCard key={i} name={prod.name} price={prod.price} img={prod.img} link={`/shop/products/${i}`} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex justify-center">
              <div className="inline-flex gap-2">
                <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-not-allowed text-slate-400">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-primary-600 text-white font-bold shadow-md">১</button>
                <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 font-medium transition-colors">২</button>
                <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 font-medium transition-colors">৩</button>
                <button className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PRODUCTS = [
  { name: "ম্যাগনা-টাইলস ১০০-পিস সেট", price: "৳১১৯৯৯", img: "bg-indigo-100" },
  { name: "উডেন অ্যাক্টিভিটি কিউব", price: "৳৪৫০০", img: "bg-amber-100" },
  { name: "ডাইনোসর স্টেম বিল্ডিং কিট", price: "৳৩৪৯৯", img: "bg-emerald-100" },
  { name: "ইন্টারঅ্যাক্টিভ লার্নিং গ্লোব", price: "৳৫৯৯৯", img: "bg-blue-100" },
  { name: "স্পেস এক্সপ্লোরার ড্রোন", price: "৳৭৯৯৯", img: "bg-slate-200" },
  { name: "মিউজিক্যাল ম্যাট ফ্লোর পিয়ানো", price: "৳৩৫০০", img: "bg-yellow-100" },
  { name: "জায়ান্ট টেডি বিয়ার হাগ", price: "৳৩৯৯৯", img: "bg-pink-100" },
  { name: "কিডস ডিজিটাল ক্যামেরা ১০৮০পি", price: "৳২৯৫০", img: "bg-cyan-100" },
  { name: "উডেন ট্রেন সেট (প্রিমিয়াম)", price: "৳৮৯৯৯", img: "bg-red-100" },
  { name: "ম্যাজিক কেমিস্ট্রি ল্যাব স্টার্টার", price: "৳১৯৯৯", img: "bg-purple-100" },
  { name: "আরসি স্টান্ট কার ৩৬০", price: "৳২৪৯৯", img: "bg-orange-100" },
  { name: "গ্লো-ইন-দ্য ডার্ক স্টার্স সিলিং", price: "৳১৪৯৯", img: "bg-green-100" },
];

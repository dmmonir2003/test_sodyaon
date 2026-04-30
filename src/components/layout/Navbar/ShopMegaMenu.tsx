import { ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ShopMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/shop"
        className="flex items-center space-x-1 font-bold text-sm lg:text-base text-primary-600 dark:text-primary-400 transition-colors py-1"
      >
        <span>শপ</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 transform z-50 rounded-b-2xl border-t border-slate-100 dark:border-slate-800 ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                কুইক লিংক
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/shop"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    সব খেলনা দেখুন
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/age"
                    className="text-sm font-bold text-primary-600 dark:text-primary-400"
                  >
                    বয়স-ভিত্তিক ফাইন্ডার
                  </Link>
                </li>
                <li>
                  <Link
                    href="/deals"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    ফ্ল্যাশ ডিল
                  </Link>
                </li>
                <li>
                  <Link
                    href="/combo"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    কম্বো অফার
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                শীর্ষ ক্যাটাগরি
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/shop/categories/action-figures"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    অ্যাকশন ফিগার
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/categories/building-sets"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    বিল্ডিং সেট
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/categories/educational"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    শিক্ষামূলক
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/categories/dolls"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    পুতুল ও ফিগার
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/categories/outdoor"
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  >
                    আউটডোর প্লে
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                শিশু পণ্য
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/shop/baby-food"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                >
                  শিশু খাবার
                </Link>
                <Link
                  href="/shop/baby-bags"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-bold text-primary-600 dark:text-primary-400"
                >
                  শিশু ব্যাগ
                </Link>
                <Link
                  href="/shop/diapers"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                >
                  ডায়াপার
                </Link>
                <Link
                  href="/shop/baby-clothes"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                >
                  শিশু পোশাক
                </Link>
                <Link
                  href="/shop/baby-care"
                  className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                >
                  শিশু যত্ন পণ্য
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute right-0 top-0 opacity-5">
                <Package className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-2 relative z-10">
                সীমিত সময়
              </span>
              <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-2 relative z-10">
                স্টেম খেলনায় ২০% ছাড়
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 relative z-10 leading-relaxed">
                আমাদের নতুন শিক্ষামূলক টুলকিট অন্বেষণ করুন।
              </p>
              <Link
                href="/shop/categories/educational"
                className="inline-flex items-center justify-center w-full max-w-xs px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-primary-700 transition-colors relative z-10"
              >
                শপ নাও
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

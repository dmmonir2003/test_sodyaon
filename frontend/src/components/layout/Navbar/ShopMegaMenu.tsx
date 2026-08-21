import { ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/store/admin/adminContentApi";

interface ShopMegaMenuProps {
  title: string;
  childItems: any[];
}

export default function ShopMegaMenu({ title, childItems = [] }: ShopMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fetch categories from DB
  const { data: catData } = useGetCategoriesQuery({ tree: true });
  const dbCategories = catData?.data || [];

  // Find baby care category and its subcategories
  const babyCareCat = dbCategories.find((c: any) => c.slug === 'baby-care');
  const babySubcategories = babyCareCat?.children || [];

  // Find other categories and their subcategories
  const otherCats = dbCategories.filter((c: any) => c.slug !== 'baby-care');
  const topSubcategories = otherCats.flatMap((c: any) => c.children || []);

  // Group childItems by group field
  const quickLinks = childItems
    .filter((item) => item.group === "quick-links")
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const topCategories = childItems
    .filter((item) => item.group === "top-categories")
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const babyProducts = childItems
    .filter((item) => item.group === "baby-products")
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const promoCard = childItems.find((item) => item.group === "promo-card");

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
        <span>{title}</span>
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
                {quickLinks.map((sub: any) => {
                  const formattedUrl = sub.url ? (sub.url.startsWith('/') ? sub.url : `/${sub.url}`) : '/shop';
                  return (
                    <li key={sub._id}>
                      <Link
                        href={formattedUrl}
                        className={`text-sm ${
                          sub.titleEn === 'Age Finder' || sub.titleBn === 'বয়স-ভিত্তিক ফাইন্ডার'
                            ? 'font-bold text-primary-600 dark:text-primary-400'
                            : 'font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {sub.titleBn}
                      </Link>
                    </li>
                  );
                })}
                {quickLinks.length === 0 && (
                  <li className="text-sm text-slate-400">কোন লিংক নেই।</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                শীর্ষ ক্যাটাগরি
              </h3>
              <ul className="space-y-4">
                {topCategories.map((sub: any) => {
                  const formattedUrl = sub.url ? (sub.url.startsWith('/') ? sub.url : `/${sub.url}`) : '/shop';
                  return (
                    <li key={sub._id}>
                      <Link
                        href={formattedUrl}
                        className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 transition-colors"
                      >
                        {sub.titleBn}
                      </Link>
                    </li>
                  );
                })}
                {topSubcategories.map((sub: any) => (
                  <li key={sub._id || sub.id}>
                    <Link
                      href={`/shop?category=${sub._id || sub.id}`}
                      className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 transition-colors"
                    >
                      {sub.nameBn}
                    </Link>
                  </li>
                ))}
                {topCategories.length === 0 && topSubcategories.length === 0 && (
                  <li className="text-sm text-slate-400">কোন ক্যাটাগরি নেই।</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                শিশু পণ্য
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {babyProducts.map((sub: any) => {
                  const formattedUrl = sub.url ? (sub.url.startsWith('/') ? sub.url : `/${sub.url}`) : '/shop';
                  return (
                    <Link
                      key={sub._id}
                      href={formattedUrl}
                      className={`text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center ${
                        sub.titleEn === 'Baby Bags' || sub.titleBn === 'শিশু ব্যাগ'
                          ? 'font-bold text-primary-600 dark:text-primary-400'
                          : 'font-medium text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {sub.titleBn}
                    </Link>
                  );
                })}
                {babySubcategories.map((sub: any) => (
                  <Link
                    key={sub._id || sub.id}
                    href={`/shop?category=${sub._id || sub.id}`}
                    className="text-sm px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center font-medium text-slate-700 dark:text-slate-300"
                  >
                    {sub.nameBn}
                  </Link>
                ))}
                {babyProducts.length === 0 && babySubcategories.length === 0 && (
                  <div className="text-sm text-slate-400 col-span-2">কোন পণ্য নেই।</div>
                )}
              </div>
            </div>

            {promoCard ? (
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute right-0 top-0 opacity-5">
                  <Package className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
                </div>
                {promoCard.badgeBn && (
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-2 relative z-10">
                    {promoCard.badgeBn}
                  </span>
                )}
                <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-2 relative z-10 leading-snug">
                  {promoCard.titleBn}
                </h3>
                {promoCard.descriptionBn && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 relative z-10 leading-relaxed">
                    {promoCard.descriptionBn}
                  </p>
                )}
                <Link
                  href={promoCard.url}
                  className="inline-flex items-center justify-center w-full max-w-xs px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-primary-700 transition-colors relative z-10"
                >
                  {promoCard.ctaBn || "শপ নাও"}
                </Link>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute right-0 top-0 opacity-5">
                  <Package className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-2 relative z-10">
                  সীমিত সময়
                </span>
                <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-2 relative z-10 leading-snug">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

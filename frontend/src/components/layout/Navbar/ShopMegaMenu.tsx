import { ChevronDown, Package, ChevronRight, Sparkles, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/store/admin/adminContentApi";

interface ShopMegaMenuProps {
  title: string;
  childItems: any[];
}

// Fallback categories to ensure menu is always rich and interactive
const fallbackCategories = [
  {
    slug: "baby-care",
    nameBn: "বেবি কেয়ার ও ডায়াপার",
    nameEn: "Baby Care & Diaper",
    children: [
      { slug: "baby-food", nameBn: "শিশু খাবার", nameEn: "Baby Food" },
      { slug: "baby-bags", nameBn: "শিশু ব্যাগ", nameEn: "Baby Bags" },
      { slug: "diapers", nameBn: "ডায়াপার", nameEn: "Diapers" },
      { slug: "baby-clothes", nameBn: "শিশু পোশাক", nameEn: "Baby Clothes" },
      { slug: "baby-care-products", nameBn: "শিশু যত্ন পণ্য", nameEn: "Baby Care" },
      { slug: "diapers-wipes", nameBn: "ডায়াপার ও ওয়াইপস", nameEn: "Wipes & Diapers" },
    ],
  },
  {
    slug: "stem-blocks",
    nameBn: "স্টেম ও বিল্ডিং ব্লগস",
    nameEn: "STEM & Building Blocks",
    children: [
      { slug: "magnetic-blocks", nameBn: "চৌম্বকীয় বিল্ডিং খেলনা", nameEn: "Magnetic Tiles" },
      { slug: "robotics-kits", nameBn: "রোবোটিক্স ও স্টেম কিটস", nameEn: "Robotics Kits" },
      { slug: "science-kits", nameBn: "বিজ্ঞান সেট", nameEn: "Science Kits" },
      { slug: "wooden-blocks", nameBn: "কাঠের ব্লক", nameEn: "Wooden Blocks" },
    ],
  },
  {
    slug: "educational-toys",
    nameBn: "শিক্ষামূলক খেলনা",
    nameEn: "Educational Toys",
    children: [
      { slug: "learning-tablets", nameBn: "লার্নিং ট্যাবলেট ও ডিভাইস", nameEn: "Learning Tablets" },
      { slug: "puzzle-games", nameBn: "ধাঁধা ও পাজল", nameEn: "Puzzles" },
      { slug: "drawing-boards", nameBn: "ড্রয়িং বোর্ড ও আর্ট", nameEn: "Art & Drawing" },
      { slug: "math-games", nameBn: "গণিত ও সংখ্যা শেখা", nameEn: "Math Toys" },
    ],
  },
  {
    slug: "dolls-pretend-play",
    nameBn: "পুতুল ও প্রিটেন্ড প্লে",
    nameEn: "Dolls & Pretend Play",
    children: [
      { slug: "fashion-dolls", nameBn: "ফ্যাশন পুতুল ও রোলপ্লে", nameEn: "Fashion Dolls" },
      { slug: "kitchen-sets", nameBn: "রান্নাঘর ও কুকিং সেট", nameEn: "Kitchen Sets" },
      { slug: "doctor-sets", nameBn: "ডাক্তার সেট", nameEn: "Doctor Sets" },
      { slug: "playhouse-tents", nameBn: "প্লেহাউস ও তাঁবু", nameEn: "Playhouse Tents" },
    ],
  },
];

export default function ShopMegaMenu({ title, childItems = [] }: ShopMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCatSlug, setSelectedCatSlug] = useState<string>("");

  // Fetch categories from DB
  const { data: catData } = useGetCategoriesQuery({ tree: true });
  const dbCategories = catData?.data || [];

  // Filter root categories that are active for mega menu
  const dbRootCategories = dbCategories.filter((c: any) => !c.parentId && c.showInMegaMenu !== false);
  const rootCategories = dbRootCategories.length > 0 ? dbRootCategories : fallbackCategories;

  // Active Category (default to first category when opening)
  const activeCategory = (selectedCatSlug
    ? rootCategories.find((c: any) => c.slug === selectedCatSlug || (c.id || c._id) === selectedCatSlug)
    : null) || rootCategories[0] || null;

  const activeSubcategories = activeCategory?.children || [];

  // Group childItems by group field (if configured via Menu CMS)
  const quickLinks = childItems
    .filter((item) => item.group === "quick-links")
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
        className={`absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-2xl transition-all duration-300 transform z-50 rounded-b-3xl border-t border-slate-100 dark:border-slate-800 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: কুইক লিংক */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary-600" />
                <span>কুইক লিংক</span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.length > 0 ? (
                  quickLinks.map((sub: any) => {
                    const formattedUrl = sub.url ? (sub.url.startsWith("/") ? sub.url : `/${sub.url}`) : "/shop";
                    return (
                      <li key={sub._id}>
                        <Link
                          href={formattedUrl}
                          className={`text-sm block transition-colors ${
                            sub.titleEn === "Age Finder" || sub.titleBn === "বয়স-ভিত্তিক ফাইন্ডার"
                              ? "font-bold text-primary-600 dark:text-primary-400 hover:underline"
                              : "font-medium text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white"
                          }`}
                        >
                          {sub.titleBn || sub.titleEn}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <>
                    <li>
                      <Link href="/shop" className="text-sm font-medium text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white transition-colors">
                        সব খেলনা দেখুন
                      </Link>
                    </li>
                    <li>
                      <Link href="/shop/age" className="text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline transition-colors">
                        বয়স-ভিত্তিক ফাইন্ডার
                      </Link>
                    </li>
                    <li>
                      <Link href="/deals" className="text-sm font-medium text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white transition-colors">
                        ফ্ল্যাশ ডিল
                      </Link>
                    </li>
                    <li>
                      <Link href="/combo" className="text-sm font-medium text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white transition-colors">
                        কম্বো অফার
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Column 2: শীর্ষ ক্যাটাগরি (Main Categories with Interactive Hover) */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
                <span>শীর্ষ ক্যাটাগরি</span>
                <span className="text-[10px] text-slate-400 font-normal">হোভার বা ক্লিক করুন</span>
              </h3>
              <ul className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1 hide-scrollbar">
                {rootCategories.map((cat: any) => {
                  const isSelected = activeCategory?.slug === cat.slug || (activeCategory?.id || activeCategory?._id) === (cat.id || cat._id);

                  return (
                    <li key={cat.id || cat._id || cat.slug}>
                      <Link
                        href={`/shop/categories/${cat.slug}`}
                        onMouseEnter={() => setSelectedCatSlug(cat.slug)}
                        onClick={(e) => {
                          setSelectedCatSlug(cat.slug);
                        }}
                        className={`text-sm px-3 py-2 rounded-xl transition-all flex items-center justify-between group ${
                          isSelected
                            ? "bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 font-bold shadow-sm"
                            : "font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <span className="font-bengali truncate">{cat.nameBn || cat.nameEn}</span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            isSelected
                              ? "text-primary-600 dark:text-primary-400 translate-x-0.5 opacity-100"
                              : "text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: ডায়নামিক সাব-ক্যাটাগরি বাটনসমূহ (Shows selected Main Category name & subcategories) */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white font-bengali truncate flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-primary-600" />
                  <span>{activeCategory?.nameBn || activeCategory?.nameEn || "সাব-ক্যাটাগরি"}</span>
                </h3>
                {activeCategory && (
                  <Link
                    href={`/shop/categories/${activeCategory.slug}`}
                    className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline whitespace-nowrap ml-2"
                  >
                    সব দেখুন
                  </Link>
                )}
              </div>

              {/* Subcategories Buttons Grid */}
              <div className="grid grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1 hide-scrollbar">
                {activeSubcategories.length > 0 ? (
                  activeSubcategories.map((sub: any) => {
                    const targetUrl = activeCategory
                      ? `/shop/categories/${activeCategory.slug}?subcategory=${sub.slug}`
                      : `/shop?category=${sub.slug}`;

                    return (
                      <Link
                        key={sub._id || sub.id || sub.slug}
                        href={targetUrl}
                        className="text-xs sm:text-sm px-3 py-2.5 bg-slate-50 dark:bg-slate-800/90 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950/60 dark:hover:text-primary-400 rounded-xl transition-all text-center font-medium text-slate-700 dark:text-slate-300 font-bengali border border-slate-100 dark:border-slate-700/60 hover:border-primary-200 dark:hover:border-primary-800 shadow-sm active:scale-95 flex items-center justify-center min-h-[44px]"
                      >
                        <span className="line-clamp-2">{sub.nameBn || sub.nameEn}</span>
                      </Link>
                    );
                  })
                ) : (
                  <div className="col-span-2 py-6 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center flex flex-col items-center justify-center gap-2 border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bengali">
                      {activeCategory?.nameBn} এর কালেকশন দেখুন
                    </p>
                    {activeCategory && (
                      <Link
                        href={`/shop/categories/${activeCategory.slug}`}
                        className="text-xs font-bold bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-xl transition shadow-md shadow-primary-600/20"
                      >
                        ক্যাটাগরির সব পণ্য →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Column 4: প্রোমো কার্ড */}
            {promoCard ? (
              <div className="bg-gradient-to-br from-slate-50 to-primary-50/30 dark:from-slate-800 dark:to-slate-850 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-slate-100 dark:border-slate-700/60">
                <div className="absolute right-0 top-0 opacity-5">
                  <Package className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
                </div>
                <div>
                  {promoCard.badgeBn && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400 mb-2 inline-block bg-cyan-500/10 px-2 py-0.5 rounded-full">
                      {promoCard.badgeBn}
                    </span>
                  )}
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 relative z-10 leading-snug font-bengali">
                    {promoCard.titleBn}
                  </h3>
                  {promoCard.descriptionBn && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 relative z-10 leading-relaxed font-bengali line-clamp-3">
                      {promoCard.descriptionBn}
                    </p>
                  )}
                </div>
                <Link
                  href={promoCard.url || "/shop"}
                  className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-md transition-all relative z-10 font-bengali active:scale-95"
                >
                  {promoCard.ctaBn || "শপ নাও"}
                </Link>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-50 to-primary-50/30 dark:from-slate-800 dark:to-slate-850 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-slate-100 dark:border-slate-700/60">
                <div className="absolute right-0 top-0 opacity-5">
                  <Package className="w-48 h-48 transform translate-x-1/4 -translate-y-1/4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400 mb-2 inline-block bg-cyan-500/10 px-2 py-0.5 rounded-full">
                    সীমিত সময়
                  </span>
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 relative z-10 leading-snug font-bengali">
                    স্টেম খেলনায় ২০% ছাড়
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 relative z-10 leading-relaxed font-bengali">
                    আমাদের নতুন শিক্ষামূলক টুলকিট অন্বেষণ করুন।
                  </p>
                </div>
                <Link
                  href="/shop/categories/stem-blocks"
                  className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-md transition-all relative z-10 font-bengali active:scale-95"
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

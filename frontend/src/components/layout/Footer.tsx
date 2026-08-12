"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import StaticLogo from "@/components/shared/StaticLogo";
import { useGetMenuItemsQuery } from "@/store/user/menu/menuApi";

export default function Footer() {
  const pathname = usePathname();
  const { data: menuData } = useGetMenuItemsQuery();
  const dbFooterItems = menuData?.data?.filter((item: any) => item.type === 'footer') || [];

  // Define footer groups and fallback mock links
  const columns = [
    {
      title: "খেলনা কিনুন",
      group: "quick-links",
      defaultLinks: [
        { titleBn: "সব দেখুন", url: "/shop" },
        { titleBn: "ক্যাটাগরি", url: "/shop/categories" },
        { titleBn: "ফ্ল্যাশ ডিল", url: "/deals" },
        { titleBn: "কম্বো অফার", url: "/combo" }
      ]
    },
    {
      title: "শিশু পণ্য",
      group: "baby-products",
      defaultLinks: [
        { titleBn: "শিশু খাবার", url: "/shop/baby-food" },
        { titleBn: "শিশু ব্যাগ", url: "/shop/baby-bags" },
        { titleBn: "ডায়াপার", url: "/shop/diapers" },
        { titleBn: "শিশু পোশাক", url: "/shop/baby-clothes" },
        { titleBn: "শিশু যত্ন পণ্য", url: "/shop/baby-care" }
      ]
    },
    {
      title: "এআই ফিচারসমূহ",
      group: "ai-features",
      defaultLinks: [
        { titleBn: "এআই গিফট ফাইন্ডার", url: "/ai-tools/gift-finder" },
        { titleBn: "খেলনা রিকমেন্ডেশন", url: "/ai-tools/recommendations" },
        { titleBn: "সেফটি চেকার", url: "/ai-tools/safety" },
        { titleBn: "প্যারেন্টিং অ্যাসিস্ট্যান্ট", url: "/ai-tools/parenting" }
      ]
    },
    {
      title: "সাপোর্ট",
      group: "support",
      defaultLinks: [
        { titleBn: "আমার অ্যাকাউন্ট", url: "/profile" },
        { titleBn: "অর্ডার ট্র্যাক করুন", url: "/track-order" },
        { titleBn: "শিপিং ও রিটার্ন", url: "/shipping" },
        { titleBn: "সাধারণ জিজ্ঞাসা", url: "/faq" },
        { titleBn: "যোগাযোগ করুন", url: "/contact" }
      ]
    }
  ];

  // Only hide on mobile for Parenting Assistant page
  const footerClasses = pathname === '/ai-tools/parenting-assistant' 
    ? "bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 hidden md:block"
    : "bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800";

  return (
    <footer className={footerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center  mb-4">
              <StaticLogo className="w-8 h-8 md:w-14 md:h-14" />
              <span className="font-heading font-bold md:text-3xl text-xl  text-white">
                সদা<span className="text-primary-500">য়ন</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              বিশ্বের সবচেয়ে স্মার্ট খেলনার দোকান। আমাদের এআই-চালিত রিকমেন্ডেশনের মাধ্যমে আপনার সন্তানের জন্য নিখুঁত এবং নিরাপদ খেলনা খুব সহজেই খুঁজে নিন।
            </p>
            <div className="flex space-x-4 pt-2 text-sm font-medium">
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">ফেসবুক</a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">টুইটার</a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">ইন্সটাগ্রাম</a>
            </div>
          </div>

          {columns.map((col) => {
            const dbLinks = dbFooterItems.filter((item: any) => item.group === col.group);
            const activeLinks = dbLinks.length > 0 ? dbLinks : col.defaultLinks;

            return (
              <div key={col.group}>
                <h3 className="font-semibold text-white mb-4">{col.title}</h3>
                <ul className="space-y-3 text-sm">
                  {activeLinks.map((link: any, idx: number) => {
                    const isAiFinder = link.url === '/ai-tools/gift-finder';
                    const linkClasses = isAiFinder 
                      ? "hover:text-primary-400 transition-colors text-secondary-400 font-medium"
                      : "hover:text-primary-400 transition-colors";
                    return (
                      <li key={link._id || idx}>
                        <Link href={link.url} className={linkClasses}>
                          {link.titleBn}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Sodayon E-Commerce. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex space-x-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">গোপনীয়তা নীতি</Link>
            <Link href="/terms" className="hover:text-white transition-colors">পরিষেবার শর্তাবলী</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">সাইটম্যাপ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

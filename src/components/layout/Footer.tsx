"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import StaticLogo from "@/components/shared/StaticLogo";

export default function Footer() {
  const pathname = usePathname();

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

          <div>
            <h3 className="font-semibold text-white mb-4">খেলনা কিনুন</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="hover:text-primary-400 transition-colors">সব দেখুন</Link></li>
              <li><Link href="/shop/categories" className="hover:text-primary-400 transition-colors">ক্যাটাগরি</Link></li>
              <li><Link href="/deals" className="hover:text-primary-400 transition-colors">ফ্ল্যাশ ডিল</Link></li>
              <li><Link href="/combo" className="hover:text-primary-400 transition-colors">কম্বো অফার</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">শিশু পণ্য</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop/baby-food" className="hover:text-primary-400 transition-colors">শিশু খাবার</Link></li>
              <li><Link href="/shop/baby-bags" className="hover:text-primary-400 transition-colors">শিশু ব্যাগ</Link></li>
              <li><Link href="/shop/diapers" className="hover:text-primary-400 transition-colors">ডায়াপার</Link></li>
              <li><Link href="/shop/baby-clothes" className="hover:text-primary-400 transition-colors">শিশু পোশাক</Link></li>
              <li><Link href="/shop/baby-care" className="hover:text-primary-400 transition-colors">শিশু যত্ন পণ্য</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">এআই ফিচারসমূহ</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/ai-tools/gift-finder" className="hover:text-primary-400 transition-colors text-secondary-400">এআই গিফট ফাইন্ডার</Link></li>
              <li><Link href="/ai-tools/recommendations" className="hover:text-primary-400 transition-colors">খেলনা রিকমেন্ডেশন</Link></li>
              <li><Link href="/ai-tools/safety" className="hover:text-primary-400 transition-colors">সেফটি চেকার</Link></li>
              <li><Link href="/ai-tools/parenting" className="hover:text-primary-400 transition-colors">প্যারেন্টিং অ্যাসিস্ট্যান্ট</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">সাপোর্ট</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/account" className="hover:text-primary-400 transition-colors">আমার অ্যাকাউন্ট</Link></li>
              <li><Link href="/track-order" className="hover:text-primary-400 transition-colors">অর্ডার ট্র্যাক করুন</Link></li>
              <li><Link href="/shipping" className="hover:text-primary-400 transition-colors">শিপিং ও রিটার্ন</Link></li>
              <li><Link href="/faq" className="hover:text-primary-400 transition-colors">সাধারণ জিজ্ঞাসা</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">যোগাযোগ করুন</Link></li>
            </ul>
          </div>

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

"use client";

import { useAppSelector } from "@/store/hooks";
import { Package, Heart, CreditCard } from "lucide-react";

export default function ProfilePage() {
  const { data: user } = useAppSelector((state) => state.profile);

  const stats = [
    { title: "মোট অর্ডার", value: "১২", icon: <Package className="w-6 h-6 text-primary-500" />, bg: "bg-primary-50 dark:bg-primary-900/20" },
    { title: "উইশলিস্ট", value: "৫", icon: <Heart className="w-6 h-6 text-danger-500" />, bg: "bg-danger-50 dark:bg-danger-900/20" },
    { title: "রিওয়ার্ড পয়েন্ট", value: "২৫০", icon: <CreditCard className="w-6 h-6 text-warning-500" />, bg: "bg-warning-50 dark:bg-warning-900/20" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
        <h1 className="text-2xl md:text-3xl font-black font-heading text-slate-900 dark:text-white mb-2">
          স্বাগতম, {user?.name}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          আপনার সদায়ন ড্যাশবোর্ডে আপনাকে স্বাগতম। এখান থেকে আপনার সকল কার্যকলাপ পরিচালনা করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col hover:-translate-y-1 transition-transform">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
              {stat.icon}
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">সাম্প্রতিক এক্টিভিটি</h2>
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 font-medium">কোনো সাম্প্রতিক এক্টিভিটি নেই</p>
        </div>
      </div>
    </div>
  );
}

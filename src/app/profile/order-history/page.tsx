"use client";

import { PackageCheck, FileText } from "lucide-react";

export default function OrderHistoryPage() {
  const orders = [
    { id: "#PT-88902", date: "১০ এপ্রিল, ২০২৬", status: "ডেলিভারড", amount: "৳ ১,২৫০" },
    { id: "#PT-88845", date: "২ মার্চ, ২০২৬", status: "ডেলিভারড", amount: "৳ ৩,৫০০" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black font-heading text-slate-900 dark:text-white">অর্ডার হিস্ট্রি</h1>
        <p className="text-slate-500 dark:text-slate-400">আপনার পূর্ববর্তী সকল অর্ডারের তালিকা।</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">অর্ডার আইডি</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">তারিখ</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">স্ট্যাটাস</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">মোট মূল্য</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">একশন</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx} className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{order.id}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-medium text-sm">{order.date}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400">
                      <PackageCheck className="w-3.5 h-3.5" />
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{order.amount}</td>
                  <td className="p-4">
                    <button className="text-primary-600 hover:text-primary-700 font-bold text-sm bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> ইনভয়েস
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

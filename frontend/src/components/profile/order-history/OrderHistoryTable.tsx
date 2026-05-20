"use client";

import { PackageCheck, FileText } from "lucide-react";

export interface Order {
  id: string;
  date: string;
  time: string;
  status: string;
  quantity: number;
  amount: string;
}

interface OrderHistoryTableProps {
  orders: Order[];
}

export default function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Order ID</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Date & Time</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Status</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Quantity</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Amount</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <tr key={idx} className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{order.id}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-medium text-sm">
                    {order.date} <br/> <span className="text-xs text-slate-400">{order.time}</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400">
                      <PackageCheck className="w-3.5 h-3.5" />
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{order.quantity}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{order.amount}</td>
                  <td className="p-4">
                    <button className="text-primary-600 hover:text-primary-700 font-bold text-sm transition-colors flex items-center justify-center gap-1.5 w-full">
                      <FileText className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

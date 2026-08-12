"use client";

import { PackageCheck, FileText, Clock, Truck, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

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
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'pending') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
          <Clock className="w-3.5 h-3.5" />
          Pending
        </span>
      );
    }
    if (s === 'processing') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          Processing
        </span>
      );
    }
    if (s === 'shipped') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
          <Truck className="w-3.5 h-3.5" />
          Shipped
        </span>
      );
    }
    if (s === 'delivered') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Delivered
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400">
        <AlertTriangle className="w-3.5 h-3.5" />
        Cancelled
      </span>
    );
  };

  return (
    <div className="bg-transparent md:bg-white md:dark:bg-slate-800 rounded-none md:rounded-xl md:shadow-sm border-0 md:border md:border-slate-100 md:dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-hidden md:overflow-x-auto">
        <table className="w-full text-center border-collapse block md:table">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Order ID</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Date & Time</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Status</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Quantity</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Amount</th>
              <th className="p-4 text-sm font-bold text-slate-900 dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group space-y-4 md:space-y-0">
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <tr key={idx} className="block md:table-row border border-slate-200 dark:border-slate-700 md:border-b last:border-b last:md:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors bg-white dark:bg-slate-800 rounded-xl md:rounded-none overflow-hidden shadow-sm md:shadow-none">
                  <td className="p-4 flex items-center justify-between md:table-cell border-b border-slate-100 dark:border-slate-700/50 md:border-b-0">
                    <span className="md:hidden text-xs font-bold text-slate-500 uppercase">Order ID</span>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{order.id}</span>
                  </td>
                  <td className="p-4 flex items-center justify-between md:table-cell border-b border-slate-100 dark:border-slate-700/50 md:border-b-0">
                    <span className="md:hidden text-xs font-bold text-slate-500 uppercase">Date & Time</span>
                    <div className="text-right md:text-center text-slate-600 dark:text-slate-300 font-medium text-sm">
                      {order.date} <span className="md:hidden">,</span> <br className="hidden md:block"/> <span className="text-xs text-slate-400">{order.time}</span>
                    </div>
                  </td>
                  <td className="p-4 flex items-center justify-between md:table-cell border-b border-slate-100 dark:border-slate-700/50 md:border-b-0">
                    <span className="md:hidden text-xs font-bold text-slate-500 uppercase">Status</span>
                    <div>{getStatusBadge(order.status)}</div>
                  </td>
                  <td className="p-4 flex items-center justify-between md:table-cell border-b border-slate-100 dark:border-slate-700/50 md:border-b-0">
                    <span className="md:hidden text-xs font-bold text-slate-500 uppercase">Quantity</span>
                    <span className="font-bold text-slate-900 dark:text-white">{order.quantity}</span>
                  </td>
                  <td className="p-4 flex items-center justify-between md:table-cell border-b border-slate-100 dark:border-slate-700/50 md:border-b-0">
                    <span className="md:hidden text-xs font-bold text-slate-500 uppercase">Amount</span>
                    <span className="font-bold text-slate-900 dark:text-white">{order.amount}</span>
                  </td>
                  <td className="p-4 flex items-center justify-between md:table-cell md:justify-center">
                    <span className="md:hidden text-xs font-bold text-slate-500 uppercase">Action</span>
                    <Link href={`/track-order?orderId=${order.id}`} className="px-4 py-2.5 md:px-3 md:py-1.5 bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/40 rounded-lg font-bold text-sm md:text-xs transition-colors flex items-center gap-1.5 justify-center">
                      <Truck className="w-4 h-4 md:w-3.5 md:h-3.5" /> Track
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="block md:table-row bg-white dark:bg-slate-800 rounded-xl md:rounded-none">
                <td colSpan={6} className="block md:table-cell py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
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

"use client";

import OrderHistoryTable from "@/components/profile/order-history/OrderHistoryTable";
import { useGetMyOrdersQuery } from "@/store/user/orders/ordersApi";
import { Loader2 } from "lucide-react";

export default function OrderHistoryPage() {
  const { data: response, isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  const orders = response?.data?.map((o: any) => {
    const dateObj = new Date(o.createdAt);
    return {
      id: o._id || o.id,
      date: dateObj.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: dateObj.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      status: o.status,
      quantity: o.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      amount: `৳ ${o.totalAmount.toLocaleString()}`
    };
  }) || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Orders</h2>
      <OrderHistoryTable orders={orders} />
    </div>
  );
}

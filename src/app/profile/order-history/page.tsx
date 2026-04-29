import OrderHistoryTable, { Order } from "@/components/profile/order-history/OrderHistoryTable";

export default function OrderHistoryPage() {
  // Simulating server-side data fetching
  const orders: Order[] = [
    {
      id: "#SD99124",
      date: "12 Oct, 2025",
      time: "10:30 AM",
      status: "Delivered",
      quantity: 1,
      amount: "৳ 1,550"
    },
    {
      id: "#SD88562",
      date: "05 Oct, 2025",
      time: "02:15 PM",
      status: "Delivered",
      quantity: 2,
      amount: "৳ 2,400"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Orders</h2>
      <OrderHistoryTable orders={orders} />
    </div>
  );
}

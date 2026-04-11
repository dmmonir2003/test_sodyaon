"use client";

import { useAuth } from "@/components/admin/AuthContext";
import { ShieldAlert, Package, CheckCircle2, Clock, Truck, MoreHorizontal } from "lucide-react";

export default function OrdersPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  if (!user.permissions.canManageOrders) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black font-heading text-white mb-4">Orders Locked</h1>
        <p className="text-slate-400 max-w-md">
          You lack the required privileges to view or process customer shipments. You are currently logged in as <span className="font-bold">{user.role}</span>.
        </p>
      </div>
    );
  }

  const dummyOrders = [
    { id: "ORD-94812", customer: "Rafiq Hasan", amount: 2450, status: "Pending", date: "Today, 10:42 AM" },
    { id: "ORD-94811", customer: "Sarah Khan", amount: 890, status: "Shipped", date: "Yesterday, 3:15 PM" },
    { id: "ORD-94810", customer: "Aminul Islam", amount: 15600, status: "Delivered", date: "Oct 12, 11:00 AM" },
    { id: "ORD-94809", customer: "Mita Rahman", amount: 450, status: "Pending", date: "Oct 12, 09:30 AM" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <Package className="h-8 w-8 text-indigo-400" />
            Order Fulfillment
          </h1>
          <p className="text-slate-400 mt-1">Manage processing, shipping, and delivery pipelines.</p>
        </div>
        
        {user.role === 'DIGITAL_MARKETER' && (
          <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/30 text-xs font-bold flex items-center gap-2">
             <ShieldAlert className="h-4 w-4" />
             Granted Support Access
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-slate-500 font-bold text-xs uppercase">Pending</div>
            <div className="text-2xl font-black text-amber-400 mt-1">24</div>
          </div>
          <Clock className="text-slate-700 h-8 w-8" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-slate-500 font-bold text-xs uppercase">In Transit (Shipped)</div>
            <div className="text-2xl font-black text-blue-400 mt-1">108</div>
          </div>
          <Truck className="text-slate-700 h-8 w-8" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-slate-500 font-bold text-xs uppercase">Delivered Successful</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">1,492</div>
          </div>
          <CheckCircle2 className="text-slate-700 h-8 w-8" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {dummyOrders.map(o => (
              <tr key={o.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-mono text-sm text-primary-400 font-bold">{o.id}</td>
                <td className="p-4">
                  <div className="text-white font-bold">{o.customer}</div>
                  <div className="text-xs text-slate-500">{o.date}</div>
                </td>
                <td className="p-4 font-bold text-white">৳{o.amount.toLocaleString()}</td>
                <td className="p-4">
                   <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                      o.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                      o.status === 'Shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {o.status === 'Pending' && <Clock className="h-3 w-3" />}
                      {o.status === 'Shipped' && <Truck className="h-3 w-3" />}
                      {o.status === 'Delivered' && <CheckCircle2 className="h-3 w-3" />}
                      {o.status}
                    </div>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

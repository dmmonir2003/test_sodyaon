"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/admin/AuthContext";
import { 
  useAdminGetOrdersQuery, 
  useAdminUpdateOrderStatusMutation 
} from "@/store/user/orders/ordersApi";
import { 
  ShieldAlert, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertTriangle,
  Loader2,
  Calendar,
  Phone,
  User,
  ShoppingBag,
  Info
} from "lucide-react";

export default function OrdersPage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fetch orders from database
  const { data: response, isLoading, isFetching } = useAdminGetOrdersQuery(
    statusFilter !== "all" ? { status: statusFilter } : undefined
  );

  const [updateStatus, { isLoading: isUpdating }] = useAdminUpdateOrderStatusMutation();

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

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateStatus({ orderId, status: newStatus }).unwrap();
    } catch (err: any) {
      alert(err?.data?.message || "Failed to update order status.");
    }
  };

  const orders = response?.data || [];

  // Calculate status counts
  const pendingCount = orders.filter((o: any) => o.status === "pending").length;
  const transitCount = orders.filter((o: any) => o.status === "shipped").length;
  const deliveredCount = orders.filter((o: any) => o.status === "delivered").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <Package className="h-8 w-8 text-indigo-400" />
            Order Fulfillment
          </h1>
          <p className="text-slate-400 mt-1">Manage processing, shipping, and delivery pipelines.</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-200 text-sm font-semibold rounded-xl px-4 py-2 outline-none transition-colors"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-slate-500 font-bold text-xs uppercase">Pending Approval</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{isLoading ? "..." : pendingCount}</div>
          </div>
          <Clock className="text-slate-700 h-8 w-8" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-slate-500 font-bold text-xs uppercase">In Transit (Shipped)</div>
            <div className="text-2xl font-black text-blue-400 mt-1">{isLoading ? "..." : transitCount}</div>
          </div>
          <Truck className="text-slate-700 h-8 w-8" />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-slate-500 font-bold text-xs uppercase">Delivered Successful</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{isLoading ? "..." : deliveredCount}</div>
          </div>
          <CheckCircle2 className="text-slate-700 h-8 w-8" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        {(isLoading || isFetching) && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm z-30 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Order Details</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items Summary</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.length > 0 ? (
                orders.map((o: any) => (
                  <tr key={o._id || o.id} className="hover:bg-slate-800/30 transition-colors">
                    {/* Order Details */}
                    <td className="p-4">
                      <div className="font-mono text-sm text-primary-400 font-bold truncate max-w-[150px]" title={o._id || o.id}>
                        {o._id || o.id}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(o.createdAt).toLocaleDateString()} {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="mt-2.5">
                        <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                          {o.paymentMethod === 'stripe' ? 'STRIPE' : 'COD'}
                        </span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-100 font-bold">{o.fullName || o.userId?.name || "Guest Customer"}</span>
                        {o.userId ? (
                          <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded">REGISTERED</span>
                        ) : (
                          <span className="text-[10px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/25 px-1.5 py-0.5 rounded">GUEST</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1.5">
                        <Phone className="w-3 h-3 text-slate-600" />
                        <span>{o.shippingPhone}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 truncate max-w-[200px]" title={o.shippingAddress}>
                        {o.shippingAddress}
                      </p>
                      
                      {o.notes && (
                        <div className="mt-2.5 bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-lg max-w-[240px]">
                          <div className="flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Special Notes</p>
                              <p className="text-xs text-indigo-200/80 break-words whitespace-pre-wrap">{o.notes}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Items */}
                    <td className="p-4">
                      <div className="max-w-[220px] space-y-1">
                        {o.items.map((item: any, idx: number) => (
                          <div key={idx} className="text-xs text-slate-300 truncate flex justify-between gap-2">
                            <span className="truncate">⭐ {item.name}</span>
                            <span className="text-slate-500 shrink-0">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4">
                      <span className="font-extrabold text-white text-base">৳{o.totalAmount.toLocaleString()}</span>
                    </td>

                    {/* Status Select dropdown */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={o.status}
                          disabled={isUpdating}
                          onChange={(e) => handleStatusChange(o._id || o.id, e.target.value)}
                          className={`text-xs font-bold rounded-xl px-3 py-2 border outline-none cursor-pointer transition-colors bg-slate-950 ${
                            o.status === "pending" ? "text-amber-400 border-amber-500/30" :
                            o.status === "processing" ? "text-indigo-400 border-indigo-500/30" :
                            o.status === "shipped" ? "text-blue-400 border-blue-500/30" :
                            o.status === "delivered" ? "text-emerald-400 border-emerald-500/30" :
                            "text-rose-400 border-rose-500/30"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500 font-medium">
                    <ShoppingBag className="w-12 h-12 text-slate-800 mx-auto mb-3" />
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

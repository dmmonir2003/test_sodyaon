"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTrackOrderQuery } from "@/store/user/orders/ordersApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { 
  Package, 
  Search, 
  Phone, 
  MapPin, 
  CreditCard, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  ArrowLeft,
  Calendar,
  DollarSign
} from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderIdInput, setOrderIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searchQuery, setSearchQuery] = useState<{ orderId: string; phone: string } | null>(null);

  // If query params exist in URL, trigger search
  useEffect(() => {
    const urlOrderId = searchParams.get("orderId");
    const urlPhone = searchParams.get("phone") || "";
    if (urlOrderId) {
      setOrderIdInput(urlOrderId);
      setPhoneInput(urlPhone);
      setSearchQuery({ orderId: urlOrderId, phone: urlPhone });
    }
  }, [searchParams]);

  // Query order status from RTK Query
  const { data: response, error, isLoading, isFetching } = useTrackOrderQuery(
    searchQuery ? { orderId: searchQuery.orderId, phone: searchQuery.phone || undefined } : skipToken,
    { skip: !searchQuery }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;

    // Update URL query params
    const params = new URLSearchParams();
    params.set("orderId", orderIdInput.trim());
    if (phoneInput.trim()) {
      params.set("phone", phoneInput.trim());
    }
    router.replace(`/track-order?${params.toString()}`);

    setSearchQuery({
      orderId: orderIdInput.trim(),
      phone: phoneInput.trim(),
    });
  };

  const order = response?.data;

  // Determine active timeline steps
  const steps = [
    { label: "অর্ডার গৃহীত", desc: "Pending", status: "pending", icon: <Clock className="w-5 h-5" /> },
    { label: "প্রক্রিয়াকরণ", desc: "Processing", status: "processing", icon: <Package className="w-5 h-5" /> },
    { label: "শিপিং সম্পন্ন", desc: "Shipped", status: "shipped", icon: <Truck className="w-5 h-5" /> },
    { label: "ডেলিভারি সম্পন্ন", desc: "Delivered", status: "delivered", icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  const getStepIndex = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "pending") return 0;
    if (s === "processing") return 1;
    if (s === "shipped") return 2;
    if (s === "delivered") return 3;
    return -1;
  };

  const activeIndex = order ? getStepIndex(order.status) : -1;
  const isCancelled = order?.status?.toLowerCase() === "cancelled";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white">অর্ডার ট্র্যাক করুন (Track Order)</h1>
          <p className="text-sm text-slate-500 mt-1">আপনার অর্ডার আইডি ও ফোন নম্বর দিয়ে বর্তমান অবস্থান জানুন</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700/80 mb-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order ID *</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="ex: 6a3088da9c52dc0de368e76c"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm font-semibold text-slate-100"
              />
            </div>
          </div>

          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mobile Number (Required for guests)</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="ex: 017********"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm font-semibold text-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isFetching}
            className="md:col-span-2 w-full py-3.5 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg hover:shadow-primary-600/20 transition-all flex items-center justify-center gap-2"
          >
            {isLoading || isFetching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                ট্র্যাক করুন
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-sm font-medium flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>
              {((error as any)?.data?.message === "Unauthorized access to this order details" || (error as any)?.data?.message === "Phone number or authorization required to track this order")
                ? "অর্ডারটি দেখতে সঠিক মোবাইল নম্বরটি প্রদান করা আবশ্যক।"
                : "অর্ডারটি পাওয়া যায়নি। দয়া করে সঠিক অর্ডার আইডি প্রবেশ করান।"}
            </span>
          </div>
        )}
      </div>

      {/* Search results */}
      {order && (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Timeline and Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-6 mb-8">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">ORDER DETAIL</p>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  ID: <span className="font-mono text-primary-600 dark:text-primary-400">{order._id || order.id}</span>
                </h2>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(order.createdAt).toLocaleDateString("bn-BD")}</span>
                  <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> মোট: ৳{order.totalAmount}</span>
                </div>
              </div>

              <div>
                {isCancelled ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 border border-rose-100 dark:border-rose-800/30">
                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                    CANCELLED (বাতিল করা হয়েছে)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/30">
                    <CheckCircle2 className="w-4 h-4" />
                    STATUS: {order.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Timeline */}
            {!isCancelled && (
              <div className="relative">
                {/* Horizontal Desktop Line */}
                <div className="hidden md:block absolute left-8 right-8 top-5 h-1 bg-slate-100 dark:bg-slate-700 -z-0">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-700"
                    style={{ width: `${(activeIndex / 3) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= activeIndex;
                    const isCurrent = idx === activeIndex;

                    return (
                      <div key={idx} className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 group">
                        {/* Icon sphere */}
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-500 shrink-0 ${
                            isCompleted
                              ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/20"
                              : "bg-white dark:bg-slate-800 text-slate-300 dark:text-slate-600 border-slate-100 dark:border-slate-700"
                          } ${isCurrent ? "scale-110 ring-4 ring-primary-100 dark:ring-primary-950" : ""}`}
                        >
                          {step.icon}
                        </div>
                        {/* Labels */}
                        <div>
                          <p className={`font-bold text-sm transition-colors ${isCompleted ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                            {step.label}
                          </p>
                          <p className={`text-xs mt-0.5 ${isCurrent ? "text-primary-600 dark:text-primary-400 font-bold" : "text-slate-400"}`}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Details split grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Products items card */}
            <div className="md:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/80 space-y-4">
              <h3 className="font-bold text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">ক্রয়কৃত প্রোডাক্টসমূহ</h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {order.items.map((item: any) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shrink-0 relative">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs font-bold">খেলনা</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-slate-400 mt-1">৳{item.price} x {item.quantity}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm text-slate-900 dark:text-white">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer shipping summary card */}
            <div className="md:col-span-5 space-y-6">
              {/* Delivery info */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/80 space-y-4">
                <h3 className="font-bold text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">শিপিং বিবরণ</h3>
                <div className="space-y-3.5 text-sm">
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{order.fullName || "Customer Name"}</p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{order.shippingAddress}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center border-t border-slate-50 dark:border-slate-800 pt-3">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{order.shippingPhone}</span>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700/80 space-y-4">
                <h3 className="font-bold text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">পেমেন্ট সারসংক্ষেপ</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>সাবটোটাল</span>
                    <span className="font-bold text-slate-800 dark:text-white">৳{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>ডেলিভারি চার্জ</span>
                    <span className="font-bold text-slate-800 dark:text-white">৳{order.deliveryFee}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-500 font-semibold">
                      <span>ডিসকাউন্ট</span>
                      <span>-৳{order.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-3 font-bold">
                    <span className="text-slate-900 dark:text-white">মোট মূল্য</span>
                    <span className="text-primary-600 dark:text-primary-400 text-base">৳{order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2 items-center bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 mt-2">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span>পেমেন্ট মাধ্যম: <b className="text-slate-800 dark:text-slate-200">{order.paymentMethod === 'stripe' ? 'Online Card' : 'Cash On Delivery'}</b></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Magna-Tiles 100-Piece", price: 119.99, qty: 1, img: "bg-indigo-100" },
    { id: 2, name: "Dinosaur STEM Kit", price: 34.99, qty: 2, img: "bg-emerald-100" }
  ]);

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added any toys yet. Explore our shop to find something amazing!</p>
            <Link href="/shop" className="inline-flex px-8 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-md hover:bg-primary-700 transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-6">
                  <div className={`w-32 h-32 rounded-2xl ${item.img} flex-shrink-0`}></div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.name}</h3>
                    <p className="text-primary-600 font-bold mb-4">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      {/* Qty Controls */}
                      <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                        <button onClick={() => updateQty(item.id, -1)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"><Minus className="w-4 h-4 text-slate-600 dark:text-slate-400" /></button>
                        <span className="w-8 flex justify-center font-bold font-mono text-slate-900 dark:text-white">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-md transition-colors"><Plus className="w-4 h-4 text-slate-600 dark:text-slate-400" /></button>
                      </div>
                      
                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-2 flex items-center gap-1 text-sm font-medium">
                        <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-slate-100 dark:border-slate-700 pt-4 sm:pt-0">
                    <p className="text-slate-500 text-sm mb-1">Total</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 dark:border-slate-700 sticky top-24">
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-medium text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {shipping === 0 ? <span className="text-emerald-500 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-700 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                    <span className="text-3xl font-black text-primary-600 dark:text-primary-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-lg">
                    Checkout <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" /> PayPal
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure SSL Encrypted Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

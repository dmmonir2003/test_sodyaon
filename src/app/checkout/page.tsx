"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ShieldCheck,
  ChevronDown,
  Lock,
  User,
  Phone,
  MessageSquare
} from "lucide-react";
import { SEMANTIC_COLORS } from "@/config/colors";
import CustomSelect from "@/components/shared/CustomSelect";

// --- Mock Data ---
const MOCK_CART_ITEMS = [
  {
    id: "1",
    name: "Deshi Mustard Oil 5 liter",
    price: 1550,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  }
];

export default function CheckoutPage() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [useSameAddress, setUseSameAddress] = useState(true);

  // Address states
  const [shippingDistrict, setShippingDistrict] = useState("");
  const [shippingThana, setShippingThana] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingDistrict, setBillingDistrict] = useState("");
  const [billingThana, setBillingThana] = useState("");

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCost = 0;
  const total = subtotal + deliveryCost;

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-900 min-h-screen">
      {/* Header / Breadcrumbs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">Checkout</h1>
          <nav className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm font-medium text-slate-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-secondary-500">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Login Promotion Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 mb-6 md:mb-10 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center shrink-0">
              <User className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            </div>
            <p className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-300">
              Have any account? please login or register
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 md:px-8 py-2 md:py-2.5 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm">
              Login
            </button>
            <button className="flex-1 md:flex-none px-6 md:px-8 py-2 md:py-2.5 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 shadow-md transition-colors text-sm">
              Register
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Review and Addresses */}
          <div className="lg:col-span-12 xl:col-span-8 space-y-6 md:space-y-10">
            
            {/* Order Review Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Order review</h2>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 md:p-6 flex items-center gap-4 md:gap-6 relative group">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate mb-1">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 md:gap-6">
                          <div className="flex items-center bg-slate-50 dark:bg-slate-900 rounded-lg p-1 border border-slate-100 dark:border-slate-800">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded transition-colors text-slate-500"
                            >
                              <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                            <span className="w-6 md:w-8 text-center text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded transition-colors text-slate-500"
                            >
                              <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                          </div>
                          <span className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                             ৳{item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors bg-white dark:bg-slate-800 rounded-lg shadow-sm"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Shipping Address Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Shipping Address</h2>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="col-span-1">
                    <input 
                      type="text" 
                      placeholder="Your Full Name *" 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="flex">
                      <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-r-0 rounded-l-xl text-sm font-bold text-slate-600 dark:text-slate-400">
                        88
                      </div>
                      <input 
                        type="text" 
                        placeholder="01*********" 
                        className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-r-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <CustomSelect 
                      value={shippingDistrict}
                      onChange={setShippingDistrict}
                      placeholder="Select District"
                      options={[
                        { value: "dhaka", label: "Dhaka" },
                        { value: "chattogram", label: "Chattogram" }
                      ]}
                    />
                  </div>
                  <div className="col-span-1">
                    <CustomSelect 
                      value={shippingThana}
                      onChange={setShippingThana}
                      placeholder="Select Thana (Optional)"
                      options={[
                        { value: "mirpur", label: "Mirpur" },
                        { value: "gulshan", label: "Gulshan" }
                      ]}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input 
                      type="text" 
                      placeholder="ex: House no. / building / street / area" 
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Billing Address Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Billing Address</h2>
                </div>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div 
                    onClick={() => setUseSameAddress(!useSameAddress)}
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${useSameAddress ? 'bg-primary-600 text-white' : 'border-2 border-slate-300 group-hover:border-primary-500'}`}
                  >
                    {useSameAddress && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </label>
              </div>
              
              {!useSameAddress && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="col-span-1">
                      <input 
                        type="text" 
                        placeholder="Your Full Name *" 
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="flex">
                        <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-r-0 rounded-l-xl text-sm font-bold text-slate-600 dark:text-slate-400">
                          88
                        </div>
                        <input 
                          type="text" 
                          placeholder="01*********" 
                          className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-r-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <CustomSelect 
                        value={billingCountry}
                        onChange={setBillingCountry}
                        placeholder="Select Country"
                        options={[
                          { value: "bangladesh", label: "Bangladesh" }
                        ]}
                      />
                    </div>
                    <div className="col-span-1">
                      <CustomSelect 
                        value={billingDistrict}
                        onChange={setBillingDistrict}
                        placeholder="Select District"
                        options={[
                          { value: "dhaka", label: "Dhaka" },
                          { value: "chattogram", label: "Chattogram" }
                        ]}
                      />
                    </div>
                    <div className="col-span-1">
                      <CustomSelect 
                        value={billingThana}
                        onChange={setBillingThana}
                        placeholder="Select Thana (Optional)"
                        options={[
                          { value: "mirpur", label: "Mirpur" },
                          { value: "gulshan", label: "Gulshan" }
                        ]}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <input 
                        type="text" 
                        placeholder="ex: House no. / building / street / area" 
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Payment & Summary */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-6 md:space-y-10">
            
            {/* Payment Method Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Payment method</h2>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-3">
                
                {/* COD Option */}
                <div 
                  onClick={() => setPaymentMethod("cod")}
                  className={`relative flex items-center p-3 md:p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === "cod" ? 'border-primary-600 bg-primary-50/30' : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center p-2 mr-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <Truck className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-sm font-bold text-slate-800 dark:text-white">Cash On Delivery</p>
                  </div>
                  {paymentMethod === "cod" && (
                     <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-primary-600 text-white rounded-full">
                       <CheckCircle2 className="w-3.5 h-3.5" />
                     </div>
                  )}
                </div>

                {/* Online Payment Option */}
                <div 
                  onClick={() => setPaymentMethod("online")}
                  className={`relative flex items-center p-3 md:p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === "online" ? 'border-primary-600 bg-primary-50/30' : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center p-2 mr-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-sm font-bold text-slate-800 dark:text-white">Online Payment</p>
                  </div>
                </div>

                {/* Bkash Option */}
                <div 
                  onClick={() => setPaymentMethod("bkash")}
                  className={`relative flex items-center p-3 md:p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === "bkash" ? 'border-primary-600 bg-primary-50/30' : 'border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
                >
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-[#e2136e]/10 rounded-lg flex items-center justify-center p-2 mr-4 border border-[#e2136e]/20 shadow-sm overflow-hidden text-[#e2136e] font-black text-xs">
                    Bkash
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-sm font-bold text-slate-800 dark:text-white">Bkash</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Coupon / Voucher Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
               <button className="w-full flex items-center justify-between p-4 md:p-5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                 <span>Have any coupon or gift voucher?</span>
                 <ChevronDown className="w-4 h-4" />
               </button>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-8 shadow-md border border-slate-100 dark:border-slate-700 space-y-4">
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-slate-500 py-1">Sub total</span>
                <span className="font-bold text-slate-800 dark:text-white">{subtotal.toLocaleString()} BDT</span>
              </div>
              <div className="flex justify-between text-sm md:text-base border-b border-slate-100 dark:border-slate-700 pb-4">
                <span className="text-slate-500 py-1">Delivery cost</span>
                <span className="font-bold text-slate-800 dark:text-white">{deliveryCost} BDT</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-black text-slate-800 dark:text-white">Total</span>
                <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{total.toLocaleString()}BDT</span>
              </div>

              {/* Special Notes */}
              <div className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-primary-600 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Special notes <span className="text-slate-400 font-normal">(Optional)</span></h3>
                </div>
                <textarea 
                  className="w-full h-24 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm resize-none"
                  placeholder="Insert notes here..."
                />
              </div>

              {/* Terms Condition Checkbox */}
              <div className="pt-4 pb-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 border-primary-600 bg-white flex items-center justify-center transition-all group-hover:bg-primary-50">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-[11px] md:text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    I have read and agree to the <span className="text-primary-600 font-bold hover:underline cursor-pointer">Terms and Conditions</span>, <span className="text-primary-600 font-bold hover:underline cursor-pointer">Privacy Policy</span> & <span className="text-primary-600 font-bold hover:underline cursor-pointer">Refund and Return Policy</span>.
                  </span>
                </label>
              </div>

              {/* Place Order Button (Desktop) */}
              <button 
                className="hidden lg:flex w-full py-4 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-black text-lg rounded-xl shadow-lg transition-all items-center justify-center gap-2 transform active:scale-[0.98] mt-4"
              >
                PLACE ORDER
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col items-center justify-center gap-4 text-center pb-10">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                 <ShieldCheck className="w-4 h-4" />
                 100% SECURE CHECKOUT
               </div>
               <div className="flex flex-wrap justify-center gap-3 opacity-60">
                 {/* Placeholders for payment icons as seen in footer */}
                 <div className="w-8 h-5 bg-slate-200 rounded"></div>
                 <div className="w-8 h-5 bg-slate-200 rounded"></div>
                 <div className="w-8 h-5 bg-slate-200 rounded"></div>
                 <div className="w-8 h-5 bg-slate-200 rounded"></div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Chat/Help as seen in image */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none">
         <div className="pointer-events-auto flex items-center gap-3 group">
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-xl border border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 transform transition-all group-hover:-translate-x-1">
               👉 Chat with us
            </div>
            <button className="w-14 h-14 bg-primary-600 text-white rounded-2xl shadow-2xl flex items-center justify-center transform transition-all hover:scale-110 active:scale-95 shadow-primary-600/40">
               <MessageSquare className="w-7 h-7" />
            </button>
         </div>
      </div>

      {/* MOBILE STICKY PLACE ORDER BUTTON */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 pb-safe shadow-[0_-10px_25px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
             <span className="text-slate-500 text-sm font-medium">Total Payable</span>
             <span className="text-xl font-black text-slate-900 dark:text-white">{total.toLocaleString()} BDT</span>
          </div>
          <button 
            className="w-full py-4 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-black text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

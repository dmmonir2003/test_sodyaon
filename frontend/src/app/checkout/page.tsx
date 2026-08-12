"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/user/cart/cartSlice";
import { useCreateOrderMutation } from "@/store/user/orders/ordersApi";
import { trackClientInitiateCheckout } from "@/utils/marketing";
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
  MessageSquare,
  ArrowRight,
  Gift,
  ArrowLeftRight,
  Baby,
  BrainCircuit,
  ScanFace,
  Sparkles,
  ShoppingBag,
  Heart
} from "lucide-react";
import CustomSelect from "@/components/shared/CustomSelect";
import { setCredentials } from "@/store/user/profile/profileSlice";

const AI_TOOLS = [
  {
    id: 1,
    title1: "এআই দ্বারা",
    title2: "উপহার খুঁজুন",
    subtitle: "যেকোনো বয়সের বাচ্চার জন্য নিখুঁত উপহার খুঁজে বের করুন আমাদের এআই-এর সাথে।",
    linkText: "গিফট ফাইন্ডার",
    href: "/ai-tools/gift-finder",
    icon: <Gift className="w-8 h-8 text-rose-500" />,
    mobileIcon: <Gift className="w-6 h-6 text-rose-500" />
  },
  {
    id: 2,
    title1: "এআই প্রডাক্ট",
    title2: "তুলনামূলক বিশ্লেষণ",
    subtitle: "একাধিক খেলনা বা পণ্যের মধ্যে তুলনা করে সেরাটি বেছে নিন।",
    linkText: "প্রডাক্ট কম্পেয়ার",
    href: "/ai-tools/compare",
    icon: <ArrowLeftRight className="w-8 h-8 text-sky-500" />,
    mobileIcon: <ArrowLeftRight className="w-6 h-6 text-sky-500" />
  },
  {
    id: 3,
    title1: "স্মার্ট এআই",
    title2: "প্যারেন্টিং অ্যাসিস্ট্যান্ট",
    subtitle: "সন্তান লালন-পালনের যেকোনো প্রশ্নের উত্তর জানুন আমাদের এআই চ্যাটবট থেকে।",
    linkText: "অ্যাসিস্ট্যান্ট",
    href: "/ai-tools/parenting-assistant",
    icon: <Baby className="w-8 h-8 text-amber-500" />,
    mobileIcon: <Baby className="w-6 h-6 text-amber-500" />
  }
];

export default function CheckoutPage() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.profile.isAuthenticated);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [currentTool, setCurrentTool] = useState(0);

  // Load items from Redux cart
  const [items, setItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [useSameAddress, setUseSameAddress] = useState(true);

  // Form input states
  const [fullName, setFullName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddressDetail, setShippingAddressDetail] = useState("");
  const [shippingDistrict, setShippingDistrict] = useState("dhaka");
  const [shippingThana, setShippingThana] = useState("");

  const [billingName, setBillingName] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingCountry, setBillingCountry] = useState("bangladesh");
  const [billingDistrict, setBillingDistrict] = useState("dhaka");
  const [billingThana, setBillingThana] = useState("");
  const [billingAddressDetail, setBillingAddressDetail] = useState("");

  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [billingPhoneError, setBillingPhoneError] = useState("");
  const [orderSuccessData, setOrderSuccessData] = useState<any | null>(null);

  const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

  // Sync Redux cart items to local state
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  // AI tools carousel
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      setCurrentTool((prev) => (prev + 1) % AI_TOOLS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCost = items.length > 0 ? 60 : 0;
  const total = subtotal + deliveryCost;

  // Trigger initiate checkout client pixel event on mount when cart is populated
  useEffect(() => {
    if (items.length > 0) {
      const checkoutEventId = `initiate_checkout_${Date.now()}`;
      trackClientInitiateCheckout(
        items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        checkoutEventId
      );
    }
  }, [items.length]);

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

  // Automated QA Seeder Helper to place orders instantly
  const loadDemoOrderData = () => {
    // If cart is empty, add a valid product
    if (items.length === 0) {
      setItems([
        {
          id: "101",
          name: "Magna-Tiles 100-Piece Clear Colors Magnetic Building Set",
          price: 2600,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
        }
      ]);
    }
    setFullName("পরীক্ষামূলক ক্রেতা");
    setShippingPhone("01755667788");
    setShippingAddressDetail("রোড ১০, ব্লক সি, গুলশান, ঢাকা");
    setShippingDistrict("dhaka");
    setShippingThana("gulshan");
  };

  const handlePlaceOrder = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("আপনার কার্ট খালি রয়েছে! দয়া করে কার্টে পণ্য যোগ করুন।");
      return;
    }

    if (!fullName.trim() || !shippingPhone.trim() || !shippingAddressDetail.trim()) {
      setErrorMessage("দয়া করে নাম, সচল মোবাইল নম্বর এবং ডেলিভারির ঠিকানা সঠিকভাবে লিখুন।");
      return;
    }

    const isValidBDPhoneNumber = (phone: string) => {
      const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
      if (!bdPhoneRegex.test(phone)) return false;
      
      const last8 = phone.slice(-8);
      // Block exactly repeated digits (e.g. 00000000, 11111111)
      if (/^(\d)\1{7}$/.test(last8)) return false;
      // Block common sequential patterns
      if (['12345678', '87654321', '01234567', '98765432', '23456789'].includes(last8)) return false;
      
      return true;
    };

    const phoneStr = shippingPhone.trim();
    if (!isValidBDPhoneNumber(phoneStr)) {
      setPhoneError("দয়া করে একটি সঠিক ও সচল বাংলাদেশি মোবাইল নম্বর দিন।");
      return;
    } else {
      setPhoneError("");
    }

    if (!useSameAddress && billingPhone.trim() && !isValidBDPhoneNumber(billingPhone.trim())) {
      setBillingPhoneError("দয়া করে বিলিং এড্রেসের জন্য একটি সঠিক ও সচল মোবাইল নম্বর দিন।");
      return;
    } else {
      setBillingPhoneError("");
    }

    // Format full shipping address
    const fullAddress = `${shippingAddressDetail}, Thana: ${shippingThana || "N/A"}, District: ${shippingDistrict}`;

    try {
      const payload = {
        items: items.map(i => ({
          id: i.id,
          quantity: i.quantity,
          name: i.name,
          price: i.price
        })),
        paymentMethod,
        shippingAddress: fullAddress,
        shippingPhone,
        fullName,
        couponCode: "",
        notes: notes.trim(),
      };

      const res = await createOrder(payload).unwrap();
      
      // Auto-registration logic
      let autoCreated = false;
      if (res.data?.autoLoginToken && res.data?.autoCreatedUser) {
        dispatch(setCredentials({
          user: res.data.autoCreatedUser,
          token: res.data.autoLoginToken
        }));
        autoCreated = true;
      }
      
      // Save order metadata for confirmation screen
      setOrderSuccessData({
        orderId: res.data?.orderId || res.data?.order?._id || res.data?._id || `SDY-${Math.floor(100000 + Math.random() * 900000)}`,
        totalPrice: total,
        fullName,
        shippingPhone,
        address: fullAddress,
        items: [...items],
        autoCreated
      });

      // Clear Redux shopping cart
      dispatch(clearCart());
      
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.data?.message || "অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    }
  };

  // If order was successfully created, render premium confirmation layout
  if (orderSuccessData) {
    return (
      <div className="bg-[#f8fafc] dark:bg-slate-900 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl w-full text-center border border-slate-100 dark:border-slate-700 shadow-2xl animate-in zoom-in-95 duration-500 space-y-6">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black font-heading text-slate-900 dark:text-white">ধন্যবাদ! আপনার অর্ডারটি গৃহীত হয়েছে!</h1>
            <p className="text-slate-400 text-sm font-semibold">অর্ডার আইডি: <span className="text-primary-600 font-mono font-bold">{orderSuccessData.orderId}</span></p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl text-left border border-slate-100 dark:border-slate-800/80 font-sans space-y-3">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">অর্ডার সারসংক্ষেপ:</h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
              {orderSuccessData.items.map((item: any) => (
                <div key={item.id} className="py-2.5 flex justify-between">
                  <span className="text-slate-500">{item.name} <b className="text-slate-700">x{item.quantity}</b></span>
                  <span className="font-bold text-slate-900 dark:text-white">৳{(item.price * item.quantity).toLocaleString()} BDT</span>
                </div>
              ))}
              <div className="py-3 flex justify-between font-bold text-base text-primary-600">
                <span>সর্বমোট পরিশোধযোগ্য মূল্য:</span>
                <span>৳{orderSuccessData.totalPrice.toLocaleString()} BDT</span>
              </div>
            </div>
          </div>
          
          {orderSuccessData.autoCreated && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-4 rounded-xl text-left animate-in fade-in zoom-in duration-500 delay-150">
              <p className="text-indigo-800 dark:text-indigo-300 font-medium text-sm leading-relaxed">
                <strong className="text-indigo-900 dark:text-indigo-100">🎉 Good news!</strong> We have automatically created an account for you using your shipping phone number. You can use it to track this order and manage future purchases!
                <br/><br/>
                Your Login Phone: <strong className="text-indigo-900 dark:text-indigo-100">{orderSuccessData.shippingPhone}</strong><br/>
                Your Password: <strong className="text-indigo-900 dark:text-indigo-100 font-mono text-base">123456</strong>
              </p>
              <button 
                onClick={() => router.push('/profile')} 
                className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
            >
              হোমে ফিরে যান
            </button>
            <button
              onClick={() => router.push("/shop")}
              className="px-8 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold rounded-xl transition-colors"
            >
              আরো খেলনা খুঁজুন
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        
        {/* Verification Helper Notification Banner for QA testing */}
        <div className="mb-6 p-4 rounded-xl border bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 font-sans text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="font-bold">🧪 QA Checkout Verification Assistant:</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">অর্ডার প্লেস করে ফেসবুক CAPI এবং টিকটক ইভেন্ট ট্রিগারিং দ্রুত পরীক্ষা করতে এই ডেমো ফিল বাটন ব্যবহার করুন।</p>
          </div>
          <button
            type="button"
            onClick={loadDemoOrderData}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs transition-colors shrink-0"
          >
            Quick Auto-Fill Test Data
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl border bg-red-500/10 border-red-500/20 text-red-500 font-sans text-sm">
            {errorMessage}
          </div>
        )}

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
                {items.length === 0 ? (
                  <div className="p-8 text-center space-y-4">
                    <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
                    <p className="text-slate-400 text-sm font-sans">আপনার কার্টে বর্তমানে কোনো খেলনা নেই।</p>
                    <Link href="/shop" className="inline-block bg-primary-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-primary-500 transition-colors">
                      খেলনা কিনুন
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {items.map((item) => (
                      <div key={item.id} className="p-4 md:p-6 flex items-center gap-4 md:gap-6 relative group">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800 relative">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">খেলনা</div>
                          )}
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
                               ৳{(item.price * item.quantity).toLocaleString()}
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
                )}
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
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm text-slate-100"
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
                        value={shippingPhone}
                        onChange={(e) => {
                          setShippingPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        className={`flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-primary-600 focus:ring-primary-600/20'} rounded-r-xl focus:ring-2 outline-none transition-all text-sm text-slate-100`}
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-[11px] md:text-xs mt-1.5 font-medium ml-1">{phoneError}</p>}
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
                      value={shippingAddressDetail}
                      onChange={(e) => setShippingAddressDetail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm text-slate-100"
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
                <button
                  type="button"
                  onClick={() => setUseSameAddress(!useSameAddress)}
                  className="flex items-center gap-2 cursor-pointer group text-xs text-primary-500 font-semibold"
                >
                  <div 
                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${useSameAddress ? 'bg-primary-600 text-white' : 'border-2 border-slate-300'}`}
                  >
                    {useSameAddress && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  Same as shipping address
                </button>
              </div>
              
              {!useSameAddress && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="col-span-1">
                      <input 
                        type="text" 
                        placeholder="Your Full Name *" 
                        value={billingName}
                        onChange={(e) => setBillingName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm text-slate-100"
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
                          value={billingPhone}
                          onChange={(e) => {
                            setBillingPhone(e.target.value);
                            if (billingPhoneError) setBillingPhoneError("");
                          }}
                          className={`flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${billingPhoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:border-primary-600 focus:ring-primary-600/20'} rounded-r-xl focus:ring-2 outline-none transition-all text-sm text-slate-100`}
                        />
                      </div>
                      {billingPhoneError && <p className="text-red-500 text-[11px] md:text-xs mt-1.5 font-medium ml-1">{billingPhoneError}</p>}
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
                        value={billingAddressDetail}
                        onChange={(e) => setBillingAddressDetail(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm text-slate-100"
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
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center p-2 mr-4 border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse-slow">
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
                  {paymentMethod === "online" && (
                     <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-primary-600 text-white rounded-full">
                       <CheckCircle2 className="w-3.5 h-3.5" />
                     </div>
                  )}
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
                  {paymentMethod === "bkash" && (
                     <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-primary-600 text-white rounded-full">
                       <CheckCircle2 className="w-3.5 h-3.5" />
                     </div>
                  )}
                </div>
              </div>
            </section>

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
                <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{total.toLocaleString()} BDT</span>
              </div>

              {/* Special Notes */}
              <div className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-primary-600 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Special notes <span className="text-slate-400 font-normal">(Optional)</span></h3>
                </div>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-24 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 outline-none transition-all text-sm resize-none text-slate-100"
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
                type="button"
                onClick={() => handlePlaceOrder()}
                disabled={isPlacingOrder}
                className="hidden lg:flex w-full py-4 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-black text-lg rounded-xl shadow-lg transition-all items-center justify-center gap-2 transform active:scale-[0.98] mt-4"
              >
                {isPlacingOrder ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : "PLACE ORDER"}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col items-center justify-center gap-4 text-center pb-10">
               <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                 <ShieldCheck className="w-4 h-4" />
                 100% SECURE CHECKOUT
               </div>
               <div className="flex flex-wrap justify-center gap-3 opacity-60">
                 <div className="w-8 h-5 bg-slate-200 rounded"></div>
                 <div className="w-8 h-5 bg-slate-200 rounded"></div>
                 <div className="w-8 h-5 bg-slate-200 rounded"></div>
                 <div className="w-8 h-5 bg-slate-200 rounded"></div>
               </div>
            </div>

          </div>
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
            type="button"
            onClick={() => handlePlaceOrder()}
            disabled={isPlacingOrder}
            className="w-full py-4 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white font-black text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
          >
            {isPlacingOrder ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </div>
  );
}

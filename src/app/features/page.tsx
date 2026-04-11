import { Metadata } from "next";
import { ShieldCheck, Truck, Sparkles, Brain, Leaf, HeartHandshake, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PlayTime এর বৈಶಿষ্ট্যসমূহ | আমাদের বিশেষ ফিচার",
  description: "অনলাইনে বাচ্চাদের নিরাপদ, স্মার্ট এবং দ্রুততম খেলনা কেনার গন্তব্য PlayTime এ কি কি আছে তা আবিষ্কার করুন। এআই-চালিত შপার মাধ্যমে কেনাকাটার অভিজ্ঞতা উপভোগ করুন।",
};

export default function FeaturesPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-32">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-32 overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-400/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary-400/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold text-sm mb-6 border border-primary-200 dark:border-primary-800">
            <Sparkles className="w-4 h-4" /> প্লেটাইমের ভিন্নতা
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight text-slate-900 dark:text-white mb-8">
            শুধু একটি খেলনার দোকান নয়।<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">আমরা আনন্দ তৈরি করি।</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
            আমরা পুরোপুরি নতুনভাবে সাজিয়েছি বাবা-মায়েদের খেলনা কেনার অভিজ্ঞতা। আমাদের এআই-চালিত রিকমেন্ডেশন থেকে শুরু করে আমাদের কঠোর ৩-ধাপের মান নিয়ন্ত্রণ প্রক্রিয়া, সবকিছুই তৈরি করা হয়েছে নিখুঁত খেলার সময়ের জন্য।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto text-lg">
              স্টোরটি এক্সপ্লোর করুন
            </Link>
            <Link href="#ai-tools" className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 font-bold rounded-2xl shadow-sm transition-all w-full sm:w-auto text-lg flex items-center justify-center gap-2">
              ফিচারসমূহ দেখুন <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* --- CORE PILLARS BENTO GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-40px] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-xl border border-slate-100 dark:border-slate-700 transform hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black font-heading text-slate-900 dark:text-white mb-4">টক্সিক-মুক্ত গ্যারান্টি</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              আমাদের ক্যাটালগের প্রতিটি পণ্য কঠোর থার্ড-পার্টি সেফটি স্ক্রিনিং পাস করে। কোনো সীসা বা বিপিএ নেই, শুধু নিরাপদ মজার নিশ্চয়তা।
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-xl border border-slate-100 dark:border-slate-700 transform hover:-translate-y-2 transition-all duration-500 md:-translate-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mb-6 shadow-inner">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black font-heading text-slate-900 dark:text-white mb-4">মনোবিজ্ঞানী দ্বারা অনুমোদিত</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              আমাদের শিক্ষামূলক কালেকশনগুলো চাইল্ড সাইকোলজিস্ট দ্বারা যাচাইকৃত, যাতে তা বাস্তবিক অর্থে বাচ্চাদের বিকাশ ও মোটর স্কিল বাড়াতে সাহায্য করে।
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-xl border border-slate-100 dark:border-slate-700 transform hover:-translate-y-2 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 shadow-inner">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black font-heading text-slate-900 dark:text-white mb-4">বিদ্যুৎ গতির ডেলিভারি</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              জন্মদিনের উপহারের কথা ভুলে গেছেন? বড় বড় শহরগুলোতে আমাদের নেক্সট-ডে ফাস্ট ডেলিভারি আপনাকে সাহায্য করবে যেকোনো মূহুর্তে।
            </p>
          </div>

        </div>
      </div>

      {/* --- FEATURE SHOWCASE: AI TOOLS --- */}
      <div id="ai-tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-8 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 border-[12px] border-slate-800">
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
            <span className="text-secondary-400 font-bold uppercase tracking-widest text-sm mb-4 block">অত্যাধুনিক প্রযুক্তি</span>
            <h2 className="text-4xl md:text-6xl font-black font-heading text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-primary-400">জেনারেটিভ এআই</span> চালিত
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              আমাদের এআই টুলস প্যারেন্টিং এবং উপহার দেওয়া কে করেছে একদম সহজ। আমরা বাচ্চাদের মানসিক বিকাশের স্তর বিশ্লেষণ করে নিখুঁত খেলনার রিকমেন্ডেশন দেই।
            </p>
            
            <ul className="space-y-6 text-left max-w-md mx-auto lg:mx-0">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary-500/20 text-secondary-400 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">এআই গিফট ফাইন্ডার</h4>
                  <p className="text-slate-400">কয়েক মিলি-সেকেন্ডে শিশুর বয়স, লিঙ্গ এবং আগ্রহ অনুযায়ী খেলনা খুঁজে দেয় নিখুঁতভাবে।</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary-500/20 text-secondary-400 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">প্যারেন্টিং অ্যাসিস্ট্যান্ট</h4>
                  <p className="text-slate-400">বাচ্চাদের বিকাশ সংক্রান্ত যেকোনো প্রশ্নের উত্তর এবং এক্টিভিটির আইডিয়া দিতে আমাদের চ্যাটবট সবসময় প্রস্তুত।</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary-500/20 text-secondary-400 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">স্মার্ট তুলনা</h4>
                  <p className="text-slate-400">যেকোনো দুটি খেলনার শিক্ষাগত মান ও দীর্ঘস্থায়িত্বের তুলনামূলক বিশ্লেষণ তাত্ক্ষণিকভাবে তৈরি করে দেয়।</p>
                </div>
              </li>
            </ul>

            <div className="mt-12">
              <Link href="/ai-tools/gift-finder" className="inline-flex px-8 py-4 bg-secondary-500 hover:bg-secondary-400 text-slate-900 font-bold rounded-2xl transition-colors items-center gap-3">
                এআই গিফট ফাইন্ডার ব্যবহার করুন <Zap className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative z-10">
             <div className="relative aspect-square w-full max-w-md mx-auto">
               <div className="absolute inset-0 bg-gradient-to-tr from-secondary-500/20 to-primary-500/20 rounded-full animate-spin-slow blur-3xl"></div>
               <div className="absolute top-10 right-10 w-64 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                 <div className="w-12 h-12 rounded-full bg-secondary-400 mb-4 flex items-center justify-center">
                   <Brain className="w-6 h-6 text-slate-900" />
                 </div>
                 <div className="h-4 w-3/4 bg-white/30 rounded-full mb-3"></div>
                 <div className="h-4 w-1/2 bg-white/30 rounded-full mb-6"></div>
                 <div className="h-10 w-full bg-secondary-400/20 border border-secondary-400/50 rounded-xl flex items-center justify-center text-xs font-bold text-white">১০০% ম্যাচ</div>
               </div>

               <div className="absolute bottom-20 left-0 w-72 p-6 bg-slate-800/80 backdrop-blur-xl border border-slate-600 rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-20">
                 <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <Sparkles className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">বিকাশের মাইলফলক</h4>
                      <p className="text-xs text-slate-300">বাচ্চাদের মোটর স্কিল বৃদ্ধির উপযোগী খেলনা।</p>
                    </div>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>

      {/* --- SUSTAINABILITY & COMMUNITY --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-6">কেনাকাটার গণ্ডি ছাড়িয়ে</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">আমরা বিশ্বাস করি, ব্যবসায় একটি মানবিক দিক থাকতে হয়। নিচে কিছু উদ্যোগ তুলে ধরা হলো।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 lg:p-12 border border-slate-100 dark:border-slate-700 shadow-md">
            <div className="w-16 h-16 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center mb-8">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black font-heading text-slate-900 dark:text-white mb-4">কার্বন নিউট্রাল শিপিং</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              পরিবেশের ভারসাম্য রক্ষায় আমরা কাজ করি। আমাদের প্যাকেজিং এর ৯০ ভাগই পুনর্ব্যবহারযোগ্য বর্জ্য পদার্থ দিয়ে তৈরি এবং আমরা সিঙ্গেল-ইউজ প্লাস্টিক পুরোপুরি বর্জন করেছি।
            </p>
            <button className="font-bold text-primary-600 hover:text-primary-700 flex items-center gap-2">আমাদের ইকো-রিপোর্ট পড়ুন <ArrowRight className="w-4 h-4" /></button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 lg:p-12 border border-slate-100 dark:border-slate-700 shadow-md">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-8">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black font-heading text-slate-900 dark:text-white mb-4">'ওয়ান-ফর-ওয়ান' প্রোগ্রাম</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              প্লেটাইম থেকে কেনা প্রতি ১০টি খেলনার জন্য, আমরা সুবিধাবঞ্চিত শিশুদের এতিমখানা এবং হাসপাতালে একটি করে শিক্ষামূলক খেলনা দান করি। আপনার কেনাকাটা সরাসরি শিশুদের মুখে হাসি ফোটায়।
            </p>
            <button className="font-bold text-primary-600 hover:text-primary-700 flex items-center gap-2">আমাদের চ্যারিটি সম্পর্কে জানুন <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

    </div>
  );
}

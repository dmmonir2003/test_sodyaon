import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Sparkles, Send, User } from "lucide-react";

export const metadata: Metadata = {
  title: "ব্লগ এবং প্লে আইডিয়াস | প্লেটাইম এডুকেশনাল ইনসাইটস",
  description: "আপনার সন্তানের মেধা ও দক্ষতা বিকাশে সাহায্য করার জন্য চাইল্ড ডেভেলপমেন্ট, ক্রিয়েটিভ প্লে আইডিয়াস এবং খেলনার নির্দেশিকা নিয়ে বিশেষজ্ঞদের লেখা আর্টিকেল পড়ুন।",
};

const CATEGORIES = ["সব", "বিকাশের মাইলফলক", "ডিআইওয়াই ও ক্র্যাফটস", "খেলনা গাইড", "বিশেষজ্ঞ সাক্ষাৎকার"];

const FEATURED_POST = {
  id: "featured-1",
  title: "ওপেন-এন্ডেড প্লে গাইড: কেন সহজ খেলনা বেশি উপকারী",
  excerpt: "কেন সাধারণ খেলনা আপনার সন্তানকে বেশি শিখতে সাহায্য করে তা জানুন। আমরা ওপেন-এন্ডেড খেলার মনস্তত্ত্ব এবং কীভাবে যেকোনো বয়সে এটিকে উৎসাহিত করা যায় তা ব্যাখ্যা করেছি।",
  category: "বিকাশের মাইলফলক",
  author: "ডা. সারাহ জেনকিন্স",
  date: "অক্টোবর ২৪, ২০২৬",
  readTime: "৮ মিনিট",
  image: "bg-[url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')]", 
};

const POSTS = [
  {
    id: 1,
    title: "ঘরের নিত্য প্রয়োজনীয় জিনিস দিয়ে ১০টি সেন্সরি অ্যাক্টিভিটি",
    excerpt: "আপনার বাচ্চার সেন্সরি ডেভেলপমেন্টের জন্য দামি গিয়ার দরকার নেই। এখানে ১০টি দুর্দান্ত অ্যাক্টিভিটির ধারণা দেওয়া হলো।",
    category: "ডিআইওয়াই ও ক্র্যাফটস",
    author: "এমা রিচার্ডস",
    date: "অক্টোবর ১৮, ২০২৬",
    readTime: "৫ মিনিট",
    imgClass: "bg-teal-100"
  },
  {
    id: 2,
    title: "৭ বছর বয়সীদের জন্য সঠিক স্টেম খেলনা কীভাবে বেছে নেবেন",
    excerpt: "কোডিং রোবট এবং সার্কিট্রি কিটগুলির জগতটি বেশ বড়। আপনার পরবর্তী খেলনা কিনতে আমাদের বিশেষজ্ঞরা কীভাবে সাহায্য করতে পারে তা দেখুন।",
    category: "খেলনা গাইড",
    author: "মার্ক ডেভিস",
    date: "অক্টোবর ১২, ২০২৬",
    readTime: "৬ মিনিট",
    imgClass: "bg-indigo-100"
  },
  {
    id: 3,
    title: "খেলনার বিশৃঙ্খলা কমানো: মিনিমালিস্ট অর্গানাইজেশন হ্যাকস",
    excerpt: "ছড়ানো ছিটানো খেলনা নিয়ে বিরক্ত? কীভাবে খেলনা রোটেট করে আপনার বাচ্চার ফোকাস বাড়াতে পারেন তা জানুন।",
    category: "বিশেষজ্ঞ সাক্ষাৎকার",
    author: "অ্যালিসিয়া টরেস",
    date: "অক্টোবর ৫, ২০২৬",
    readTime: "৪ মিনিট",
    imgClass: "bg-rose-100"
  },
  {
    id: 4,
    title: "আউটডোর বা বাইরে খেলার অসাধারণ উপকারিতা",
    excerpt: "কেন উঠোনে কাদায় মাখামাখি করা বাচ্চাদের স্থিতিস্থাপকতা, ঝুঁকি মূল্যায়ন এবং সার্বিক বিকাশের জন্য এত গুরুত্বপূর্ণ।",
    category: "বিকাশের মাইলফলক",
    author: "ডা. সারাহ জেনকিন্স",
    date: "সেপ্টেম্বর ২৮, ২০২৬",
    readTime: "৭ মিনিট",
    imgClass: "bg-amber-100"
  },
  {
    id: 5,
    title: "ডিআইওয়াই উডেন রোড: একটি উইকেন্ড প্রজেক্ট",
    excerpt: "বাতিল কাঠ এবং নন-টক্সিক পেইন্ট ব্যবহার করে গাড়ির জন্য নিজের টেকসই, কাস্টমাইজযোগ্য কাঠের রাস্তা তৈরি করুন।",
    category: "ডিআইওয়াই ও ক্র্যাফটস",
    author: "এমা রিচার্ডস",
    date: "সেপ্টেম্বর ২০, ২০২৬",
    readTime: "১০ মিনিট",
    imgClass: "bg-emerald-100"
  },
  {
    id: 6,
    title: "ম্যাগনেটিক টাইলস কতটা কার্যকর?",
    excerpt: "বিজি প্লে-রুমের ধকল সহ্য করতে পারে কি না তা দেখতে আমরা সেরা ৩টি ম্যাগনেটিক টাইল ব্র্যান্ড বিশ্লেষণ করেছি।",
    category: "খেলনা গাইড",
    author: "মার্ক ডেভিস",
    date: "সেপ্টেম্বর ১৫, ২০২৬",
    readTime: "৫ মিনিট",
    imgClass: "bg-blue-100"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-32">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-950 pt-20 pb-12 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black font-heading text-slate-900 dark:text-white mb-6">প্লে আইডিয়াস এবং ইনসাইটস</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            আপনার সন্তানের মেধা ও দক্ষতা বিকাশে সাহায্য করার জন্য চাইল্ড ডেভেলপমেন্ট, ক্রিয়েটিভ কারুশিল্প এবং খেলনার ইন-ডেপথ রিভিউ পড়ুন।
          </p>
        </div>
      </div>

      {/* CATEGORY NAV */}
      <div className="bg-white dark:bg-slate-950/80 sticky top-16 z-30 border-b border-slate-100 dark:border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 gap-2 custom-scrollbar">
            {CATEGORIES.map((cat, i) => (
               <button 
                 key={cat}
                 className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${i === 0 ? 'bg-slate-900 text-white dark:bg-primary-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
               >
                 {cat}
               </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* FEATURED POST */}
        <Link href={`/blog/${FEATURED_POST.id}`} className="group block mb-20 relative rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className={`w-full aspect-[21/9] md:aspect-[3/1] bg-cover bg-center ${FEATURED_POST.image}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:w-2/3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg mb-6 shadow-md">
              <Sparkles className="w-3 h-3" /> সম্পাদকের পছন্দ
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-white mb-4 group-hover:text-primary-300 transition-colors leading-tight">
              {FEATURED_POST.title}
            </h2>
            <p className="text-slate-300 text-lg mb-6 max-w-2xl hidden md:block">
              {FEATURED_POST.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
               <div className="flex items-center gap-2"><User className="w-4 h-4" /> {FEATURED_POST.author}</div>
               <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {FEATURED_POST.date}</div>
               <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {FEATURED_POST.readTime}</div>
            </div>
          </div>
        </Link>


        {/* GRID POSTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {POSTS.map((post) => (
             <Link key={post.id} href={`/blog/${post.id}`} className="group bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col h-full">
               <div className={`w-full h-56 ${post.imgClass} relative overflow-hidden`}>
                 {/* Visual representation of an image */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-30 transform group-hover:scale-110 transition-transform duration-700">
                   <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-900/20"></div>
                 </div>
                 
                 <div className="absolute top-4 left-4">
                   <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                     {post.category}
                   </span>
                 </div>
               </div>
               
               <div className="p-8 flex flex-col flex-1">
                 <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                   {post.title}
                 </h3>
                 <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-3">
                   {post.excerpt}
                 </p>
                 
                 {/* Divider */}
                 <div className="mt-auto border-t border-slate-100 dark:border-slate-700 pt-6 flex justify-between items-center text-xs font-medium text-slate-400">
                    <span className="text-slate-600 dark:text-slate-300 font-bold">{post.author}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date.split(',')[0]}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                 </div>
               </div>
             </Link>
           ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex gap-2">
            <button className="w-12 h-12 rounded-xl bg-primary-600 text-white font-bold shadow-md flex justify-center items-center">১</button>
            <button className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 font-bold text-slate-500 transition-colors flex justify-center items-center">২</button>
            <button className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 font-bold text-slate-500 transition-colors flex justify-center items-center">৩</button>
            <span className="w-12 h-12 flex justify-center items-center text-slate-400 font-bold">...</span>
            <button className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:text-primary-600 font-bold text-slate-500 transition-colors flex justify-center items-center"><ArrowRight className="w-5 h-5"/></button>
          </div>
        </div>

      </div>

      {/* NEWSLETTER CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 relative overflow-hidden border-[12px] border-slate-800 text-center">
          <div className="absolute inset-0 bg-primary-500/10 mix-blend-overlay"></div>
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md">
               <Send className="w-8 h-8 text-primary-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-white mb-6">প্রতি সপ্তাহে নতুন প্লে আইডিয়া পান</h2>
            <p className="text-slate-400 text-lg mb-10">
              বিশেষজ্ঞদের তৈরি মাইলস্টোন অ্যাক্টিভিটি, এক্সক্লুসিভ ডিআইওয়াই টেমপ্লেট এবং প্রতি রবিবার খেলনার আর্লি অ্যাক্সেস পেতে আমাদের সাথে যুক্ত হোন।
            </p>
            <form className="w-full relative flex items-center">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল ঠিকানা দিন" 
                className="w-full pl-6 pr-40 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                required
              />
              <button 
                type="button"
                className="absolute right-2 px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors shadow-lg"
              >
                সাবস্ক্রাইব করুন
              </button>
            </form>
            <p className="text-slate-500 text-xs mt-4">আমরা আপনার ইনবক্সকে সম্মান করি। কোনো স্প্যাম নয়, শুধু হাই-কোয়ালিটি প্যারেন্টিং কন্টেন্ট।</p>
          </div>
        </div>
      </div>

    </div>
  );
}

"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Link2, CheckCircle2, Bookmark, Heart, MessageCircle, ChevronRight } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";

// Mock Data Resolver
const getMockPost = (id: string) => ({
  id,
  title: "৭ বছর বয়সীদের জন্য সঠিক স্টেম খেলনা কীভাবে বেছে নেবেন",
  excerpt: "কোডিং রোবট এবং সার্কিট্রি কিটগুলির জগতটি বেশ বড়। আপনার পরবর্তী খেলনা কিনতে আমাদের বিশেষজ্ঞরা কীভাবে সাহায্য করতে পারে তা দেখুন।",
  category: "খেলনা গাইড",
  author: "মার্ক ডেভিস",
  authorRole: "চাইল্ড ডেভেলপমেন্ট স্পেশালিস্ট",
  date: "অক্টোবর ১২, ২০২৬",
  readTime: "৬ মিনিট",
  image: "bg-[url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')]", 
  content: `
    <p class="lead">৭ বছর বয়সী শিশুদের জন্য একটি পারফেক্ট শিক্ষামূলক খেলনা খুঁজে পাওয়া বেশ চ্যালেঞ্জিং একটি কাজ। এই বয়সে, শিশুরা দ্রুত মেধা বিকাশের মধ্য দিয়ে যায় এবং পৃথিবী কীভাবে কাজ করে তা নিয়ে প্রাকৃতিকভাবে কৌতূহলী হয়। তারা সাধারণ বিল্ডিং ব্লক থেকে বড় হয়ে উঠেছে, কিন্তু রোবোটিক্স বা আরও কঠিন টেকনোলজির জন্য এখনও পুরোপুরি প্রস্তুত নয়।</p>
    
    <h2 id="golden-age">আবিষ্কারের সুবর্ণ যুগ</h2>
    <p>সাত বছর বয়সকে প্রায়ই স্টেম (সায়েন্স, টেকনোলজি, ইঞ্জিনিয়ারিং এবং ম্যাথমেটিক্স) শেখার জন্য "সুবর্ণ যুগ" বা সেরা সময় বলে মনে করা হয়। তাদের ফাইন মোটর স্কিলস অত্যন্ত উন্নত হয়, তাদের মনোযোগের পরিধি বাড়তে থাকে এবং তারা জটিল ধারণা বুঝতে শুরু করে।</p>
    
    <div class="callout">
      <strong>বিশেষজ্ঞদের টিপস:</strong> সেরা স্টেম খেলনাগুলো দেখতে শেখার ডিভাইসের মতো হয় না; তারা বরং এক্সপেরিমেন্ট বা পরীক্ষা করার আমন্ত্রণ জানায়। এমন খেলনা এড়িয়ে চলুন যা দেখতে স্কুলের হোমওয়ার্কের মতো মনে হয়।
    </div>
    
    <h3 id="key-factors">যে বিষয়গুলো খেয়াল রাখতে হবে</h3>
    <p>যখন আপনি খেলনার একটি বিশাল সংগ্রহ দেখেন, নিজেকে এই তিনটি গুরুত্বপূর্ণ প্রশ্ন জিজ্ঞেস করুন:</p>
    <ul>
      <li><strong>ওপেন-এন্ডেড পটেনশিয়াল:</strong> খেলনাটি কি শুধু একটি নির্দিষ্ট কাজই করে, নাকি শিশু এটি ব্যবহারের নতুন উপায় আবিষ্কার করতে পারে?</li>
      <li><strong>কঠিন কিন্তু মজার:</strong> খেলনাটির ডিফিকাল্টি লেভেল বা কাঠিন্য এমন হতে হবে যে তারা যেন এটা সমাধান করার চ্যালেঞ্জে মজা পায়।</li>
      <li><strong>স্ক্রিন-ফ্রি কোর:</strong> যদিও কোডিং অ্যাপগুলো দুর্দান্ত, কিন্তু এই পর্যায়ে ফিজিক্যাল এবং ট্যাকটাইল ম্যানিপুলেশন (হাতে নেড়েচেড়ে দেখা) অত্যন্ত গুরুত্বপূর্ণ।</li>
    </ul>

    <h2 id="our-recommendations">আমাদের সেরা সুপারিশসমূহ</h2>
    <p>একটি স্টেম উপহার নির্বাচন করার সময়, আমরা প্রাথমিক পর্যায়ের সার্কিট্রি বা জ্যামিতিক বিল্ডিং সিস্টেমগুলোর উপর ফোকাস করার পরামর্শ দিই। এই ধারণাগুলো কল্পনাপ্রবণ খেলা এবং কাঠামোগত বৈজ্ঞানিক পদ্ধতির মধ্যে ব্যবধান কমিয়ে আনে।</p>
    <p>মনে রাখবেন, লক্ষ্য তাদের জোর করে ১০ বছর বয়সেই ইঞ্জিনিয়ার বানানো নয়। লক্ষ্য হলো তাদের শেখানো যে, কোনো জিনিস কীভাবে কাজ করে তা বের করার প্রক্রিয়াটি অবিশ্বাস্য রকমের আনন্দদায়ক বা মজার।</p>
  `
});


export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const post = getMockPost(resolvedParams.id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      
      {/* READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-slate-100 dark:bg-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-r-full"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* STICKY TOP NAV */}
      <div className="sticky top-1.5 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">ব্লগে ফিরে যান</span>
          </Link>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 hidden md:block">
            {post.category}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
             <button onClick={() => setIsLiked(!isLiked)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border ${isLiked ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-200'}`}>
               <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
             </button>
             <button onClick={() => setIsBookmarked(!isBookmarked)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border ${isBookmarked ? 'bg-primary-50 text-primary-600 border-primary-200' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary-600 hover:border-primary-200'}`}>
               <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
             </button>
             <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1"></div>
             <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* CINEMATIC HERO SECTION */}
      <div className={`relative w-full h-[60vh] md:h-[75vh] flex items-end justify-center ${post.image} bg-cover bg-center`}>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
         <div className="absolute inset-0 bg-primary-900/20 mix-blend-overlay"></div>
         
         <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <div className="flex flex-wrap items-center gap-4 mb-6">
               <span className="px-4 py-1.5 bg-primary-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm">
                 {post.category}
               </span>
               <span className="flex items-center gap-1.5 text-white/80 text-sm font-bold bg-slate-900/50 px-3 py-1.5 rounded-full backdrop-blur-md">
                  <Clock className="w-4 h-4" /> {post.readTime}
               </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading text-white leading-[1.1] mb-6 drop-shadow-lg">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl font-medium leading-relaxed drop-shadow-md border-l-4 border-primary-500 pl-6">
              {post.excerpt}
            </p>
         </div>
      </div>

      {/* CONTENT LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* LEFT SIDEBAR: AUTHOR & TOC */}
          <div className="w-full lg:w-1/4">
             <div className="sticky top-32">
               {/* Author Card */}
               <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-inner flex items-center justify-center text-white font-black text-2xl">
                       {post.author.charAt(0)}
                     </div>
                     <div>
                       <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">লিখেছেন</div>
                       <div className="font-black text-slate-900 dark:text-white leading-tight">{post.author}</div>
                     </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {post.authorRole}, যিনি কগনিটিভ মেকানিক্সে বিশেষজ্ঞ।
                  </p>
                  <button className="w-full py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors">
                    অথরকে ফলো করুন
                  </button>
               </div>

               {/* Table of Contents */}
               <div className="hidden lg:block bg-white dark:bg-slate-950 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                 <h4 className="font-black font-heading text-slate-900 dark:text-white mb-4 flex items-center gap-2">এই পৃষ্ঠায়</h4>
                 <ul className="space-y-3 text-sm font-medium text-slate-500">
                   <li><Link href="#golden-age" className="hover:text-primary-600 transition-colors cursor-pointer flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> আবিষ্কারের সুবর্ণ যুগ</Link></li>
                   <li><Link href="#key-factors" className="hover:text-primary-600 transition-colors cursor-pointer flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> যে বিষয়গুলো খেয়াল রাখতে হবে</Link></li>
                   <li><Link href="#our-recommendations" className="hover:text-primary-600 transition-colors cursor-pointer flex items-center gap-2 text-primary-600"><div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div> আমাদের সেরা সুপারিশসমূহ</Link></li>
                 </ul>
               </div>
             </div>
          </div>

          {/* MAIN ARTICLE CONTENT */}
          <div className="w-full lg:w-2/4">
             {/* Dynamic Global Classes injected for beautifully styled typography */}
             <style dangerouslySetInnerHTML={{__html: `
               .blog-content p { margin-bottom: 1.5rem; font-size: 1.125rem; line-height: 1.8; color: var(--tw-prose-body); }
               .blog-content p.lead { font-size: 1.25rem; font-weight: 500; color: var(--tw-prose-lead); margin-bottom: 2rem; }
               .blog-content h2 { font-size: 2.25rem; font-weight: 900; margin-top: 3.5rem; margin-bottom: 1.5rem; line-height: 1.2; letter-spacing: -0.025em; }
               .blog-content h3 { font-size: 1.5rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1rem; }
               .blog-content ul { list-style-type: none; padding-left: 0; margin-bottom: 2rem; }
               .blog-content ul li { position: relative; padding-left: 1.75rem; margin-bottom: 1rem; line-height: 1.6; }
               .blog-content ul li::before { content: ""; position: absolute; left: 0; top: 0.5rem; width: 0.5rem; height: 0.5rem; border-radius: 50%; background-color: #8b5cf6; }
               .blog-content .callout { padding: 1.5rem 2rem; border-radius: 1.5rem; background-color: #f8fafc; border: 1px solid #e2e8f0; margin: 2.5rem 0; font-size: 1.125rem; line-height: 1.7; color: #334155; position: relative; overflow: hidden; }
               .blog-content .callout::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 0.5rem; background-color: #8b5cf6; }
               .dark .blog-content p { color: #cbd5e1; }
               .dark .blog-content p.lead { color: #e2e8f0; }
               .dark .blog-content h2, .dark .blog-content h3 { color: #f8fafc; }
               .dark .blog-content .callout { background-color: rgba(30, 41, 59, 0.5); border-color: #334155; color: #cbd5e1; }
               .dark .blog-content ul li::before { background-color: #a78bfa; }
             `}} />
             
             <div 
               className="blog-content font-sans"
               dangerouslySetInnerHTML={{ __html: post.content }}
             ></div>

             {/* Engagement Bar */}
             <div className="mt-16 py-6 border-y border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold transition-colors">
                    <MessageCircle className="w-5 h-5" /> ১২ মন্তব্য
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold transition-colors">
                    <Share2 className="w-5 h-5" /> শেয়ার করুন
                  </button>
                </div>
                <div className="flex gap-2 text-slate-400">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold uppercase tracking-wide">স্টেম</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold uppercase tracking-wide">বয়স ৭-৯</span>
                </div>
             </div>
          </div>

          {/* RIGHT SIDEBAR: SHOP WIDGETS */}
          <div className="w-full lg:w-1/4">
             <div className="sticky top-32">
                <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-[2rem] p-1 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                  
                  <div className="bg-slate-900 rounded-[1.8rem] p-6 relative z-10 border border-slate-700/50 h-full">
                    <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-widest rounded-lg mb-6">বিশেষজ্ঞের রিকমেন্ডেশন</span>
                    <h4 className="text-xl font-black font-heading text-white mb-6 leading-tight">বিগিনার সার্কিট্রি ল্যাব</h4>
                    
                    <div className="w-full h-40 bg-blue-100 rounded-2xl mb-6 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                       <div className="absolute inset-0 flex items-center justify-center opacity-30 transform group-hover:scale-110 transition-transform duration-500">
                         <div className="w-20 h-20 rounded-full border-4 border-dashed border-slate-900/20"></div>
                       </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                       <span className="text-2xl font-black text-white">৳৪৯৯৯</span>
                       <div className="flex text-amber-400"><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                    </div>
                    
                    <button className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                       খেলনাটি দেখুন <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}

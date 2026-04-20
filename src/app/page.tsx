import Link from "next/link";
import {
  ArrowRight,
  Star,
  Gift,
  Truck,
  ShieldCheck,
  BrainCircuit,
  Rocket,
  HeartPulse,
  Clock,
  Quote,
  Mail,
  Sparkles,
  Package,
} from "lucide-react";
import FeatureCard from "@/components/home/FeatureCard";
import AgeButton from "@/components/home/AgeButton";
import AIToolCard from "@/components/home/AIToolCard";
import TestimonialCard from "@/components/home/TestimonialCard";
import BlogCard from "@/components/home/BlogCard";
import ProductCard from "@/components/shared/ProductCard";
import HeroSlider from "@/components/home/HeroSlider";
import PremiumHeroSection from "@/components/home/PremiumHeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Premium Hero Section */}
      <PremiumHeroSection />

      {/* 2. Featured Features Bar */}
      <section className="-mt-16 mx-4 relative z-20">
        <div className="max-w-7xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Truck />}
              title="ফ্রি ডেলিভারি"
              desc="২৫০০ টাকার উপরের অর্ডারে"
            />
            <FeatureCard
              icon={<ShieldCheck />}
              title="১০০% নিরাপদ"
              desc="সার্টিফাইড নন-টক্সিক ম্যাটেরিয়াল"
            />
            <FeatureCard
              icon={<Rocket />}
              title="দ্রুত শিপিং"
              desc="পরদিন ডেলিভারির সুবিধা"
            />
            <FeatureCard
              icon={<HeartPulse />}
              title="প্যারেন্ট পরীক্ষিত"
              desc="প্রকৃত পরিবার দ্বারা অনুমোদিত"
            />
          </div>
        </div>
      </section>

      {/* 3. Age-Based Quick Finder */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
            বয়স অনুযায়ী কিনুন
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            আপনার সন্তানের সঠিক বয়স এবং বৃদ্ধির পর্যায়ের সাথে মিল রেখে মানানসই
            খেলনাগুলো খুব সহজেই খুঁজে নিন।
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <AgeButton age="০-১" label="শিশুরা" />
            <AgeButton age="১-৩" label="টডলার" />
            <AgeButton age="৪-৬" label="প্রি-স্কুলার" />
            <AgeButton age="৭-৯" label="গ্রেড স্কুল" />
            <AgeButton age="১০-১২" label="প্রি-টিন" />
            <AgeButton age="১৩+" label="টিনএজার" />
          </div>
        </div>
      </section>

      {/* 5. Flash Deals / Limited Time Offers */}
      <section className="py-20 bg-secondary-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full animate-pulse">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-1">
                  ফ্ল্যাশ ডিল
                </h2>
                <p className="text-secondary-100">
                  অফারটি শেষ হওয়ার আগেই আপনার পছন্দের খেলনাটি জিতে নিন!
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center">
                <span className="block text-2xl font-bold">০৪</span>
                <span className="text-xs uppercase">ঘন্টা</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-center">
                <span className="block text-2xl font-bold">৪৫</span>
                <span className="text-xs uppercase">মিনিট</span>
              </div>
              <Link
                href="/deals"
                className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
              >
                সব দেখুন <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              name="RC Stunt Car"
              price="৳ ২৪৯৯"
              img="bg-orange-100"
            />
            <ProductCard
              name="Magic Chemistry Set"
              price="৳ ১৯৯৯"
              img="bg-purple-100"
            />
            <ProductCard
              name="Giant Teddy Bear"
              price="৳ ৩৯৯৯"
              img="bg-pink-100"
            />
            <ProductCard
              name="Kids Digital Camera"
              price="৳ ২৯৫০"
              img="bg-cyan-100"
            />
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              সব দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. New Arrivals */}
      <section className="py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 text-accent-500 font-bold uppercase tracking-wider text-sm">
                <Sparkles className="w-5 h-5" /> স্টকে নতুন
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 dark:text-white">
                নতুন কালেকশন
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              সব দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard
              name="Space Explorer Drone"
              price="৳ ৭৯৯৯"
              img="bg-blue-50"
            />
            <ProductCard name="Musical Mat" price="৳ ৩৫০০" img="bg-yellow-50" />
            <ProductCard
              name="Wooden Train Set (Premium)"
              price="৳ ৮৯৯৯"
              img="bg-red-50"
            />
            <ProductCard
              name="Glow in the Dark Stars"
              price="৳ ১৪৯৯"
              img="bg-green-50"
            />
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              সব দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Best Sellers */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2 text-slate-900 dark:text-white">
                সর্বোচ্চ বিক্রিত
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                খেলনা যেগুলো বর্তমানে সবার সবচেয়ে পছন্দের
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              সব দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard
              name="Magna-Tiles 100-Piece Set"
              price="৳ ১১৯৯৯"
              img="bg-indigo-100"
            />
            <ProductCard
              name="Wooden Activity Cube"
              price="৳ ৪৫০০"
              img="bg-amber-100"
            />
            <ProductCard
              name="Dinosaur STEM Building Kit"
              price="৳ ৩৪৯৯"
              img="bg-emerald-100"
            />
            <ProductCard
              name="Interactive Learning Globe"
              price="৳ ৫৯৯৯"
              img="bg-blue-100"
            />
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              সব দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. AI Tools Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center text-slate-900 dark:text-white">
          এআই এর সাথে স্মার্ট শপিং
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-16 text-center max-w-2xl mx-auto">
          আমাদের ইন্টেলিজেন্ট এআই শপিং টুলের সাহায্যে উপহার দেওয়া নিয়ে আপনার সব
          দুশ্চিন্তা দূর করুন।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AIToolCard
            title="এআই গিফট ফাইন্ডার"
            desc="৪টি ছোট প্রশ্নের উত্তর দিন এবং আমাদের এআই আপনার জন্য উপযুক্ত ব্যক্তিগতকৃত উপহারের পরামর্শ দেবে।"
            icon={<Gift className="w-10 h-10 text-white" />}
            color="bg-primary-500"
          />
          <AIToolCard
            title="প্যারেন্টিং অ্যাসিস্ট্যান্ট"
            desc="খেলার ধারণা, শিশুর বিকাশের মাইলফলক এবং খেলনার নিরাপত্তা সম্পর্কে পরামর্শ পেতে আমাদের এআই বটের সাথে চ্যাট করুন।"
            icon={<BrainCircuit className="w-10 h-10 text-white" />}
            color="bg-secondary-500"
          />
          <AIToolCard
            title="খেলনা তুলনা"
            desc="এআই কে যেকোনো খেলনার ফিচার, শিক্ষামূলক মান এবং রিভিউ তুলনা করার সুযোগ দিন। সম্পূ��্ণ স্বয়ংক্রিয়ভাবে।"
            icon={<Star className="w-10 h-10 text-white" />}
            color="bg-accent-500"
          />
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center text-slate-900 dark:text-white">
            অভিভাবকরা যা বলেন
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-16 text-center max-w-2xl mx-auto">
            খেলার মাধ্যমে আনন্দ এবং শিক্ষা ছড়িয়ে দিতে হাজার হাজার পরিবারের
            বিশ্বাসযোগ্য নাম।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="সারা জে."
              quote="এআই গিফট ফাইন্ডারটি সত্যিই জাদুর মতো কাজ করে! এটি আমার ৭ বছরের ছেলের জন্য একটি স্টেম বিল্ডিং কিটের পরাম���্শ দিয়েছে এবং সে এটি নিয়ে খেলতেই থাকছে।"
              rating={5}
            />
            <TestimonialCard
              name="ইমরান খ."
              quote="দ্রুত শিপিং এবং দারুণ কোয়ালিটি। বয়স-ভিত্তিক ক্যাটাগরিগুলো আমার যমজ বাচ্চাদের জন্য কেনাকাটা করা খুব সহজ করে দিয়েছে।"
              rating={5}
            />
            <TestimonialCard
              name="এলিনা র."
              quote="যখনই আমার খেলার নতুন আইডিয়ার অভাব হয়, আমি প্যারেন্টিং অ্যাসিস্ট্যান্ট চ্যাটবটটি ব্যবহার করি। এটি সত্যিই অসাধারণ একটি ফিচার!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* 9. Blog / Play Ideas Preview */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2 text-slate-900 dark:text-white">
                প্লে আইডিয়াস ও টিপস
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                খেলনা নিয়ে আরও মজা করার ভিন্ন উপায়গুলো জানুন
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              ব্লগ পড়ুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlogCard
              title="গৃহস্থালী জিনিসপত্র ব্যবহার করে বৃষ্টির দিনের ১০টি গেমস"
              date="অক্টোবর ১২, ২০২৬"
              img="bg-blue-200"
            />
            <BlogCard
              title="প্রি-স্কুলারদের কিভাবে স্টেম খেলনার সাথে পরিচয় করিয়ে দেবেন"
              date="সেপ্টে. ২৮, ২০২৬"
              img="bg-purple-200"
            />
            <BlogCard
              title="ওপেন-এন্ডেড খেলার দারুণ সব সুবিধাসমূহ"
              date="সেপ্টে. ১৫, ২০২৬"
              img="bg-amber-200"
            />
          </div>
        </div>
      </section>

      {/* 10. Email Newsletter Signup */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100 dark:bg-secondary-900/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-20 h-20 bg-primary-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-500">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
            প্লেটাইম পরিবারের একজন হোন!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
            আপনার প্রথম অর্ডারে ১০% ছাড়, সাপ্তাহিক প্লে আইডিয়াস এবং সেলস এ
            আর্লি অ্যাক্সেস পেতে আজই সাবস্ক্রাইব করুন।
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল ঠিকানা লিখুন"
              className="flex-1 px-6 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white focus:border-primary-500 outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-slate-900 dark:bg-primary-600 text-white rounded-full font-bold hover:bg-slate-800 dark:hover:bg-primary-700 transition-colors shadow-lg"
            >
              সাবস্ক্রাইব করুন
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

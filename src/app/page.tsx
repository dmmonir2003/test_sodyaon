import HomeHeroBanner from "@/components/home/HomeHeroBanner";
import CategoryNavRow from "@/components/home/CategoryNavRow";
import ProductSliderSection from "@/components/home/ProductSliderSection";
import PromoMiddleBanner from "@/components/home/PromoMiddleBanner";
import MultiListSection from "@/components/home/MultiListSection";
import CircularItemsRow from "@/components/home/CircularItemsRow";

export default function Home() {

  // Mock Data for Sodayon Products
  const mockProducts = [
    { id: 101, name: "মন্টেসরি উডেন পাজল - শিক্ষণীয় খেলনা", price: "৳ 850", img: "bg-blue-100" },
    { id: 102, name: "বেবি কেয়ার কম্বো প্যাক", price: "৳ 1200", img: "bg-pink-100" },
    { id: 103, name: "লার্নিং সায়েন্স এক্সপেরিমেন্ট কিট", price: "৳ 1450", img: "bg-green-100" },
    { id: 104, name: "বাচ্চাদের আর্ট ও ক্রাফট বক্স", price: "৳ 950", img: "bg-amber-100" },
    { id: 105, name: "স্মার্ট বেবি ওয়াকার", price: "৳ 2500", img: "bg-indigo-100" },
    { id: 106, name: "সফট টয় - কিউট টেডি", price: "৳ 650", img: "bg-rose-100" },
    { id: 107, name: "কিডস এডুকেশনাল ট্যাব", price: "৳ 3200", img: "bg-cyan-100" },
    { id: 108, name: "কালার পেন্সিল সেট", price: "৳ 450", img: "bg-violet-100" },
  ];

  const flashDeals = [
    { id: 201, name: "জনসন বেবি লোশন 500ml", price: "৳ 750", img: "bg-pink-50" },
    { id: 202, name: "ম্যাগনেটিক বিল্ডিং ব্লকস", price: "৳ 1800", img: "bg-blue-50" },
    { id: 203, name: "কিডস ওয়াটার বোতল", price: "৳ 550", img: "bg-teal-50" },
    { id: 204, name: "স্কুল ব্যাগ (কার্টুন প্রিন্ট)", price: "৳ 1100", img: "bg-purple-50" },
    { id: 205, name: "ডায়াপার জাম্বো প্যাক", price: "৳ 1950", img: "bg-pink-50" },
    { id: 206, name: "কিডস সাইকেল", price: "৳ 4500", img: "bg-orange-50" },
  ];

  const brands = [
    { id: 1, name: "লোগো", img: "bg-blue-50", subtext: "খেলনা" },
    { id: 2, name: "জনসন", img: "bg-pink-50", subtext: "বেবি কেয়ার" },
    { id: 3, name: "ফিশার-প্রাইস", img: "bg-red-50", subtext: "শিক্ষণীয়" },
    { id: 4, name: "ম্যামি-পোকো", img: "bg-sky-50", subtext: "ডায়াপার" },
    { id: 5, name: "টুডলারস", img: "bg-amber-50", subtext: "পোশাক" },
    { id: 6, name: "ক্যামেল", img: "bg-green-50", subtext: "স্টেশনারি" },
    { id: 7, name: "ন্যাটুরস", img: "bg-teal-50", subtext: "অর্গানিক" },
  ];

  const multiLists = [
    {
      title: "বেস্ট সেলিং",
      items: [
        { id: 301, name: "বেবি স্কিন কেয়ার সেট", price: "৳ 900", img: "bg-pink-100" },
        { id: 302, name: "উডেন এবিসি পাজল", price: "৳ 450", img: "bg-blue-100" },
        { id: 303, name: "কালারিং বুক সেট", price: "৳ 300", img: "bg-amber-100" },
      ]
    },
    {
      title: "নতুন এসেছে",
      items: [
        { id: 304, name: "স্মার্ট রিমোট কন্ট্রোল কার", price: "৳ 2100", img: "bg-red-100" },
        { id: 305, name: "বেবি ফিডিং বোটল সেট", price: "৳ 1200", img: "bg-sky-100" },
        { id: 306, name: "পপ-ইট ফিজেট টয়", price: "৳ 250", img: "bg-purple-100" },
      ]
    },
    {
      title: "ট্রেন্ডিং",
      items: [
        { id: 307, name: "কিডস কীবোর্ড পিয়ানো", price: "৳ 1650", img: "bg-indigo-100" },
        { id: 308, name: "বেবি স্লিপিং ব্যাগ", price: "৳ 1400", img: "bg-teal-100" },
        { id: 309, name: "হোয়াইটবোর্ড এবং মার্কার", price: "৳ 600", img: "bg-orange-100" },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 md:pb-0">
      
      {/* 1. Top Core Hero Banner */}
      <HomeHeroBanner />

      {/* 2. Horizontal Quick Category Links */}
      <CategoryNavRow />

      {/* 3. Flash Deals Slider */}
      <ProductSliderSection 
        title="ফ্ল্যাশ ডিলস!" 
        subtitle="সীমিত সময়ের জন্য বিশেষ অফার"
        badge="Hot"
        viewAllLink="/shop?sort=deals"
        products={flashDeals}
        bgColor="bg-rose-50/50 dark:bg-slate-900"
      />

      {/* 4. Circular Featured Brands Row */}
      <CircularItemsRow 
        title="জনপ্রিয় ব্র্যান্ড" 
        items={brands} 
      />

      {/* 5. Baby Care Essentials */}
      <ProductSliderSection 
        title="বেবি কেয়ার এসেনশিয়ালস" 
        viewAllLink="/shop?category=baby-care"
        products={mockProducts.slice(0, 5)}
        bgColor="bg-white dark:bg-slate-900"
      />

      {/* 6. Static Mid-Page Banner (Toys) */}
      <PromoMiddleBanner 
        title="শিক্ষণীয় খেলনা দিয়ে শিশুর মেধা বিকাশ করুন!"
        subtitle="স্টেম (STEM) খেলনায় পাচ্ছেন বিশেষ ছাড়"
        linkText="খেলনা দেখুন"
        href="/shop?category=toys"
        bgClass="bg-gradient-to-r from-primary-500 to-indigo-600"
        illustrationType="toys"
      />

      {/* 7. Multi-List Top Selling / Trending Columns */}
      <MultiListSection columns={multiLists} />

      {/* 8. Stationery & Books Slider */}
      <ProductSliderSection 
        title="বই ও স্টেশনারি" 
        viewAllLink="/shop?category=stationery"
        products={mockProducts.slice(3, 8)}
        bgColor="bg-white dark:bg-slate-900"
      />

      {/* 9. Final Static Promo Banner (Baby) */}
      <div className="py-4"></div>
      <PromoMiddleBanner 
        title="সুপার সফ্ট ডায়াপার ও বেবি ওয়াইপস"
        subtitle="বাচ্চাদের ত্বকের সুরক্ষায় আপোষ নয়"
        linkText="কিনুন"
        href="/shop?category=baby-care"
        bgClass="bg-gradient-to-r from-pink-500 to-rose-600"
        illustrationType="baby"
      />

      <div className="py-8"></div>
    </div>
  );
}

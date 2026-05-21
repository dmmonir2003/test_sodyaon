import HomeHeroBanner from "@/components/home/HomeHeroBanner";
import CategoryNavRow from "@/components/home/CategoryNavRow";
import HomeProductGridSlider from "@/components/home/HomeProductGridSlider";
import PromoMiddleBanner from "@/components/home/PromoMiddleBanner";
import MultiListSection from "@/components/home/MultiListSection";
import ComboOffersRow from "@/components/home/CircularItemsRow";
import { HomeProductCardProps } from "@/components/home/HomeProductCard";
import HomeCategoryCollection, { CollectionBlock } from "@/components/home/HomeCategoryCollection";
import QuickDealSection from "@/components/home/QuickDealSection";
import BrandScroller, { BrandItem } from "@/components/home/BrandScroller";
import { QuickDealProductProps } from "@/components/home/QuickDealCard";

export default function Home() {

  // Mock Data for Quick Deals
  const quickDeals: QuickDealProductProps[] = [
    { 
      id: 601, 
      name: "Magnetic Tiles 100-Piece Building Set", 
      brand: "Magna-Tiles", 
      oldPrice: "৳3,500", 
      currentPrice: "৳2,600", 
      discountBadge: "25% OFF", 
      img: "/mock/toy_tiles.png",
      soldCount: "45",
      totalStock: 100
    },
    { 
      id: 602, 
      name: "Professional Watercolor Art Collection", 
      brand: "Faber-Castell", 
      oldPrice: "৳1,200", 
      currentPrice: "৳890", 
      discountBadge: "26% OFF", 
      img: "/mock/stationery_set.png",
      stockCount: 12,
      totalStock: 50
    },
    { 
      id: 603, 
      name: "Digital LCD Writing Tablet 10\"", 
      brand: "Non-Brand", 
      oldPrice: "৳750", 
      currentPrice: "৳399", 
      discountBadge: "47% OFF", 
      img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      soldCount: "138",
      totalStock: 200
    },
    { 
      id: 604, 
      name: "Bioaqua Rice Raw Pulp Essence", 
      brand: "Bioaqua", 
      oldPrice: "৳550", 
      currentPrice: "৳320", 
      discountBadge: "42% OFF", 
      img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      stockCount: 9,
      totalStock: 30
    },
    { 
      id: 605, 
      name: "Beewax Wood Polishing Furniture", 
      brand: "Non-Brand", 
      oldPrice: "৳450", 
      currentPrice: "৳199", 
      discountBadge: "56% OFF", 
      img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      soldCount: "85",
      totalStock: 150
    },
    { 
      id: 606, 
      name: "Infant Care Baby Diaper Large", 
      brand: "MamyPoko", 
      oldPrice: "৳2,200", 
      currentPrice: "৳1,850", 
      discountBadge: "16% OFF", 
      img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      soldCount: "16",
      totalStock: 60
    }
  ];

  // Mock Data mapped to Rokomari-style product cards
  const flashDeals: HomeProductCardProps[] = [
    { id: 201, name: "SmartCare Wet Wipes with Tube - 220 Pcs", brand: "SmartCare", oldPrice: "৳ 355", currentPrice: "৳ 222", discountBadge: "37% OFF", badgeColor: "red", img: "bg-yellow-50", rating: 5, reviewCount: 5, inStock: true },
    { id: 202, name: "Avonee Pants System Baby Diaper (XL Size)", brand: "Avonee", oldPrice: "৳ 1,200", currentPrice: "৳ 960", discountBadge: "20% OFF", badgeColor: "yellow", img: "bg-blue-50", rating: 4, reviewCount: 1, inStock: true },
    { id: 203, name: "Smart Care Pant System Baby Diaper (M Size)", brand: "SmartCare", currentPrice: "৳ 2,199", discountBadge: "04% OFF", badgeColor: "yellow", img: "bg-indigo-50", rating: 5, reviewCount: 8, inStock: true },
    { id: 204, name: "Washable Cloth Diaper Pant For Baby 2pcs", brand: "Non-Brand", currentPrice: "৳ 359", discountBadge: "10% OFF", badgeColor: "yellow", img: "bg-pink-50", rating: 4, reviewCount: 4, inStock: true },
    { id: 205, name: "Neocare Premium Belt System Baby Diaper", brand: "NeoCare", oldPrice: "৳ 1,050", currentPrice: "৳ 869", discountBadge: "17% OFF", badgeColor: "yellow", img: "bg-sky-50", rating: 4.5, reviewCount: 12, inStock: true },
  ];

  const babyEssentials: HomeProductCardProps[] = [
    { id: 401, name: "Nannys Baby Love Belt System Baby Diaper Jumbo", brand: "Nannys", oldPrice: "৳ 1,885", currentPrice: "৳ 1,600", discountBadge: "15% OFF", badgeColor: "yellow", img: "/mock/baby_bag.png", rating: 5, reviewCount: 1, inStock: true },
    { id: 402, name: "Savlon Twinkle Pant System Baby Diaper (S)", brand: "Savlon Twinkle", currentPrice: "৳ 1,105", img: "/mock/baby_bag.png", rating: 4.5, reviewCount: 6, inStock: true },
    { id: 403, name: "Johnson's Baby Powder 200g", brand: "Johnson's", oldPrice: "৳ 300", currentPrice: "৳ 280", discountBadge: "5% OFF", badgeColor: "red", img: "/mock/baby_bag.png", rating: 4, reviewCount: 22, inStock: true },
    { id: 404, name: "Mamaearth Milky Soft Face Cream", brand: "Mamaearth", currentPrice: "৳ 450", img: "/mock/baby_bag.png", rating: 5, reviewCount: 9, inStock: true },
    { id: 405, name: "Huggies Wonder Pants M Size", brand: "Huggies", currentPrice: "৳ 1,250", img: "/mock/baby_bag.png", rating: 5, reviewCount: 18, inStock: true },
    { id: 406, name: "Pampers Baby-Dry Newborn", brand: "Pampers", oldPrice: "৳ 950", currentPrice: "৳ 850", discountBadge: "10% OFF", badgeColor: "yellow", img: "/mock/baby_bag.png", rating: 4.5, reviewCount: 32, inStock: true },
    { id: 407, name: "Aveeno Baby Daily Moisture Lotion", brand: "Aveeno", currentPrice: "৳ 1,100", img: "/mock/baby_bag.png", rating: 5, reviewCount: 14, inStock: true },
    { id: 408, name: "Kodomo Baby Bath 400ml", brand: "Kodomo", currentPrice: "৳ 450", img: "/mock/baby_bag.png", rating: 4, reviewCount: 27, inStock: true },
  ];

  const stationaryDeals: HomeProductCardProps[] = [
    { id: 501, name: "Faber-Castell 24 Water Color Pencils", brand: "Faber-Castell", oldPrice: "৳ 650", currentPrice: "৳ 550", discountBadge: "15% OFF", badgeColor: "red", img: "/mock/stationery_set.png", rating: 5, reviewCount: 14, inStock: true },
    { id: 502, name: "Deli Scientific Calculator D82MS", brand: "Deli", oldPrice: "৳ 800", currentPrice: "৳ 720", discountBadge: "10% OFF", badgeColor: "yellow", img: "/mock/stationery_set.png", rating: 4.5, reviewCount: 45, inStock: true },
    { id: 503, name: "Camlin Artist Acrylic Colors 12 Shades", brand: "Camlin", currentPrice: "৳ 950", img: "/mock/stationery_set.png", rating: 5, reviewCount: 6, inStock: false },
    { id: 504, name: "Kangaro Stapler HD-45", brand: "Kangaro", currentPrice: "৳ 280", img: "/mock/stationery_set.png", rating: 4, reviewCount: 31, inStock: true },
    { id: 505, name: "Parker Vector Gold Trim Ball Pen", brand: "Parker", oldPrice: "৳ 1,200", currentPrice: "৳ 1,100", discountBadge: "8% OFF", badgeColor: "red", img: "/mock/stationery_set.png", rating: 5, reviewCount: 52, inStock: true },
    { id: 506, name: "Cello Maxwriter Ball Pen Blue (Pack of 10)", brand: "Cello", currentPrice: "৳ 100", img: "/mock/stationery_set.png", rating: 4.5, reviewCount: 120, inStock: true },
    { id: 507, name: "Matador Pinpoint Ball Pen 0.6 mm", brand: "Matador", currentPrice: "৳ 10", img: "/mock/stationery_set.png", rating: 4, reviewCount: 450, inStock: true },
    { id: 508, name: "Titanium Scissors 8 Inch", brand: "Smart Stationery", currentPrice: "৳ 250", img: "/mock/stationery_set.png", rating: 5, reviewCount: 9, inStock: true },
  ];

  const combos = [
    { id: 1001, name: "নন-স্টপ বেবি কেয়ার কম্বো", price: "৳ ১,৫৮০", oldPrice: "৳ ১,৯৫০", img: "/mock/baby_bag.png" },
    { id: 301, name: "এসটিইএম লার্নিং কিট ডিল", price: "৳ ১,২০০", oldPrice: "৳ ১,৫০০", img: "/mock/toy_tiles.png" },
    { id: 202, name: "মাস্টারপিস আর্ট মেগা প্যাক", price: "৳ ৯৫০", oldPrice: "৳ ১,২৮০", img: "/mock/stationery_set.png" },
    { id: 1002, name: "কিডস স্কুল রেডি বান্ডেল", price: "৳ ২,৪০০", oldPrice: "৳ ৩,১০০", img: "/mock/stationery_set.png" },
    { id: 102, name: "ম্যাগনেটিক পাজল গিফট সেট", price: "৳ ১,৮৫০", oldPrice: "৳ ২,২০০", img: "/mock/toy_tiles.png" },
    { id: 401, name: "নিউবর্ন প্রিমিয়াম গিফট বক্স", price: "৳ ৩,৫০০", oldPrice: "৳ ৪,২০০", img: "/mock/baby_bag.png" },
    { id: 201, name: "সুপার ডায়াপার মান্থলি প্যাক", price: "৳ ৪,২০০", oldPrice: "৳ ৫,০০০", img: "/mock/baby_bag.png" },
    { id: 1003, name: "ডিজিটাল রাইটিং অ্যান্ড ড্রয়িং", price: "৳ ৮৯০", oldPrice: "৳ ১,১৫০", img: "/mock/toy_tiles.png" },
    { id: 1004, name: "উডেন ব্লকস আর্কিটেক্ট সেট", price: "৳ ১,৬৫০", oldPrice: "৳ ২,০০০", img: "/mock/toy_tiles.png" },
    { id: 302, name: "বেবি হাইজিন কিট প্রো", price: "৳ ১,৩৫০", oldPrice: "৳ ১,৬০০", img: "/mock/baby_bag.png" },
    { id: 303, name: "ক্রিয়েটিভ কালারিং আলটিমেট", price: "৳ ৪৫০", oldPrice: "৳ ৬০০", img: "/mock/stationery_set.png" },
    { id: 1005, name: "কালারফুল প্লে-ডো সেট", price: "৳ ১২০০", oldPrice: "৳ ১৫০০", img: "/mock/toy_tiles.png" },
  ];

  const popularBrands: BrandItem[] = [
    { id: 1, name: "NeoCare", logo: "/mock/baby_bag.png", category: "Premium Diapers" },
    { id: 2, name: "Fisher-Price", logo: "/mock/toy_tiles.png", category: "Educational Toys" },
    { id: 3, name: "Faber-Castell", logo: "/mock/stationery_set.png", category: "Art & Stationery" },
    { id: 4, name: "MamyPoko", logo: "/mock/baby_bag.png", category: "Pants Diapers" },
    { id: 5, name: "Johnson's", logo: "/mock/baby_bag.png", category: "Baby Skincare" },
    { id: 6, name: "Deli", logo: "/mock/stationery_set.png", category: "Office Supplies" },
    { id: 7, name: "Lego", logo: "/mock/toy_tiles.png", category: "Building Sets" },
  ];

  const multiLists = [
    {
      title: "বেস্ট সেলিং",
      items: [
        { id: 301, name: "বেবি স্কিন কেয়ার সেট", price: "৳ 900", img: "/mock/baby_bag.png" },
        { id: 302, name: "উডেন এবিসি পাজল", price: "৳ 450", img: "/mock/toy_tiles.png" },
        { id: 303, name: "কালারিং বুক সেট", price: "৳ 300", img: "/mock/stationery_set.png" },
        { id: 310, name: "মন্টেসরি ম্যাথ বোর্ড", price: "৳ 750", img: "/mock/toy_tiles.png" },
        { id: 311, name: "অর্গানিক বেবি সোপ প্যাক", price: "৳ 400", img: "/mock/baby_bag.png" },
        { id: 312, name: "জিওমেট্রি বক্স প্রো", price: "৳ 250", img: "/mock/stationery_set.png" },
        { id: 313, name: "কিডস সানগ্লাস ভিনটেজ", price: "৳ 150", img: "/mock/baby_bag.png" },
      ]
    },
    {
      title: "নতুন এসেছে",
      items: [
        { id: 304, name: "স্মার্ট রিমোট কন্ট্রোল কার", price: "৳ 2100", img: "/mock/toy_tiles.png" },
        { id: 305, name: "বেবি ফিডিং বোটল সেট", price: "৳ 1200", img: "/mock/baby_bag.png" },
        { id: 306, name: "পপ-ইট ফিজেট টয়", price: "৳ 250", img: "/mock/toy_tiles.png" },
        { id: 314, name: "ব্রেইন টিজার পাজল বল", price: "৳ 350", img: "/mock/toy_tiles.png" },
        { id: 315, name: "স্পাইডার-ম্যান টিফিন বক্স", price: "৳ 450", img: "/mock/stationery_set.png" },
        { id: 316, name: "সিলিকন ফিডিং স্পুন", price: "৳ 200", img: "/mock/baby_bag.png" },
        { id: 317, name: "ম্যাজিক ক্যালিগ্রাফি বুক", price: "৳ 550", img: "/mock/stationery_set.png" },
      ]
    },
    {
      title: "ট্রেন্ডিং",
      items: [
        { id: 307, name: "কিডস কীবোর্ড পিয়ানো", price: "৳ 1650", img: "/mock/toy_tiles.png" },
        { id: 308, name: "বেবি স্লিপিং ব্যাগ", price: "৳ 1400", img: "/mock/baby_bag.png" },
        { id: 309, name: "হোয়াইটবোর্ড এবং মার্কার", price: "৳ 600", img: "/mock/stationery_set.png" },
        { id: 318, name: "ডাইনোসর সফট টয়", price: "৳ 850", img: "/mock/toy_tiles.png" },
        { id: 319, name: "ডিজিটাল রাইটিং প্যাড ৮\"", price: "৳ 500", img: "/mock/stationery_set.png" },
        { id: 320, name: "উডেন মেমরি চেস গেম", price: "৳ 700", img: "/mock/toy_tiles.png" },
        { id: 321, name: "অ্যান্টিব্যাকটেরিয়াল ওয়াইপস", price: "৳ 150", img: "/mock/baby_bag.png" },
      ]
    }
  ];

  const categoryCollections: CollectionBlock[] = [
    {
      id: 1,
      title: "বেবি কেয়ার সামগ্রী",
      seeMoreLink: "/shop?collection=baby-care",
      items: [
        { name: "ডায়াপার", img: "/mock/baby_bag.png", link: "/shop?category=diapers" },
        { name: "বেবি লোশন", img: "/mock/baby_bag.png", link: "/shop?category=skincare" },
        { name: "ফিডিং বোতল", img: "/mock/baby_bag.png", link: "/shop?category=feeding" },
        { name: "বেবি ওয়াইপস", img: "/mock/baby_bag.png", link: "/shop?category=accessories" },
      ]
    },
    {
      id: 2,
      title: "শিক্ষণীয় খেলনা",
      seeMoreLink: "/shop?collection=educational-toys",
      items: [
        { name: "বিল্ডিং ব্লকস", img: "/mock/toy_tiles.png", link: "/shop?category=toys" },
        { name: "পাজল গেম", img: "/mock/toy_tiles.png", link: "/shop?category=puzzles" },
        { name: "সায়েন্স কিট", img: "/mock/toy_tiles.png", link: "/shop?category=stem" },
        { name: "আর্ট ও ক্রাফট", img: "/mock/toy_tiles.png", link: "/shop?category=art" },
      ]
    },
    {
      id: 3,
      title: "বই ও স্টেশনারি",
      seeMoreLink: "/shop?collection=stationery",
      items: [
        { name: "কালারিং বই", img: "/mock/stationery_set.png", link: "/shop?category=books" },
        { name: "কালার পেন্সিল", img: "/mock/stationery_set.png", link: "/shop?category=stationery" },
        { name: "স্কুল ব্যাগ", img: "/mock/baby_bag.png", link: "/shop?category=bags" },
        { name: "জ্যামিতি বক্স", img: "/mock/stationery_set.png", link: "/shop?category=stationery" },
      ]
    },
    {
      id: 4,
      title: "কিডস ফ্যাশন",
      seeMoreLink: "/shop?collection=kids-fashion",
      items: [
        { name: "টি-শার্ট", img: "/mock/baby_bag.png", link: "/shop?category=clothing" },
        { name: "কিডস সুজ", img: "/mock/toy_tiles.png", link: "/shop?category=shoes" },
        { name: "হেয়ার ব্যান্ড", img: "/mock/baby_bag.png", link: "/shop?category=accessories" },
        { name: "বেবি সোয়াডল", img: "/mock/baby_bag.png", link: "/shop?category=clothing" },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 md:pb-0">
      
      {/* 1. Top Core Hero Banner */}
      <HomeHeroBanner />

      {/* 2. Horizontal Quick Category Links */}
      <CategoryNavRow />

      {/* 3. QUICK DEALS SECTION (Newly Added matching image) */}
      <QuickDealSection 
        title="Quick Deal"
        products={quickDeals} 
      />

      {/* 4. Combo Offers Row */}
      <ComboOffersRow 
        title="স্পেশাল কম্বো অফার" 
        items={combos} 
      />

      {/* 4.5 Popular Brands Scroller */}
      

      {/* 5. Baby Care Essentials */}
      <HomeProductGridSlider 
        title="More Baby Care Essentials"
        viewAllLink="/shop?category=baby-care"
        products={babyEssentials}
        bgColor="bg-slate-50 dark:bg-slate-950"
      />
      {/* 7.5 Categorical Grid Slider Block */}
      <HomeCategoryCollection blocks={categoryCollections} bgColor="bg-slate-100/50 dark:bg-slate-900/50" />

      {/* 6. Static Mid-Page Banner Grid */}
      <section className="py-4 sm:py-8 md:py-6 max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
          <PromoMiddleBanner 
            categoryName="Playground"
            imageUrl="/promo_toys_banner_1777417968994.png"
            alt="Toys Collection"
          />
          <PromoMiddleBanner 
            categoryName="Baby Hygiene"
            imageUrl="/promo_baby_banner_1777417982592.png"
            alt="Baby Care Collection"
          />
        </div>
      </section>

      {/* 3.5 BAG COLLECTION SECTION (Dedicated Premium Layout) */}
      <QuickDealSection 
        title="Bag Collection"
        bgPatternDark="/mock/quick_deal_bg_dark_luxury.png"
        products={[
          { 
            id: 701, 
            name: "Premium Multi-functional Diaper Bag", 
            brand: "BabyJoy", 
            oldPrice: "৳2,800", 
            currentPrice: "৳1,950", 
            discountBadge: "30% OFF", 
            img: "/mock/baby_bag.png",
            soldCount: "22",
            totalStock: 50
          },
          { 
            id: 702, 
            name: "Waterproof Travel Mother Bag Set", 
            brand: "Sunveno", 
            oldPrice: "৳3,200", 
            currentPrice: "৳2,400", 
            discountBadge: "25% OFF", 
            img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            stockCount: 5,
            totalStock: 20
          },
          { 
            id: 703, 
            name: "Eco-Friendly Cotton Diaper Totes", 
            brand: "NatureLove", 
            oldPrice: "৳1,500", 
            currentPrice: "৳999", 
            discountBadge: "33% OFF", 
            img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            soldCount: "67",
            totalStock: 100
          },
          { 
            id: 704, 
            name: "Convertible Backpack Diaper Bag", 
            brand: "MamyPoko", 
            oldPrice: "৳4,500", 
            currentPrice: "৳3,800", 
            discountBadge: "15% OFF", 
            img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            stockCount: 15,
            totalStock: 40
          },
        ]} 
      />

      {/* 7. Multi-List Top Selling / Trending Columns */}
      <MultiListSection columns={multiLists} />

      <BrandScroller 
        title="Popular Brands" 
        brands={popularBrands} 
      />

      {/* 8. Stationery Slider */}
      <HomeProductGridSlider 
        title="Stationery Deals"
        viewAllLink="/shop?category=stationery"
        products={stationaryDeals}
        bgColor="bg-white dark:bg-slate-900"
      />

      {/* 9. Final Static Promo Banner Grid */}
      <section className="py-4 sm:py-8 md:py-6 max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
          <PromoMiddleBanner 
            categoryName="Wooden Toys"
            imageUrl="/promo_toys_banner_1777417968994.png"
            alt="Wooden Toys"
          />
          <PromoMiddleBanner 
            categoryName="Baby Care"
            imageUrl="/promo_baby_banner_1777417982592.png"
            alt="Newborn Care"
          />
        </div>
      </section>

      <div className="py-8"></div>
    </div>
  );
}

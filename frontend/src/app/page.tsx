"use client";

import React from "react";
import { useGetAdminProductsQuery, useGetCategoriesQuery, useGetSpecialOffersQuery } from "@/store/admin/adminContentApi";
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
  // Query live database catalog
  const { data: prodData, isLoading: prodsLoading } = useGetAdminProductsQuery({ limit: 50 });
  const { data: catData } = useGetCategoriesQuery({ tree: true });

  // High-performance dynamic Quick Deals query!
  const { data: dealsData } = useGetSpecialOffersQuery({ limit: 10 });
  console.log("dealsData", dealsData);

  const dbProducts = prodData?.data || [];
  const dbDeals = dealsData?.data || [];

  // ---------------------------------------------------------
  // MOCK FALLBACKS (Used to keep design premium when DB is empty)
  // ---------------------------------------------------------
  const mockQuickDeals: QuickDealProductProps[] = [
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
    }
  ];

  const mockBabyEssentials: HomeProductCardProps[] = [
    { id: 401, name: "Nannys Baby Love Belt System Baby Diaper Jumbo", brand: "Nannys", oldPrice: "৳ 1,885", currentPrice: "৳ 1,600", discountBadge: "15% OFF", badgeColor: "yellow", img: "/mock/baby_bag.png", rating: 5, reviewCount: 1, inStock: true },
    { id: 402, name: "Savlon Twinkle Pant System Baby Diaper (S)", brand: "Savlon Twinkle", currentPrice: "৳ 1,105", img: "/mock/baby_bag.png", rating: 4.5, reviewCount: 6, inStock: true }
  ];

  const mockStationeryDeals: HomeProductCardProps[] = [
    { id: 501, name: "Faber-Castell 24 Water Color Pencils", brand: "Faber-Castell", oldPrice: "৳ 650", currentPrice: "৳ 550", discountBadge: "15% OFF", badgeColor: "red", img: "/mock/stationery_set.png", rating: 5, reviewCount: 14, inStock: true }
  ];

  // ---------------------------------------------------------
  // LIVE DYNAMIC MAPPINGS
  // ---------------------------------------------------------
  const calculateDiscountPercent = (price: number, originalPrice?: number, discountField?: number) => {
    if (originalPrice && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return discountField || 0;
  };

  // 1. Dynamic Quick Deals Slider
  const quickDealsSource = dbDeals.length > 0 ? dbDeals : dbProducts;

  const mappedQuickDeals: QuickDealProductProps[] = quickDealsSource.map((p: any) => {
    const discountPct = calculateDiscountPercent(p.price, p.originalPrice, p.discount);
    return {
      id: p.slug || p.id || p._id,
      name: p.nameEn || p.name,
      brand: p.brandEn || "Sodayon Selection",
      oldPrice: p.originalPrice && p.originalPrice > p.price ? `৳${p.originalPrice}` : `৳${p.price}`,
      currentPrice: `৳${p.price}`,
      discountBadge: discountPct > 0 ? `${discountPct}% OFF` : "",
      img: p.image || "https://sodayon.com/default-product.jpg",
      soldCount: String(p.totalSold || 0),
      totalStock: 100
    };
  });

  const activeQuickDeals = mappedQuickDeals.length > 0 ? mappedQuickDeals : mockQuickDeals;

  // Helper mapper to ensure standard card formats
  const toHomeProductCard = (p: any): HomeProductCardProps => {
    const discountPct = calculateDiscountPercent(p.price, p.originalPrice, p.discount);
    return {
      id: p.slug || p.id || p._id,
      name: p.nameEn || p.name,
      brand: p.brandEn || "Sodayon Selection",
      oldPrice: p.originalPrice > p.price ? `৳ ${p.originalPrice}` : undefined,
      currentPrice: `৳ ${p.price}`,
      discountBadge: discountPct > 0 ? `${discountPct}% OFF` : undefined,
      badgeColor: discountPct > 20 ? "red" : "yellow",
      img: p.image || "https://sodayon.com/default-product.jpg",
      rating: p.avgRating || 5,
      reviewCount: p.reviews || 0,
      inStock: true
    };
  };

  // 2. Dynamic Product Cards
  // Retrieve baby category tree info
  const dbCategories = catData?.data || [];
  const babyCareCategory = dbCategories.find((c: any) => c.slug === 'baby-care');
  const babyCareId = babyCareCategory?._id || babyCareCategory?.id;
  const babySubcategoryIds = babyCareCategory?.children?.map((sub: any) => sub._id || sub.id) || [];

  // Baby Care Essentials
  const babyDbProducts = dbProducts.filter((p: any) => {
    const hasBabyCareCategory = p.categories?.some((cat: any) => {
      const id = typeof cat === 'string' ? cat : (cat?._id || cat?.id || cat);
      return id === babyCareId || babySubcategoryIds.includes(id);
    });
    const isBabyCategoryId = p.categoryId === babyCareId || babySubcategoryIds.includes(p.categoryId);
    const isBabySubcategoryId = p.subcategoryId === babyCareId || babySubcategoryIds.includes(p.subcategoryId);
    const isLegacyBaby = p.categoryId >= 10;

    return hasBabyCareCategory || isBabyCategoryId || isBabySubcategoryId || isLegacyBaby;
  });
  const mappedBabyEssentials = babyDbProducts.map(toHomeProductCard);
  const activeBabyEssentials = mappedBabyEssentials.length > 0 ? mappedBabyEssentials : mockBabyEssentials;

  // Toys, Art & Educational (not baby care)
  const toyDbProducts = dbProducts.filter((p: any) => {
    const hasBabyCareCategory = p.categories?.some((cat: any) => {
      const id = typeof cat === 'string' ? cat : (cat?._id || cat?.id || cat);
      return id === babyCareId || babySubcategoryIds.includes(id);
    });
    const isBabyCategoryId = p.categoryId === babyCareId || babySubcategoryIds.includes(p.categoryId);
    const isBabySubcategoryId = p.subcategoryId === babyCareId || babySubcategoryIds.includes(p.subcategoryId);
    const isLegacyBaby = p.categoryId >= 10;

    const isBaby = hasBabyCareCategory || isBabyCategoryId || isBabySubcategoryId || isLegacyBaby;
    return !isBaby;
  });
  const mappedStationeryDeals = toyDbProducts.map(toHomeProductCard);
  const activeStationeryDeals = mappedStationeryDeals.length > 0 ? mappedStationeryDeals : mockStationeryDeals;

  // 3. Combo / Package filtering
  const comboDbProducts = dbProducts.filter((p: any) => {
    const isComboTag = p.tags?.some((t: string) => 
      t.toLowerCase().includes("combo") || 
      t.toLowerCase().includes("package") || 
      t.toLowerCase().includes("bundle")
    );
    const isComboName = 
      p.nameEn?.toLowerCase().includes("combo") || 
      p.nameEn?.toLowerCase().includes("package") || 
      p.nameEn?.toLowerCase().includes("bundle") ||
      p.nameBn?.includes("কম্বো") ||
      p.nameBn?.includes("প্যাকেজ") ||
      p.name?.toLowerCase().includes("combo") ||
      p.name?.toLowerCase().includes("package");
    const hasPackageItems = p.packageItems && p.packageItems.length > 0;
    
    return isComboTag || isComboName || hasPackageItems;
  });

  const combos = [
    { id: 1001, name: "নন-স্টপ বেবি কেয়ার কম্বো", price: "৳ ১,৫৮০", oldPrice: "৳ ১,৯৫০", img: "/mock/baby_bag.png" },
    { id: 301, name: "এসটিইএম লার্নিং কিট ডিল", price: "৳ ১,২০০", oldPrice: "৳ ১,৫০০", img: "/mock/toy_tiles.png" },
    { id: 202, name: "মাস্টারপিস আর্ট মেগা প্যাক", price: "৳ ৯৫০", oldPrice: "৳ ১,২৮০", img: "/mock/stationery_set.png" }
  ];

  const mappedCombos = comboDbProducts.map((p: any) => ({
    id: p.slug || p.id || p._id,
    name: p.nameBn || p.name,
    price: `৳ ${p.price}`,
    oldPrice: p.originalPrice > p.price ? `৳ ${p.originalPrice}` : undefined,
    img: p.image || "https://sodayon.com/default-product.jpg"
  }));
  const activeCombos = mappedCombos.length > 0 ? mappedCombos : combos;

  const popularBrands: BrandItem[] = [
    { id: 1, name: "NeoCare", logo: "/mock/baby_bag.png", category: "Premium Diapers" },
    { id: 2, name: "Fisher-Price", logo: "/mock/toy_tiles.png", category: "Educational Toys" },
    { id: 3, name: "Faber-Castell", logo: "/mock/stationery_set.png", category: "Art & Stationery" }
  ];

  // Dynamic sorting logic
  const sortedBestSellers = dbProducts.length > 0 
    ? [...dbProducts].sort((a, b) => (b.totalSold || b.salesCount || 0) - (a.totalSold || a.salesCount || 0)).slice(0, 4) 
    : [];
  const bestSellersSource = sortedBestSellers.length > 0 ? sortedBestSellers : dbProducts.slice(0, 4);

  const sortedNewArrivals = dbProducts.length > 0 
    ? [...dbProducts].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).slice(0, 4) 
    : [];
  const newArrivalsSource = sortedNewArrivals.length > 0 ? sortedNewArrivals : dbProducts.slice(4, 8);

  const sortedTrending = dbProducts.length > 0 
    ? [...dbProducts].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 4) 
    : [];
  const trendingSource = sortedTrending.length > 0 ? sortedTrending : dbProducts.slice(8, 12);

  const toMultiListItem = (p: any) => ({
    id: p.slug || p.id || p._id,
    name: p.nameEn || p.name,
    price: `৳ ${p.price}`,
    img: p.image || "https://sodayon.com/default-product.jpg"
  });

  const multiLists = [
    {
      title: "বেস্ট সেলিং",
      items: bestSellersSource.map(toMultiListItem)
    },
    {
      title: "নতুন এসেছে",
      items: newArrivalsSource.map(toMultiListItem)
    },
    {
      title: "ট্রেন্ডিং",
      items: trendingSource.map(toMultiListItem)
    }
  ];

  const diaperSub = babyCareCategory?.children?.find((sub: any) => sub.slug === 'baby-diapers');
  const diaperLinkId = diaperSub?._id || diaperSub?.id || 'diapers';

  const magneticSub = dbCategories
    .flatMap((c: any) => c.children || [])
    .find((sub: any) => sub.slug === 'magnetic-blocks');
  const magneticLinkId = magneticSub?._id || magneticSub?.id || 'toys';

  const roboticSub = dbCategories
    .flatMap((c: any) => c.children || [])
    .find((sub: any) => sub.slug === 'robotic-stem');
  const roboticLinkId = roboticSub?._id || roboticSub?.id || 'stem';

  const categoryCollections: CollectionBlock[] = [
    {
      id: 1,
      title: "বেবি কেয়ার সামগ্রী",
      seeMoreLink: `/shop?category=${babyCareId || 'baby-care'}`,
      items: [
        { name: "ডায়াপার", img: "/mock/baby_bag.png", link: `/shop?category=${diaperLinkId}` },
        { name: "বেবি লোশন", img: "/mock/baby_bag.png", link: "/shop?category=skincare" },
        { name: "ফিডিং বোতল", img: "/mock/baby_bag.png", link: "/shop?category=feeding" }
      ]
    },
    {
      id: 2,
      title: "শিক্ষণীয় খেলনা",
      seeMoreLink: `/shop?category=${magneticSub?.parentId || 'educational-toys'}`,
      items: [
        { name: "বিল্ডিং ব্লকস", img: "/mock/toy_tiles.png", link: `/shop?category=${magneticLinkId}` },
        { name: "পাজল গেম", img: "/mock/toy_tiles.png", link: "/shop?category=puzzles" },
        { name: "সায়েন্স কিট", img: "/mock/toy_tiles.png", link: `/shop?category=${roboticLinkId}` }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 md:pb-0">
      
      {/* 1. Top Core Hero Banner */}
      <HomeHeroBanner />

      {/* 2. Horizontal Quick Category Links */}
      <CategoryNavRow />

      {/* 3. QUICK DEALS SECTION (Connects real database upload items dynamically) */}
      <QuickDealSection 
        title="Quick Deals & Special Offers"
        products={activeQuickDeals} 
      />

      {/* 4. Combo Offers Row */}
      <ComboOffersRow 
        title="স্পেশাল কম্বো অফার" 
        items={activeCombos} 
      />

      {/* 5. Baby Care Essentials Slider */}
      <HomeProductGridSlider 
        title="More Baby Care Essentials"
        viewAllLink="/shop?category=baby-care"
        products={activeBabyEssentials}
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

      {/* 7. Multi-List Top Selling / Trending Columns */}
      <MultiListSection columns={multiLists} />

      <BrandScroller 
        title="Popular Brands" 
        brands={popularBrands} 
      />

      {/* 8. Stationery Slider */}
      <HomeProductGridSlider 
        title="Stationery & Educational Deals"
        viewAllLink="/shop?category=stationery"
        products={activeStationeryDeals}
        bgColor="bg-white dark:bg-slate-900"
      />

      <div className="py-8"></div>
    </div>
  );
}

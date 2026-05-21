"use client";

import React from "react";
import { useGetAdminProductsQuery, useGetCategoriesQuery } from "@/store/admin/adminContentApi";
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

  const dbProducts = prodData?.data || [];

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
  
  // 1. Dynamic Quick Deals Slider
  const mappedQuickDeals: QuickDealProductProps[] = dbProducts.map((p: any) => ({
    id: p.id || p._id,
    name: p.nameEn || p.name,
    brand: p.brandEn || "Sodayon Selection",
    oldPrice: p.originalPrice ? `৳${p.originalPrice}` : `৳${p.price}`,
    currentPrice: `৳${p.price}`,
    discountBadge: p.discount ? `${p.discount}% OFF` : "",
    img: p.image || "https://sodayon.com/default-product.jpg",
    soldCount: String(p.totalSold || 0),
    totalStock: 100
  }));

  const activeQuickDeals = mappedQuickDeals.length > 0 ? mappedQuickDeals : mockQuickDeals;

  // 2. Dynamic Product Cards
  const mappedHomeProducts: HomeProductCardProps[] = dbProducts.map((p: any) => ({
    id: p.id || p._id,
    name: p.nameEn || p.name,
    brand: p.brandEn || "Sodayon Selection",
    oldPrice: p.originalPrice > p.price ? `৳ ${p.originalPrice}` : undefined,
    currentPrice: `৳ ${p.price}`,
    discountBadge: p.discount ? `${p.discount}% OFF` : undefined,
    badgeColor: p.discount > 20 ? "red" : "yellow",
    img: p.image || "https://sodayon.com/default-product.jpg",
    rating: p.avgRating || 5,
    reviewCount: p.reviews || 0,
    inStock: true
  }));

  const activeBabyEssentials = mappedHomeProducts.length > 0 ? mappedHomeProducts : mockBabyEssentials;
  const activeStationeryDeals = mappedHomeProducts.length > 0 ? mappedHomeProducts : mockStationeryDeals;

  // 3. Category Tree map
  const activeCategoriesCount = catData?.data?.length || 0;

  const combos = [
    { id: 1001, name: "নন-স্টপ বেবি কেয়ার কম্বো", price: "৳ ১,৫৮০", oldPrice: "৳ ১,৯৫০", img: "/mock/baby_bag.png" },
    { id: 301, name: "এসটিইএম লার্নিং কিট ডিল", price: "৳ ১,২০০", oldPrice: "৳ ১,৫০০", img: "/mock/toy_tiles.png" },
    { id: 202, name: "মাস্টারপিস আর্ট মেগা প্যাক", price: "৳ ৯৫০", oldPrice: "৳ ১,২৮০", img: "/mock/stationery_set.png" }
  ];

  const popularBrands: BrandItem[] = [
    { id: 1, name: "NeoCare", logo: "/mock/baby_bag.png", category: "Premium Diapers" },
    { id: 2, name: "Fisher-Price", logo: "/mock/toy_tiles.png", category: "Educational Toys" },
    { id: 3, name: "Faber-Castell", logo: "/mock/stationery_set.png", category: "Art & Stationery" }
  ];

  const multiLists = [
    {
      title: "বেস্ট সেলিং",
      items: dbProducts.slice(0, 4).map((p: any) => ({
        id: p.id || p._id,
        name: p.nameEn || p.name,
        price: `৳ ${p.price}`,
        img: p.image || "https://sodayon.com/default-product.jpg"
      })).concat([
        { id: 301, name: "বেবি স্কিন কেয়ার সেট", price: "৳ 900", img: "/mock/baby_bag.png" },
        { id: 302, name: "উডেন এবিসি পাজল", price: "৳ 450", img: "/mock/toy_tiles.png" }
      ])
    },
    {
      title: "নতুন এসেছে",
      items: dbProducts.slice(4, 8).map((p: any) => ({
        id: p.id || p._id,
        name: p.nameEn || p.name,
        price: `৳ ${p.price}`,
        img: p.image || "https://sodayon.com/default-product.jpg"
      })).concat([
        { id: 304, name: "স্মার্ট রিমোট কন্ট্রোল কার", price: "৳ 2100", img: "/mock/toy_tiles.png" },
        { id: 305, name: "বেবি ফিডিং বোটল সেট", price: "৳ 1200", img: "/mock/baby_bag.png" }
      ])
    },
    {
      title: "ট্রেন্ডিং",
      items: dbProducts.slice(8, 12).map((p: any) => ({
        id: p.id || p._id,
        name: p.nameEn || p.name,
        price: `৳ ${p.price}`,
        img: p.image || "https://sodayon.com/default-product.jpg"
      })).concat([
        { id: 307, name: "কিডস কীবোর্ড পিয়ানো", price: "৳ 1650", img: "/mock/toy_tiles.png" },
        { id: 308, name: "বেবি স্লিপিং ব্যাগ", price: "৳ 1400", img: "/mock/baby_bag.png" }
      ])
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
        { name: "ফিডিং বোতল", img: "/mock/baby_bag.png", link: "/shop?category=feeding" }
      ]
    },
    {
      id: 2,
      title: "শিক্ষণীয় খেলনা",
      seeMoreLink: "/shop?collection=educational-toys",
      items: [
        { name: "বিল্ডিং ব্লকস", img: "/mock/toy_tiles.png", link: "/shop?category=toys" },
        { name: "পাজল গেম", img: "/mock/toy_tiles.png", link: "/shop?category=puzzles" },
        { name: "সায়েন্স কিট", img: "/mock/toy_tiles.png", link: "/shop?category=stem" }
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
        items={combos} 
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

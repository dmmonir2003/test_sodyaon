import type { Metadata } from "next";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "সব খেলনা ও বেবি প্রোডাক্টস শপ করুন | সদায়ন",
  description: "সদায়নের বিশাল কালেকশন থেকে খেলনা, বেবি গিয়ার, স্টেম লার্নিং কিট ও বেবি কেয়ার সামগ্রী অনলাইনে কিনুন সেরা দামে।",
  keywords: ["খেলনা কালেকশন", "অনলাইন খেলনা শপ", "বেবি শপ বাংলাদেশ", "স্টেম টয়", "ডায়াপার অনলাইন"],
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "সব খেলনা ও বেবি প্রোডাক্টস শপ করুন | সদায়ন",
    description: "সদায়নের বিশাল কালেকশন থেকে খেলনা, বেবি গিয়ার, স্টেম লার্নিং কিট ও বেবি কেয়ার সামগ্রী অনলাইনে কিনুন সেরা দামে।",
    url: "https://sodayon.com/shop",
    siteName: "Sodayon",
    type: "website",
  },
};

export default function ShopPage() {
  return <ShopClient />;
}
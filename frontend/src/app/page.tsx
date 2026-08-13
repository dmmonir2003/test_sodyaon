import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";

export const metadata: Metadata = {
  title: "সদায়ন | বাংলাদেশে সেরা অনলাইন কিডস খেলনা ও বেবি কেয়ার শপ",
  description: "সদায়ন - আপনার সন্তানের মেধা বিকাশ ও আনন্দের জন্য সেরা শিক্ষামূলক খেলনা, বেবি কেয়ার সামগ্রী এবং চমৎকার অফার উপভোগ করুন।",
  keywords: ["খেলনার দোকান", "অনলাইন খেলনা শপ", "বেবি কেয়ার সামগ্রী", "স্টেম খেলনা", "বাচ্চাদের উপহার", "সদায়ন", "Sodayon Bangladesh"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "সদায়ন | বাংলাদেশে সেরা অনলাইন কিডস খেলনা ও বেবি কেয়ার শপ",
    description: "আপনার সন্তানের মেধা বিকাশ ও আনন্দের জন্য সেরা শিক্ষামূলক খেলনা এবং বেবি কেয়ার সামগ্রী অনলাইনে অর্ডার করুন।",
    url: "https://sodayon.com",
    siteName: "Sodayon",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}

import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/shared/Analytics";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer";

import ExitIntentPopup from "@/components/shared/ExitIntentPopup";
import StoreProvider from "@/store/StoreProvider";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/shared/CartDrawer";
import MobileSearchDrawer from "@/components/shared/MobileSearchDrawer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ThemeInitializer from "@/components/shared/ThemeInitializer";

const inter = Hind_Siliguri({
  variable: "--font-inter",
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["bengali", "latin"],
});

const outfit = Noto_Serif_Bengali({
  variable: "--font-outfit",
  weight: ['400', '700', '900'],
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | প্লেটাইম ই-কমার্স",
    default: "প্লেটাইম | আপনার সন্তানের জন্য নিখুঁত খেলনা খুঁজুন",
  },
  description: "বয়স অনুযায়ী দারুণ সব খেলনার রিকমেন্ডেশন, চমৎকার গিফট সাজেশন এবং নিখুঁত খেলার সময়ের জন্য আমাদের এআই প্যারেন্টিং অ্যাসিস্ট্যান্স আবিষ্কার করুন।",
  keywords: ["খেলনা", "বাচ্চা", "এআই খেলনা ফাইন্ডার", "শিক্ষামূলক খেলনা", "বাচ্চাদের উপহার"],
  openGraph: {
    title: "প্লেটাইম | আপনার সন্তানের জন্য নিখুঁত খেলনা খুঁজুন",
    description: "বয়স অনুযায়ী দারুণ সব খেলনার রিকমেন্ডেশন, চমৎকার গিফট সাজেশন এবং নিখুঁত খেলার সময়ের জন্য আমাদের এআই প্যারেন্টিং অ্যাসিস্ট্যান্স আবিষ্কার করুন।",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeInitializer />
        <StoreProvider>
          <Analytics />
          <Navbar />
          <main className="flex-grow flex flex-col pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBottomNav  />
          <ExitIntentPopup />
          <CartDrawer />
          <MobileSearchDrawer />
          <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  );
}


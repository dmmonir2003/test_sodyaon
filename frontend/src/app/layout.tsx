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
import GlobalNavigationLoader from "@/components/shared/GlobalNavigationLoader";

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sodayon.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | সদায়ন ই-কমার্স",
    default: "সদায়ন | আপনার সন্তানের জন্য নিখুঁত খেলনা খুঁজুন",
  },
  description: "সদায়ন - বিশ্বের সবচেয়ে স্মার্ট খেলনার দোকান। বয়স অনুযায়ী দারুণ সব খেলনার রিকমেন্ডেশন, চমৎকার গিফট সাজেশন এবং নিখুঁত খেলার সময়ের জন্য আমাদের এআই প্যারেন্টিং অ্যাসিস্ট্যান্স আবিষ্কার করুন।",
  keywords: ["সদায়ন", "খেলনা", "বাচ্চা", "এআই খেলনা ফাইন্ডার", "শিক্ষামূলক খেলনা", "বাচ্চাদের উপহার", "Sodayon", "Kids Toys Bangladesh"],
  authors: [{ name: "Sodayon Team", url: SITE_URL }],
  creator: "Sodayon",
  publisher: "Sodayon",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "সদায়ন | আপনার সন্তানের জন্য নিখুঁত খেলনা খুঁজুন",
    description: "সদায়ন - বিশ্বের সবচেয়ে স্মার্ট খেলনার দোকান। বয়স অনুযায়ী দারুণ সব খেলনার রিকমেন্ডেশন, চমৎকার গিফট সাজেশন এবং নিখুঁত খেলার সময়ের জন্য আমাদের এআই প্যারেন্টিং অ্যাসিস্ট্যান্স আবিষ্কার করুন।",
    url: SITE_URL,
    siteName: "সদায়ন",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/promo_toys_banner_1777417968994.png`,
        width: 1200,
        height: 630,
        alt: "সদায়ন ই-কমার্স কিডস শপ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সদায়ন | আপনার সন্তানের জন্য নিখুঁত খেলনা খুঁজুন",
    description: "সদায়ন - বিশ্বের সবচেয়ে স্মার্ট খেলনার দোকান। বয়স অনুযায়ী দারুণ সব খেলনার রিকমেন্ডেশন ও উপহার।",
    images: [`${SITE_URL}/promo_toys_banner_1777417968994.png`],
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
          <GlobalNavigationLoader />
          <Analytics />
          <Navbar />
          <main className="flex-grow flex flex-col pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileBottomNav  />
          {/* <ExitIntentPopup /> */}
          <CartDrawer />
          <MobileSearchDrawer />
          <ScrollToTop />
        </StoreProvider>
      </body>
    </html>
  );
}


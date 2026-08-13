import type { Metadata } from "next";
import CartClient from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "শপিং কার্ট | সদায়ন",
  description: "আপনার শপিং কার্ট দেখুন এবং অর্ডার প্রক্রিয়া সম্পন্ন করুন - সদায়ন ই-কমার্স।",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  return <CartClient />;
}

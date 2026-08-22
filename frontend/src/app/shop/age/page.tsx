// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import ProductCard from "@/components/shared/ProductCard";
import AgeFinder from "@/components/shop/AgeFinder";
import PageLoader from "@/components/shared/PageLoader";
import { Suspense } from "react";

export default function AgeFinderPage() {
  return (
    <Suspense fallback={<PageLoader text="বয়স অনুযায়ী খেলনা লোড হচ্ছে..." fullScreen={false} />}>
      <AgeFinder />
    </Suspense>
  );
}

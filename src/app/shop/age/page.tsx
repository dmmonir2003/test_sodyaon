// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import ProductCard from "@/components/shared/ProductCard";
import AgeFinder from "@/components/shop/AgeFinder";
import { Suspense } from "react";

export default function AgeFinderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AgeFinder />
    </Suspense>
  );
}

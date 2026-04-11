"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // In a real application, you would initialize your tracking pixel (e.g. Google Analytics / Vercel Analytics) here
    // Example: window.gtag('config', 'G-XXXXXXX', { page_path: pathname });
    const fullUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    console.log(`[Analytics] Page View Tracked: ${fullUrl}`);
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}

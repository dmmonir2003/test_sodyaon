"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import PageLoader from "./PageLoader";

function NavigationEventListener({ onChange }: { onChange: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onChange();
  }, [pathname, searchParams, onChange]);

  return null;
}

export default function GlobalNavigationLoader() {
  const [loading, setLoading] = useState(false);

  const handleRouteStart = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <Suspense fallback={null}>
        <NavigationEventListener onChange={handleRouteStart} />
      </Suspense>
      {loading && <PageLoader text="সদায়ন..." fullScreen={true} />}
    </>
  );
}

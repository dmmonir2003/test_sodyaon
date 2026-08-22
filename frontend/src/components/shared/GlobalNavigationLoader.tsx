"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

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
    }, 500);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <Suspense fallback={null}>
        <NavigationEventListener onChange={handleRouteStart} />
      </Suspense>
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-[99999] h-1 overflow-hidden pointer-events-none">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      )}
    </>
  );
}

"use client";

import React from "react";
import AnimatedLogo from "./AnimatedLogo";
import { motion } from "framer-motion";

interface PageLoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export default function PageLoader({
  text = "সদায়ন লোড হচ্ছে...",
  fullScreen = true,
}: PageLoaderProps) {
  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-md transition-all duration-300"
          : "w-full py-16 flex flex-col items-center justify-center min-h-[300px]"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl max-w-xs text-center">
        {/* Glow halo behind logo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-2xl animate-pulse pointer-events-none" />

        {/* Centered Animated Logo */}
        <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <AnimatedLogo className="w-full h-full" />
        </div>

        {/* Text & Brand */}
        <div className="relative z-10 mt-4 flex flex-col items-center gap-1.5">
          <span className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide">
            সদা<span className="text-primary-500">য়ন</span>
          </span>
          <p className="text-xs sm:text-sm font-medium text-slate-300 animate-pulse">
            {text}
          </p>
        </div>

        {/* Animated Progress Line */}
        <div className="relative z-10 w-36 sm:w-44 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-4">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}

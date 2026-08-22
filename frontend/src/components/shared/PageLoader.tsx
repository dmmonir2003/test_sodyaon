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
  fullScreen = false,
}: PageLoaderProps) {
  // Animation variants for the brand text "সদায়ন" matching Navbar
  const textContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 3.2, // Starts right after AnimatedLogo cart arrives
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 10 },
    },
  };

  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 transition-all duration-300"
          : "flex-1 min-h-[60vh] w-full py-16 px-4 flex flex-col items-center justify-center"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        {/* Centered Navbar style Logo + Animated Text */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <AnimatedLogo className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-slate-800 dark:text-white" />
          <motion.span
            className="font-heading font-bold text-slate-800 dark:text-white tracking-tight flex -ml-1 text-2xl sm:text-4xl md:text-5xl"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={letterVariants}>স</motion.span>
            <motion.span variants={letterVariants}>দা</motion.span>
            <motion.span variants={letterVariants} className="text-primary-600">
              য়
            </motion.span>
            <motion.span variants={letterVariants} className="text-primary-600">
              ন
            </motion.span>
          </motion.span>
        </div>

        {/* Minimal text indicator */}
        {text && (
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse">
            {text}
          </p>
        )}

        {/* Minimal Progress Line without card or backdrop */}
        <div className="w-32 sm:w-44 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 rounded-full"
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

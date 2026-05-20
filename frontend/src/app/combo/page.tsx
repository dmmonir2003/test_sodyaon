"use client";

import { useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Plus, PackagePlus, Sparkles, ArrowRight, Check, CheckCircle2, ShoppingCart } from "lucide-react";
import ComboSlider from "@/components/combo/ComboSlider";
import ComboQuickCards from "@/components/combo/ComboQuickCards";
import ComboProductSlider from "@/components/combo/ComboProductSlider";
import ComboRow from "@/components/combo/ComboRow";
import { motion } from "framer-motion";
import CustomComboCreator from "@/components/combo/CustomComboCreator";

export default function ComboPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-32">
      {/* Premium Hero Slider Section */}
      <ComboSlider />

      {/* Quick Action Cards Section */}
      <ComboQuickCards />

      {/* Popular Combo Products Slider */}
      <ComboProductSlider />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16 relative z-20">
        
        {/* NEW INTERACTIVE FEATURE: Build Your Own Combo (Side-by-Side Desktop) */}
        <CustomComboCreator />

       
      </div>
    </div>
  );
}

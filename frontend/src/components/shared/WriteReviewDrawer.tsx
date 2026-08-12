"use client";

import { X, Star, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCreateReviewMutation } from "@/store/user/products/productsApi";

interface WriteReviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  productImage: string;
  price: string | number;
  oldPrice?: string | number;
}

export default function WriteReviewDrawer({
  isOpen,
  onClose,
  productId,
  productName,
  productImage,
  price,
  oldPrice,
}: WriteReviewDrawerProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showAnimated, setShowAnimated] = useState(false);
  
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMounted(true);
      setErrorMsg("");
      const timer = setTimeout(() => {
        setShowAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      setShowAnimated(false);
      setRating(0);
      setReviewText("");
      setErrorMsg("");
      const timer = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async () => {
    if (rating === 0 || isSubmitting) return;
    setErrorMsg("");
    try {
      await createReview({
        productId,
        rating,
        body: reviewText || "Good product!",
      }).unwrap();
      alert("রিভিউ সফলভাবে পোস্ট হয়েছে! / Review submitted successfully!");
      onClose();
    } catch (err: any) {
      console.error("Failed to submit review", err);
      const serverMessage = err.data?.message || err.message || "রিভিউ সাবমিট করতে সমস্যা হয়েছে।";
      setErrorMsg(serverMessage);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm transition-opacity duration-500 ${
          showAnimated ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[110] bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:max-w-lg md:mx-auto md:bottom-auto md:top-1/2 md:rounded-2xl max-h-[90vh] flex flex-col ${
          showAnimated
            ? "translate-y-0 md:-translate-y-1/2 opacity-100 md:scale-100"
            : "translate-y-full md:translate-y-[100%] md:opacity-0 md:scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8" /> {/* Spacer for centering */}
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Write a Review</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 flex-1">
          {/* Product Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0 flex items-center justify-center relative">
              {productImage ? (
                <Image src={productImage} alt={productName} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-primary-100" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                {productName}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'fill-current' : ''}`} />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-slate-900 dark:text-white">৳ {price}</span>
                {oldPrice && (
                  <span className="text-xs text-slate-500 line-through">৳ {oldPrice}</span>
                )}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="text-center mb-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Please rate this product</p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                    strokeWidth={1}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="mb-4">
            <textarea
              className="w-full h-32 p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Describe your experience (optional)"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>

          {/* Upload Photo */}
          <button className="w-full py-4 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm">Upload Photo ( up to 5 )</span>
          </button>
          {errorMsg && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-red-800 dark:text-red-300 text-xs font-bold leading-normal">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-3 pb-safe">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-primary-600 dark:text-primary-400 font-semibold border border-primary-500 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 py-3 font-semibold rounded-xl text-white transition-colors ${
              rating > 0 && !isSubmitting
                ? "bg-primary-600 hover:bg-primary-700 shadow-md"
                : "bg-slate-300 dark:bg-slate-700 cursor-not-allowed"
            }`}
            disabled={rating === 0 || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}

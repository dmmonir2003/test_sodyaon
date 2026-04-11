'use client';

import Link from 'next/link';
import { ChevronLeft, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Large 404 heading */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            404
          </div>
        </div>

        {/* Main message */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          পেজটি খুঁজে পাওয়া যাচ্ছে না
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
          আমরা দুঃখিত! আপনি যে পেজটি খুঁজছেন তা আমাদের সার্ভারে পাওয়া যাচ্ছে না।
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-primary-600 text-white rounded-full font-bold hover:bg-slate-800 dark:hover:bg-primary-700 transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            হোম পেজে যান
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            পিছনে ফিরে যান
          </button>
        </div>

        {/* Quick navigation links */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            অথবা এই জনপ্রিয় পেজগুলোতে ভিজিট করুন:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 font-semibold transition-colors group"
            >
              কিনুন
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 font-semibold transition-colors group"
            >
              ব্লগ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/deals"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 font-semibold transition-colors group"
            >
              অফার
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 font-semibold transition-colors group"
            >
              যোগাযোগ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

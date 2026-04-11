'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md w-full">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text mb-4">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Page Not Found
          </p>
          <p className="text-muted-foreground text-lg">
            Oops! The page you&apos;re looking for seems to have wandered off.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
            <Search className="w-24 h-24 text-blue-400 opacity-50" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            className="gap-2"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="gap-2"
          >
            <button onClick={() => window.history.back()}>
              <ChevronLeft className="w-4 h-4" />
              Go Back
            </button>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Here are some helpful links instead:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/shop"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Shop
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/blog"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Blog
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/ai-tools/gift-finder"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Gift Finder
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/features"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

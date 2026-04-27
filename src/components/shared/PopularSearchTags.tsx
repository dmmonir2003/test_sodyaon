"use client";

import React from "react";
import Link from "next/link";

const SEARCH_TAGS = [
  "ম্যাগনা-টাইলস",
  "Educational Toys",
  "Lego Blocks",
  "Puzzle Sets",
  "Board Games",
  "Action Figures",
  "Science Kits",
  "Rubik's Cube",
  "Doll Houses",
  "Remote Control Cars",
  "Art Supplies",
  "Soft Toys"
];

export default function PopularSearchTags({ onTagClick }: { onTagClick?: () => void }) {
  return (
    <div className="w-full">
      <h3 className="text-slate-600 dark:text-slate-400 font-medium mb-3 text-[15px]">
        Popular right now
      </h3>
      <div className="flex flex-wrap gap-2">
        {SEARCH_TAGS.map((tag) => (
          <Link
            key={tag}
            href={`/search?q=${encodeURIComponent(tag)}`}
            onClick={onTagClick}
            className="px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { MessageCircle } from "lucide-react";

export default function SupportTicketContent() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 px-6 py-20 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400 mb-4 border border-slate-100 dark:border-slate-700">
        <MessageCircle className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No Active Tickets</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">You don't have any support tickets currently open. If you need help with an order, create a new ticket.</p>
    </div>
  );
}

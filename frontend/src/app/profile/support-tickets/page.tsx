import SupportTicketContent from "@/components/profile/support-tickets/SupportTicketContent";

export default function SupportTicketsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top page title card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 px-6 py-5 flex justify-between items-center">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Support tickets</h1>
        <button className="text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg transition-colors">
          CREATE TICKET
        </button>
      </div>

      <SupportTicketContent />
    </div>
  );
}

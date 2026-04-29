import AddSpecialDayForm from "@/components/profile/special-day/AddSpecialDayForm";

export default function SpecialDayPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative h-full">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex justify-between items-center bg-transparent backdrop-blur-sm relative">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Manage Special Day</h1>
        <AddSpecialDayForm />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 px-6 py-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No Special Day added yet</h2>
        <p className="text-slate-500 dark:text-slate-400">You haven't added any special day.</p>
      </div>

    </div>
  );
}

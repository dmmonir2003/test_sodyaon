import { Baby } from "lucide-react";
import AddChildForm from "@/components/profile/child-profile/AddChildForm";

export default function ChildProfilePage() {
  // Simulating server-side data fetching
  const children = [
    { name: "রায়ান", age: "৫ বছর", interests: "গাড়ি, লেগো, সুপারহিরো" },
    { name: "সারা", age: "৩ বছর", interests: "পুতুল, আর্ট এন্ড ক্রাফট" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">চাইল্ড প্রোফাইল</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">এআই গিফট ফাইন্ডারের জন্য আপনার সন্তানের তথ্য সংরক্ষণ করুন।</p>
        </div>
        <AddChildForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 flex items-center justify-center flex-shrink-0 border border-secondary-100 dark:border-secondary-800/50">
              <Baby className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{child.name}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">বয়স: {child.age}</p>
              <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                <span className="text-primary-600 dark:text-primary-400 font-bold">আগ্রহ:</span> {child.interests}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

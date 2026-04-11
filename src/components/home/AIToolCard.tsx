import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AIToolCard({ title, desc, icon, color }: { title: string; desc: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow relative overflow-hidden group">
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 ${color}`}></div>
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${color}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold font-heading mb-3 text-slate-900 dark:text-white relative z-10">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-8 relative z-10">{desc}</p>
      <Link href="#" className="inline-flex items-center gap-2 font-bold text-primary-600 hover:text-primary-800 transition-colors relative z-10">
        এখনই ট্রাই করুন <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

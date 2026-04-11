import { ArrowRight } from "lucide-react";

export default function BlogCard({ title, date, img }: { title: string; date: string; img: string }) {
  return (
    <div className="group cursor-pointer">
      <div className={`w-full h-56 rounded-3xl ${img} mb-6 overflow-hidden relative shadow-sm group-hover:shadow-lg transition-all`}>
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
        <span>{date}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <span className="text-primary-600 font-medium">প্লে আইডিয়াস</span>
      </div>
      <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">{title}</h3>
      <span className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">
        আর্টিকেলটি পড়ুন <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  );
}

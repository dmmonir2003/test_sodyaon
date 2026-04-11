import { Quote, Star } from "lucide-react";

export default function TestimonialCard({ name, quote, rating }: { name: string; quote: string; rating: number }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 relative">
      <Quote className="w-10 h-10 text-primary-200 dark:text-slate-700 absolute top-6 right-6" />
      <div className="flex gap-1 mb-6 mt-2 relative z-10">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
        ))}
      </div>
      <p className="text-slate-600 dark:text-slate-300 mb-8 italic relative z-10 leading-relaxed text-lg">"{quote}"</p>
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 bg-indigo-100 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-primary-600 dark:text-primary-400">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
          <span className="text-sm text-slate-500">Verified Buyer</span>
        </div>
      </div>
    </div>
  );
}

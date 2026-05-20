import Link from "next/link";

export default function AgeButton({ age, label }: { age: string; label: string }) {
  return (
    <Link href={`/shop?age=${age}`} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-transparent hover:border-primary-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="text-2xl md:text-3xl font-extrabold text-primary-600 dark:text-primary-400 mb-2">{age}</div>
      <div className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</div>
    </Link>
  );
}

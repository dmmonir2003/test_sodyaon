import Link from "next/link";

export default function NavLink({
  href,
  text,
  className = "",
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 font-bold text-sm lg:text-base transition-colors ${className}`}
    >
      {text}
    </Link>
  );
}
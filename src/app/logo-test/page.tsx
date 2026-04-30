import AnimatedLogo from "@/components/shared/AnimatedLogo";

export default function LogoTestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          Animated Logo Test
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Refresh the page to see the animation replay.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-xl flex items-center justify-center min-w-[300px] min-h-[300px]">
        {/* We use a specific color so we can see it clearly, or let it inherit currentColor */}
        <AnimatedLogo className="w-[400px] h-[400px] text-slate-900 dark:text-white" />
      </div>
    </div>
  );
}

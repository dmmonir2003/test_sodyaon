import DeleteAccountForm from "@/components/profile/delete-account/DeleteAccountForm";

export default function DeleteAccountPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top page title card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 px-6 py-5">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Delete Your Account</h1>
      </div>

      <DeleteAccountForm />
    </div>
  );
}

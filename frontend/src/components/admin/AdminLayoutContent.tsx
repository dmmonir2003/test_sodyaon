"use client";

import { useAuth } from "@/components/admin/AuthContext";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminSidebar from "./AdminSidebar";
import RoleSimulator from "@/components/admin/RoleSimulator";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-slate-400">
        <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold animate-pulse">
          Authenticating Secure Token...
        </p>
      </div>
    );
  }

  // Intercept unauthenticated users
  if (!user) {
    return <AdminLoginForm />;
  }

  // Base layout wrapper. The individual pages will enforce strict module blocking.
  // We do NOT block root layoute here because we want the sidebar to always show,
  // and the children component will render the "Access Denied" if unauthorised.
  return (
    <div className="h-screen w-full flex bg-slate-950 font-sans text-slate-200 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto w-full flex-grow flex flex-col">
          {children}
        </div>
      </main>
      <RoleSimulator />
    </div>
  );
}

export default AdminLayoutContent;

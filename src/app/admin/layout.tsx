import AdminLayoutContent from "@/components/admin/AdminLayoutContent";
import { AuthProvider } from "@/components/admin/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This completely overrides the main app's Navbar and Footer by not rendering them.
  // Layout.tsx in subdirectories in App Router nest inside the root layout.
  // The root layout has a <Navbar> and <Footer> directly inside the <body>.
  // Wait, if root layout.tsx renders <Navbar>, the admin pages will STILL have the customer Navbar!

  return (
    <AuthProvider>
      {/* We use position absolute to cover exactly the screen, effectively hiding the parent Layout's visual clutter like Navbars and Footers since we are in a sub-layout. 
          Usually we use Route Groups (app/(store)/... and app/(admin)/...) but to avoid massive refactoring of the user's project, we layer the Admin Dashboard absolute on top of everything! */}
      <div className="fixed inset-0 z-[100] bg-slate-950">
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </div>
    </AuthProvider>
  );
}

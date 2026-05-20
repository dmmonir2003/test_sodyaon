import { Home, Edit3 } from "lucide-react";
import AddressForm from "@/components/profile/address/AddressForm";

export default function AddressPage() {
  // Simulating server-side data fetching
  const addresses = [
    {
      id: 1,
      type: "Home Address",
      addressLine: "sdasdfa",
      district: "Bagerhat",
      thana: "Bagerhat Sadar",
      postalCode: "1290",
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 relative h-full">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex justify-between items-center relative">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Address</h1>
        <AddressForm />
      </div>

      <div className="grid grid-cols-1 gap-8 items-start">
        {/* Address List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 md:p-6">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400 font-bold">
              <div className="bg-primary-50 dark:bg-primary-900/40 p-2.5 rounded-full">
                <Home className="w-5 h-5" />
              </div>
              <span>Home Address</span>
            </div>
            <button className="text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors">
              Edit
            </button>
          </div>

          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Address line</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{address.addressLine}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">District/City</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{address.district}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Thana/Upazila</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{address.thana}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Postal code</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{address.postalCode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

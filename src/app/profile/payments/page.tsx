import { CreditCard, Smartphone } from "lucide-react";
import PaymentMethods from "@/components/profile/payments/PaymentMethods";

export default function PaymentsPage() {
  const savedMethods = [
    { id: 1, type: "Mobile Banking", provider: "bKash", details: "017********", icon: <Smartphone className="w-5 h-5" /> },
    { id: 2, type: "Credit Card", provider: "Visa", details: "**** **** **** 4242", icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top page title card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 px-6 py-5">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Payments</h1>
      </div>

      <PaymentMethods methods={savedMethods} />
    </div>
  );
}

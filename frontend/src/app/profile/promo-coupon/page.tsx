import CouponContent from "@/components/profile/promo-coupon/CouponContent";

export default function PromoCouponPage() {
  const coupons = [
    { name: "App First Order", validity: "31 May, 2026", code: "GBAPP10" },
    { name: "GB Banglalink", validity: "30 June, 2026", code: "GBBL05" },
    { name: "GP Star", validity: "30 June, 2026", code: "GBGP5" },
    { name: "Robi Coupon", validity: "30 June, 2026", code: "RGB5" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top page title card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 px-6 py-5">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Promo or Coupon</h1>
      </div>

      <CouponContent coupons={coupons} />
    </div>
  );
}

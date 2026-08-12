"use client";

import { useAuth } from "@/components/admin/AuthContext";
import {
  ShieldAlert,
  Megaphone,
  CheckCircle2,
  Eye,
  EyeOff,
  Save,
  Activity,
  Play,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  useGetPrivateMarketingSettingsQuery,
  useUpdateMarketingSettingsMutation,
} from "@/store/admin/settingsApi";
import { trackClientAddToCart } from "@/utils/marketing";

export default function MarketingPage() {
  const { user } = useAuth();
  const { data: response, isLoading } = useGetPrivateMarketingSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateMarketingSettingsMutation();

  // Local Form state
  const [formData, setFormData] = useState({
    gtmContainerId: "",
    ga4MeasurementId: "",
    metaPixelId: "",
    metaAccessToken: "",
    metaTestEventCode: "",
    tiktokPixelId: "",
    tiktokAccessToken: "",
    tiktokTestEventCode: "",
  });

  // Toggle Visibility for tokens
  const [showMetaToken, setShowMetaToken] = useState(false);
  const [showTiktokToken, setShowTiktokToken] = useState(false);

  // Status updates
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // QA Test event values
  const [testProduct, setTestProduct] = useState({
    id: "test_123",
    name: "অ্যাডিলেড এআই রোবট খেলনা",
    price: 1850,
  });

  // Sync loaded settings to local state
  useEffect(() => {
    if (response?.data) {
      setFormData({
        gtmContainerId: response.data.gtmContainerId || "",
        ga4MeasurementId: response.data.ga4MeasurementId || "",
        metaPixelId: response.data.metaPixelId || "",
        metaAccessToken: response.data.metaAccessToken || "",
        metaTestEventCode: response.data.metaTestEventCode || "",
        tiktokPixelId: response.data.tiktokPixelId || "",
        tiktokAccessToken: response.data.tiktokAccessToken || "",
        tiktokTestEventCode: response.data.tiktokTestEventCode || "",
      });
    }
  }, [response]);

  if (!user) return null;

  // Enforce security role check
  if (!user.permissions.canManageMarketing) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black font-heading text-white mb-4">Marketing Tools Locked</h1>
        <p className="text-slate-400 max-w-md font-sans">
          API configurations and tracking pixel management require the <span className="text-pink-400 font-bold">DIGITAL_MARKETER</span> or <span className="text-pink-400 font-bold">SUPER_ADMIN</span> security clearance.
        </p>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      await updateSettings(formData).unwrap();
      setMessage({ text: "সবগুলো মার্কেটিং কনফিগারেশন সফলভাবে ডাটাবেজে সেভ হয়েছে!", type: "success" });
      setTimeout(() => setMessage(null), 5000);
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err?.data?.message || "কনফিগারেশন সেভ করতে সমস্যা হয়েছে।", type: "error" });
    }
  };

  // Dispatch a test client event to check setup locally
  const runTestEvent = () => {
    const eventId = `test_event_${Date.now()}`;
    trackClientAddToCart(testProduct, 1, eventId);
    alert(`টেস্ট এড-টু-কার্ট ইভেন্ট ট্রিগার করা হয়েছে!\nEvent ID: ${eventId}\nকনসোলে browser tracking payloads দেখে নিতে পারেন।`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">লোডিং মার্কেটিং সেটিংস...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-pink-400" />
            Marketing & Tracking APIs
          </h1>
          <p className="text-slate-400 mt-1 font-sans">
            Configure Google Tag Manager, GA4, Meta Conversion API (CAPI), and TikTok Events API dynamically.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl border font-sans text-sm animate-in slide-in-from-top duration-300 ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Google (Analytics 4 & Tag Manager) */}
          <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <h2 className="flex items-center gap-3 font-bold text-lg text-slate-100 font-heading">
                <span className="h-7 w-7 rounded bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-sm font-sans">G</span>
                Google Marketing Stack
              </h2>
              {formData.gtmContainerId || formData.ga4MeasurementId ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              ) : (
                <span className="text-xs text-slate-500 font-medium">Not Connected</span>
              )}
            </div>
            
            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">Google Tag Manager Container ID</label>
                <input
                  type="text"
                  placeholder="GTM-XXXXXXX"
                  value={formData.gtmContainerId}
                  onChange={(e) => setFormData({ ...formData, gtmContainerId: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-100 font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">Google Analytics 4 Measurement ID</label>
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={formData.ga4MeasurementId}
                  onChange={(e) => setFormData({ ...formData, ga4MeasurementId: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-100 font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 2. TikTok Pixel & Events API */}
          <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <h2 className="flex items-center gap-3 font-bold text-lg text-slate-100 font-heading">
                <span className="h-7 w-7 rounded bg-black border border-slate-700 flex items-center justify-center font-bold text-sm font-sans">🎵</span>
                TikTok Events Stack
              </h2>
              {formData.tiktokPixelId ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              ) : (
                <span className="text-xs text-slate-500 font-medium">Not Connected</span>
              )}
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">TikTok Pixel ID</label>
                <input
                  type="text"
                  placeholder="CTXXXXXXXXXXXXXXXX"
                  value={formData.tiktokPixelId}
                  onChange={(e) => setFormData({ ...formData, tiktokPixelId: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-100 font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">TikTok Events Access Token (Server CAPI)</label>
                <div className="relative">
                  <input
                    type={showTiktokToken ? "text" : "password"}
                    placeholder="Enter Private TikTok Events API Access Token"
                    value={formData.tiktokAccessToken}
                    onChange={(e) => setFormData({ ...formData, tiktokAccessToken: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 pl-4 pr-12 py-2.5 rounded-xl text-slate-100 font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTiktokToken(!showTiktokToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showTiktokToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">TikTok Test Event Code (Optional Developer QA)</label>
                <input
                  type="text"
                  placeholder="TESTXXXX"
                  value={formData.tiktokTestEventCode}
                  onChange={(e) => setFormData({ ...formData, tiktokTestEventCode: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-100 font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 3. Meta (Facebook) Pixel & Conversion API (CAPI) */}
          <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-6 space-y-4 md:col-span-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <h2 className="flex items-center gap-3 font-bold text-lg text-slate-100 font-heading">
                <span className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm font-sans">f</span>
                Meta Facebook Pixel & Conversion API (CAPI)
              </h2>
              {formData.metaPixelId ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              ) : (
                <span className="text-xs text-slate-500 font-medium">Not Connected</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">Meta Pixel ID</label>
                <input
                  type="text"
                  placeholder="1234567890"
                  value={formData.metaPixelId}
                  onChange={(e) => setFormData({ ...formData, metaPixelId: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-100 font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1">Meta Test Event Code (For Facebook CAPI testing)</label>
                <input
                  type="text"
                  placeholder="TESTXXXXX"
                  value={formData.metaTestEventCode}
                  onChange={(e) => setFormData({ ...formData, metaTestEventCode: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl text-slate-100 font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs text-slate-400 font-semibold mb-1">Meta System User Access Token (Private Server-to-Server)</label>
                <div className="relative">
                  <input
                    type={showMetaToken ? "text" : "password"}
                    placeholder="Enter Private System User Access Token (EAA...)"
                    value={formData.metaAccessToken}
                    onChange={(e) => setFormData({ ...formData, metaAccessToken: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 pl-4 pr-12 py-2.5 rounded-xl text-slate-100 font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMetaToken(!showMetaToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showMetaToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-pink-500/20 active:scale-98 font-sans"
          >
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Save className="h-5 w-5" />
            )}
            Save Configuration
          </button>
        </div>
      </form>

      {/* 🧪 Advanced QA Validation Test sandbox */}
      <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h3 className="flex items-center gap-2 font-bold text-slate-200 font-heading text-lg">
          <Activity className="h-5 w-5 text-indigo-400" />
          Analytics Integration Test Sandbox
        </h3>
        <p className="text-slate-400 text-sm font-sans">
          Use this sandbox to trigger real-time browser pixel events to test that your scripts are injecting, executing, and sending analytics packages successfully. Open your browser console or Tag Assistant to see the outputs!
        </p>

        <div className="flex flex-wrap items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/50 font-sans">
          <div className="flex-1 min-w-[200px]">
            <span className="block text-[10px] text-slate-500 uppercase font-black">Simulation Target Toy</span>
            <span className="font-bold text-slate-300">{testProduct.name}</span>
            <span className="text-xs text-slate-500 block">৳{testProduct.price} BDT</span>
          </div>

          <button
            type="button"
            onClick={runTestEvent}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors font-sans text-sm"
          >
            <Play className="h-4 w-4 fill-white" />
            Trigger Test AddToCart
          </button>
        </div>
      </div>
    </div>
  );
}

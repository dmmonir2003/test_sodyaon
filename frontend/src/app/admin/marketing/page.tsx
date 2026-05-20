"use client";

import { useAuth } from "@/components/admin/AuthContext";
import { ShieldAlert, Megaphone, Link2, PlusCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function MarketingPage() {
  const { user } = useAuth();
  const [pixels, setPixels] = useState({
    facebook: "FB-102938485746",
    tiktok: "",
    google: "G-A7B8C9D0E1"
  });

  if (!user) return null;

  if (!user.permissions.canManageMarketing) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black font-heading text-white mb-4">Marketing Tools Locked</h1>
        <p className="text-slate-400 max-w-md">
          API configurations and tracking pixel management require the <span className="text-primary-400 font-bold">DIGITAL_MARKETER</span> security clearance. You are currently logged in as <span className="font-bold">{user.role}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-pink-400" />
            Marketing & Tracking APIs
          </h1>
          <p className="text-slate-400 mt-1">Configure your Facebook Pixel, TikTok tags, and Google Analytics safely.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Facebook Pixel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3 font-bold text-lg text-white">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold font-sans">f</div>
              Facebook Meta Pixel
            </div>
            {pixels.facebook ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Link2 className="h-5 w-5 text-slate-500" />}
          </div>
          <p className="text-xs text-slate-400 mb-4">Connect Facebook to track ad conversions and build target audiences.</p>
          <input 
            type="text" 
            placeholder="Enter Pixel ID (e.g. FB-XXXXXXXXX)"
            value={pixels.facebook}
            onChange={e => setPixels({...pixels, facebook: e.target.value})}
            className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-white font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors mb-3"
          />
          <button className={`w-full py-2.5 rounded-xl font-bold transition-colors ${pixels.facebook ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
            {pixels.facebook ? 'Update Configuration' : 'Connect Facebook API'}
          </button>
        </div>

        {/* TikTok Pixel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3 font-bold text-lg text-white">
              <div className="h-8 w-8 rounded bg-black border border-slate-700 flex items-center justify-center text-white font-bold font-sans">🎵</div>
              TikTok Events API
            </div>
            {pixels.tiktok ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Link2 className="h-5 w-5 text-slate-500" />}
          </div>
          <p className="text-xs text-slate-400 mb-4">Sync server-side events directly to TikTok Ads Manager seamlessly.</p>
          <input 
            type="text" 
            placeholder="Enter TikTok Pixel ID"
            value={pixels.tiktok}
            onChange={e => setPixels({...pixels, tiktok: e.target.value})}
            className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-white font-mono text-sm focus:border-pink-500 focus:outline-none transition-colors mb-3"
          />
          <button className={`w-full py-2.5 rounded-xl font-bold transition-colors ${pixels.tiktok ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700' : 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/20'}`}>
            {pixels.tiktok ? 'Update Configuration' : 'Connect TikTok API'}
          </button>
        </div>

        {/* Google Analytics */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:col-span-2">
           <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3 font-bold text-lg text-white">
              <div className="h-8 w-8 rounded bg-white flex items-center justify-center text-slate-800 font-black font-sans">G</div>
              Google Analytics 4
            </div>
            {pixels.google ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Link2 className="h-5 w-5 text-slate-500" />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input 
                type="text" 
                placeholder="G-Measurement ID"
                value={pixels.google}
                onChange={e => setPixels({...pixels, google: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-white font-mono text-sm focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
            <button className="w-full py-3 rounded-xl font-bold transition-colors bg-slate-800 text-white border border-slate-700 hover:bg-slate-700">
               Verify Tag Connection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

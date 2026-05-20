"use client";

import { useState } from "react";
import { useAuth, Role } from "./AuthContext";
import { Shield, ChevronUp, ChevronDown, Check } from "lucide-react";

export default function RoleSimulator() {
  const { user, setRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { value: Role; label: string; desc: string }[] = [
    { value: "SUPER_ADMIN", label: "👑 Super Admin", desc: "Full god mode over all." },
    { value: "INVESTOR", label: "📈 Investor", desc: "Read-only analytics." },
    { value: "FINANCE_MANAGER", label: "💰 Finance Mgr", desc: "Cost & profit math." },
    { value: "DIGITAL_MARKETER", label: "🎯 Marketer", desc: "APIs & tracking." },
    { value: "CONTENT_MANAGER", label: "✏️ Content Mgr", desc: "Product & Hero edits." },
  ];

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden p-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="text-xs font-bold text-slate-400 uppercase pb-2 px-2 border-b border-slate-700/50 mb-2">
            Simulate Role
          </div>
          <div className="space-y-1">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => {
                  setRole(r.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  user.role === r.value 
                    ? "bg-primary-600 text-white font-bold" 
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    {r.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${user.role === r.value ? "text-primary-100" : "text-slate-500"}`}>
                    {r.desc}
                  </div>
                </div>
                {user.role === r.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border-2 border-primary-500 text-white px-4 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <Shield className="h-5 w-5 text-primary-400" />
        <span className="text-sm font-bold truncate max-w-[120px]">
          {roles.find(r => r.value === user.role)?.label || user.role}
        </span>
        {isOpen ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronUp className="h-4 w-4 text-slate-400" />}
      </button>
    </div>
  );
}

"use client";

import { useAuth } from "@/components/admin/AuthContext";
import { ShieldAlert, Users, ShieldCheck, Mail, Key } from "lucide-react";
import { useState } from "react";

export default function TeamManagementPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  if (!user.permissions.canManageTeam) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black font-heading text-white mb-4">RESTRICTED: GOD MODE ONLY</h1>
        <p className="text-slate-400 max-w-md">
          Team Management and privilege configuration is strictly restricted to <span className="text-primary-400 font-bold">SUPER_ADMIN</span> roles only to ensure security integrity. You are currently logged in as <span className="font-bold">{user.role}</span>.
        </p>
      </div>
    );
  }

  const managers = [
    { id: 1, name: "Admin Alpha", role: "SUPER_ADMIN", email: "alpha@playtime.com", status: "Active" },
    { id: 2, name: "FinCorp Invest", role: "INVESTOR", email: "investor@capital.com", status: "Active" },
    { id: 3, name: "Sarah Books", role: "FINANCE_MANAGER", email: "sarah@playtime.com", status: "Active" },
    { id: 4, name: "Max Marketing", role: "DIGITAL_MARKETER", email: "max@playtime.com", status: "Active" },
    { id: 5, name: "Leo Contents", role: "CONTENT_MANAGER", email: "leo@playtime.com", status: "Pending" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-100 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary-400" />
            Team & Privilege Matrix
          </h1>
          <p className="text-slate-400 mt-1">Super Admin portal to assign and revoke access levels.</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-lg shadow-primary-500/20 flex items-center gap-2">
          <Key className="h-4 w-4" />
          Provision New User
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">User Identity</th>
                <th className="p-4 font-bold">Security Role</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {managers.map(m => (
                <tr key={m.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{m.name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="h-3 w-3" /> {m.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                      m.role === 'SUPER_ADMIN' ? 'bg-primary-500/10 text-primary-400 border-primary-500/20' : 
                      m.role === 'DIGITAL_MARKETER' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                      m.role === 'FINANCE_MANAGER' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {m.role === 'SUPER_ADMIN' && <ShieldCheck className="h-3 w-3" />}
                      {m.role.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                      m.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${m.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></div>
                      {m.status}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 border border-slate-700 hover:border-slate-500 rounded-lg transition-colors">
                      Edit Permissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

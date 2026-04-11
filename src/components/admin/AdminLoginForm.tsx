"use client";

import { useState } from "react";
import { useAuth } from "@/components/admin/AuthContext";
import { Lock, Mail, KeyRound, ShieldAlert, ArrowRight } from "lucide-react";

export default function AdminLoginForm() {
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    const success = await login(email, password);
    
    if (!success) {
      setError("Secure verification failed. Invalid credentials or unauthorized email.");
      setIsSubmitting(false);
    }
    // If success = true, the layout will automatically unmount this component
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 font-sans text-slate-200">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-slate-900 border-2 border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative">
            <Lock className="h-8 w-8 text-primary-500" />
            <div className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-3xl font-black font-heading text-white tracking-tight">Restricted Area</h1>
          <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">
            Authorized personnel only.<br/>Enter security credentials to access the internal dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-red-500 mt-0.5" />
              <p className="text-sm font-bold text-red-400 leading-tight">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Terminal</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@playtime.com"
                  required
                  className="w-full bg-slate-950 border border-slate-800 pl-11 pr-4 py-3.5 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-600" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Secure Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-950 border border-slate-800 pl-11 pr-4 py-3.5 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                />
                <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-slate-600" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full mt-2 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-700 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div>
                  Verifying Identity...
                </>
              ) : (
                <>
                  Initiate Handshake
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-800/50">
             <div className="text-xs text-slate-600 font-bold mb-3 uppercase tracking-wider">Demo Credentials:</div>
             <div className="grid grid-cols-1 gap-2 text-xs text-slate-500">
               <div className="flex justify-between"><span>Super Admin:</span> <code className="text-primary-400">admin@playtime.com</code></div>
               <div className="flex justify-between"><span>Investor:</span> <code className="text-primary-400">investor@playtime.com</code></div>
               <div className="flex justify-between"><span>Finance Mgr:</span> <code  className="text-emerald-400">finance@playtime.com</code></div>
               <div className="flex justify-between"><span>Marketer:</span> <code className="text-pink-400">marketing@playtime.com</code></div>
               <div className="flex justify-between"><span>Content Manager:</span> <code className="text-pink-400">content@playtime.com</code></div>
               <div className="text-slate-600 italic mt-1">Password for all is <code className="text-slate-400">admin123</code></div>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
}

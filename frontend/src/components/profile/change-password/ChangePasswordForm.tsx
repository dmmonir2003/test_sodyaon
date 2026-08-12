"use client";

import { useState } from "react";
import { EyeOff, Eye, Loader2, CheckCircle2 } from "lucide-react";
import { useChangePasswordMutation } from "@/store/user/profile/profileApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProfile } from "@/store/user/profile/profileSlice";

export default function ChangePasswordForm() {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.profile);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const res = await changePassword({ currentPassword, newPassword }).unwrap();
      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      if (user) {
        dispatch(setProfile({ ...user, hasDefaultPassword: false }));
      }
    } catch (err: any) {
      setError(err?.data?.message || "Failed to update password. Please check your current password.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {error && (
            <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-100 font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-emerald-50 text-emerald-600 text-sm rounded-lg border border-emerald-100 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {success}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Current password</label>
            <div className="relative">
              <input 
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none pr-10" 
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                {showCurrent ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Set a new password</label>
            <div className="relative">
              <input 
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none pr-10" 
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                {showNew ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Confirm password</label>
            <div className="relative">
              <input 
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary-400 outline-none pr-10" 
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                {showConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-lg font-bold shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Password
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { UserPlus, Settings, Save, Trash2, HelpCircle } from "lucide-react";

export default function ProfilePage() {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Leo", age: "5", interests: ["Dinosaurs", "Building"] }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if(newName && newAge) {
      setProfiles([...profiles, { id: Date.now(), name: newName, age: newAge, interests: [] }]);
      setNewName("");
      setNewAge("");
      setIsAdding(false);
    }
  };

  const handleDelete = (id: number) => {
    setProfiles(profiles.filter(p => p.id !== id));
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-4">My Account</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your orders, profile, and set up child profiles for the AI Gift Finder.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Account Settings Menu */}
          <div className="lg:col-span-1">
             <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <nav className="space-y-2">
                   <button className="w-full text-left px-4 py-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-bold flex items-center justify-between transition-colors">
                     Child Profiles <span className="w-6 h-6 rounded-full bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 flex items-center justify-center text-xs">{profiles.length}</span>
                   </button>
                   <button className="w-full text-left px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium transition-colors">
                     Order History
                   </button>
                   <button className="w-full text-left px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium transition-colors">
                     Account Settings
                   </button>
                   <button className="w-full text-left px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-medium transition-colors border-t border-slate-100 dark:border-slate-700 rounded-t-none mt-4 !pt-4">
                     Sign Out
                   </button>
                </nav>
             </div>
          </div>

          {/* Profiles Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header / Add Button */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Active Profiles</h2>
              {!isAdding && (
                <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-lg shadow-sm transition-colors text-sm">
                  <UserPlus className="w-4 h-4" /> Add Child
                </button>
              )}
            </div>

            {/* Add Form */}
            {isAdding && (
               <div className="bg-secondary-50 dark:bg-secondary-900/10 rounded-3xl p-6 md:p-8 border-2 border-secondary-200 dark:border-secondary-800 animate-in fade-in slide-in-from-top-4">
                 <h3 className="text-lg font-bold text-secondary-900 dark:text-secondary-100 mb-1">Create New Profile</h3>
                 <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-6">Our AI will use this profile to find perfect gifts for their age and interests.</p>
                 
                 <form onSubmit={handleCreate} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-secondary-800 dark:text-secondary-200 mb-1">Child's Name</label>
                        <input value={newName} onChange={e=>setNewName(e.target.value)} type="text" className="w-full px-4 py-2.5 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-slate-800 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-100 outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-secondary-800 dark:text-secondary-200 mb-1">Age in Years</label>
                        <input value={newAge} onChange={e=>setNewAge(e.target.value)} type="number" min="0" max="18" className="w-full px-4 py-2.5 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-slate-800 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-100 outline-none" required />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-800">
                      <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2 font-bold text-secondary-600 dark:text-secondary-400 hover:text-secondary-800">Cancel</button>
                      <button type="submit" className="px-5 py-2 bg-secondary-500 text-white font-bold rounded-lg shadow-sm hover:bg-secondary-600 transition-colors flex items-center gap-2"><Save className="w-4 h-4" /> Save Profile</button>
                    </div>
                 </form>
               </div>
            )}

            {/* List Profiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profiles.map(profile => (
                <div key={profile.id} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 relative group overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform"></div>
                   
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-2xl text-primary-500">
                         {profile.name.charAt(0)}
                       </div>
                       <div>
                         <h3 className="font-bold text-xl text-slate-900 dark:text-white capitalize">{profile.name}</h3>
                         <span className="text-sm font-medium text-slate-500">{profile.age} years old</span>
                       </div>
                     </div>
                     <button onClick={() => handleDelete(profile.id)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20">
                       <Trash2 className="w-5 h-5" />
                     </button>
                   </div>
                   
                   <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Interests</span>
                        <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-primary-500" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.length > 0 ? profile.interests.map(i => (
                          <span key={i} className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300">
                            {i}
                          </span>
                        )) : (
                          <span className="text-sm text-slate-500 italic flex items-center gap-1">
                            <HelpCircle className="w-4 h-4" /> No interests added.
                          </span>
                        )}
                      </div>
                   </div>
                </div>
              ))}
              
              {profiles.length === 0 && !isAdding && (
                 <div className="col-span-1 md:col-span-2 text-center py-12 px-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 border-dashed">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserPlus className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Profiles Found</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">Create a profile for your child to unlock powerful AI toy recommendations.</p>
                 </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

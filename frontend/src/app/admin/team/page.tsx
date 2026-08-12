"use client";

import { useAuth } from "@/components/admin/AuthContext";
import { 
  ShieldAlert, 
  Users, 
  ShieldCheck, 
  Mail, 
  Key, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Check, 
  Lock 
} from "lucide-react";
import { useState } from "react";
import { 
  useGetTeamMembersQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation
} from "@/store/admin/teamApi";

export default function TeamManagementPage() {
  const { user } = useAuth();
  
  // RTK Query hooks
  const { data: teamMembers = [], isLoading, error } = useGetTeamMembersQuery(undefined, {
    skip: !user || !user.permissions?.canManageTeam,
  });
  
  const [createTeamMember, { isLoading: isCreating }] = useCreateTeamMemberMutation();
  const [updateTeamMember, { isLoading: isUpdating }] = useUpdateTeamMemberMutation();
  const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation();

  // Modals state
  const [isProvisionOpen, setIsProvisionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Form states for creation
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("CONTENT_MANAGER");
  const [newPermissions, setNewPermissions] = useState<any>({
    canViewFinances: false,
    canEditFinances: false,
    canManageMarketing: false,
    canManageOrders: false,
    canManageContent: false,
    canManageTeam: false,
  });

  // Form states for edit
  const [editPermissions, setEditPermissions] = useState<any>({});
  const [editRole, setEditRole] = useState("");

  if (!user) return null;

  if (!user.permissions?.canManageTeam) {
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

  // Pre-load default permissions based on chosen role for creation
  const handleRoleChange = (role: string) => {
    setNewRole(role);
    const defaults = {
      canViewFinances: false,
      canEditFinances: false,
      canManageMarketing: false,
      canManageOrders: false,
      canManageContent: false,
      canManageTeam: false,
    };
    if (role === "SUPER_ADMIN") {
      setNewPermissions({
        canViewFinances: true,
        canEditFinances: true,
        canManageMarketing: true,
        canManageOrders: true,
        canManageContent: true,
        canManageTeam: true,
      });
    } else if (role === "INVESTOR") {
      setNewPermissions({ ...defaults, canViewFinances: true });
    } else if (role === "FINANCE_MANAGER") {
      setNewPermissions({ ...defaults, canViewFinances: true, canEditFinances: true });
    } else if (role === "DIGITAL_MARKETER") {
      setNewPermissions({ ...defaults, canManageMarketing: true, canManageOrders: true });
    } else if (role === "CONTENT_MANAGER") {
      setNewPermissions({ ...defaults, canManageContent: true });
    }
  };

  const handleOpenEdit = (member: any) => {
    setSelectedMember(member);
    setEditRole(member.role);
    setEditPermissions(member.permissions || {});
    setIsEditOpen(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTeamMember({
        name: newName,
        email: newEmail,
        password: newPassword,
        role: newRole,
        permissions: newPermissions,
      }).unwrap();
      
      // Reset form
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      handleRoleChange("CONTENT_MANAGER");
      setIsProvisionOpen(false);
      alert("New team member provisioned successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.data?.message || "Failed to provision team user");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTeamMember({
        id: selectedMember.id,
        body: {
          role: editRole,
          permissions: editPermissions,
        },
      }).unwrap();
      setIsEditOpen(false);
      alert("Team permissions successfully updated!");
    } catch (err: any) {
      console.error(err);
      alert("Failed to update team permissions");
    }
  };

  const handleDelete = async (memberId: string) => {
    if (!window.confirm("Are you absolutely sure you want to revoke access for this team member?")) return;
    try {
      await deleteTeamMember(memberId).unwrap();
      alert("Access revoked and user account removed.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user account");
    }
  };

  const rolesList = [
    "SUPER_ADMIN",
    "INVESTOR",
    "FINANCE_MANAGER",
    "DIGITAL_MARKETER",
    "CONTENT_MANAGER",
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
        <button 
          onClick={() => setIsProvisionOpen(true)}
          className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary-500/20 flex items-center gap-2 hover:-translate-y-0.5"
        >
          <Key className="h-4 w-4" />
          Provision New User
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Loading team matrix...</div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          Failed to fetch team records. Please check database connectivity.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">User Identity</th>
                  <th className="p-4 font-bold">Security Role</th>
                  <th className="p-4 font-bold">Privilege Checklist</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {teamMembers.map((m: any) => (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        {m.avatar ? (
                          <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border border-slate-700" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                            {m.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <span>{m.name}</span>
                          {m.id === user.id && <span className="ml-2 text-[10px] font-bold text-primary-400 px-1.5 py-0.5 bg-primary-500/10 border border-primary-500/20 rounded">YOU</span>}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1 pl-10">
                        <Mail className="h-3 w-3" /> {m.email || m.phone || "No Identifier"}
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
                      <div className="flex flex-wrap gap-1.5">
                        {m.permissions && Object.keys(m.permissions).map((perm: string) => {
                          const hasPerm = m.permissions[perm];
                          const label = perm.replace('can', '').replace(/([A-Z])/g, ' $1').trim();
                          if (!hasPerm) return null;
                          return (
                            <span key={perm} className="text-[10px] bg-slate-800/80 border border-slate-700 text-slate-300 font-medium px-2 py-0.5 rounded flex items-center gap-1">
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(m)}
                          className="p-2 border border-slate-800 hover:border-slate-600 rounded-lg text-slate-400 hover:text-white transition-colors"
                          title="Edit Privileges"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {m.id !== user.id && (
                          <button 
                            onClick={() => handleDelete(m.id)}
                            className="p-2 border border-slate-800 hover:border-red-500/20 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                            title="Revoke Access"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: PROVISION NEW USER */}
      {isProvisionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-850 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center bg-slate-950 px-6 py-4 border-b border-slate-800">
              <h2 className="text-xl font-black font-heading text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary-400" />
                Provision New Team Account
              </h2>
              <button onClick={() => setIsProvisionOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter full name"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-primary-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@sodayon.com"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-primary-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-1.5">Secure Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="password" 
                      required 
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-primary-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-1.5">Security Role</label>
                  <select 
                    value={newRole}
                    onChange={e => handleRoleChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-primary-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                  >
                    {rolesList.map(r => (
                      <option key={r} value={r}>{r.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-3">Granular Access Privileges</label>
                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
                  {Object.keys(newPermissions).map((perm: string) => {
                    const label = perm.replace('can', '').replace(/([A-Z])/g, ' $1').trim();
                    return (
                      <label key={perm} className="flex items-center gap-2.5 text-sm text-slate-350 cursor-pointer hover:text-white transition-colors">
                        <input 
                          type="checkbox"
                          checked={newPermissions[perm]}
                          disabled={newRole === "SUPER_ADMIN"}
                          onChange={e => setNewPermissions({...newPermissions, [perm]: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-primary-600 focus:ring-0"
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsProvisionOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isCreating}
                  className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-bold py-2 px-5 rounded-xl transition-all"
                >
                  {isCreating ? "Provisioning..." : "Provision User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT GRANULAR PERMISSIONS */}
      {isEditOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-850 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center bg-slate-950 px-6 py-4 border-b border-slate-800">
              <h2 className="text-xl font-black font-heading text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-primary-400" />
                Configure Privileges
              </h2>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Configuring levels for</span>
                <span className="text-lg font-black text-white">{selectedMember.name}</span>
                <span className="text-slate-500 text-xs block mt-0.5">{selectedMember.email}</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-1.5">Security Role Override</label>
                <select 
                  value={editRole}
                  onChange={e => setEditRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-primary-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all"
                >
                  {rolesList.map(r => (
                    <option key={r} value={r}>{r.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-3">Adjust Active Privileges</label>
                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
                  {Object.keys(editPermissions).map((perm: string) => {
                    const label = perm.replace('can', '').replace(/([A-Z])/g, ' $1').trim();
                    return (
                      <label key={perm} className="flex items-center gap-2.5 text-sm text-slate-350 cursor-pointer hover:text-white transition-colors">
                        <input 
                          type="checkbox"
                          checked={editPermissions[perm]}
                          disabled={editRole === "SUPER_ADMIN"}
                          onChange={e => setEditPermissions({...editPermissions, [perm]: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-primary-600 focus:ring-0"
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsEditOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-bold py-2 px-5 rounded-xl transition-all"
                >
                  {isUpdating ? "Updating..." : "Update Privileges"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

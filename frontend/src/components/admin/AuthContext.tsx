"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "SUPER_ADMIN" | "INVESTOR" | "FINANCE_MANAGER" | "DIGITAL_MARKETER" | "CONTENT_MANAGER";

export interface Permissions {
  canViewFinances: boolean;
  canEditFinances: boolean;
  canManageMarketing: boolean;
  canManageOrders: boolean;
  canManageContent: boolean;
  canManageTeam: boolean;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  permissions: Permissions;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  setRole: (role: Role) => void; // Keep for the Simulator floating widget
  isLoading: boolean;
}

const defaultPermissions: Record<Role, Permissions> = {
  SUPER_ADMIN: {
    canViewFinances: true,
    canEditFinances: true,
    canManageMarketing: true,
    canManageOrders: true,
    canManageContent: true,
    canManageTeam: true,
  },
  INVESTOR: {
    canViewFinances: true,
    canEditFinances: false, // Read only
    canManageMarketing: false,
    canManageOrders: false,
    canManageContent: false,
    canManageTeam: false,
  },
  FINANCE_MANAGER: {
    canViewFinances: true,
    canEditFinances: true, // Can add costs and calculate
    canManageMarketing: false,
    canManageOrders: false,
    canManageContent: false,
    canManageTeam: false,
  },
  DIGITAL_MARKETER: {
    canViewFinances: false,
    canEditFinances: false,
    canManageMarketing: true,
    canManageOrders: true, // Granted optional order access for demo
    canManageContent: false,
    canManageTeam: false,
  },
  CONTENT_MANAGER: {
    canViewFinances: false,
    canEditFinances: false,
    canManageMarketing: false,
    canManageOrders: false,
    canManageContent: true,
    canManageTeam: false,
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  setRole: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent simulated role
    const savedRole = localStorage.getItem("admin-auth-token") as Role;
    
    setTimeout(() => {
      if (savedRole && defaultPermissions[savedRole]) {
        setUser({
          id: "demo-user-123",
          name: savedRole.split("_").join(" "),
          role: savedRole,
          permissions: defaultPermissions[savedRole],
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    
    try {
      // 1. Try real login request to the Sodayon Backend Server
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const resData = await res.json();
      
      if (res.ok && resData.success && resData.data?.token) {
        const token = resData.data.token;
        const dbUser = resData.data.user;

        // Set Auth JWT Cookie for subsequent RTK Query calls
        if (typeof document !== "undefined") {
          document.cookie = `auth_token=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
        }

        const assignedRole = dbUser.role as Role;
        localStorage.setItem("admin-auth-token", assignedRole);

        setUser({
          id: dbUser.id || dbUser._id,
          name: dbUser.name,
          role: assignedRole,
          permissions: defaultPermissions[assignedRole] || defaultPermissions.SUPER_ADMIN,
        });

        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.warn("Backend API login offline, running local mock fallback...");
    }

    // 2. Local Fallback simulation for offline frontend building / styling
    await new Promise(resolve => setTimeout(resolve, 800));

    if (pass !== "admin123") {
      setIsLoading(false);
      return false;
    }

    let assignedRole: Role | null = null;
    if (email === "admin@sodayon.com") assignedRole = "SUPER_ADMIN";
    else if (email === "investor@sodayon.com") assignedRole = "INVESTOR";
    else if (email === "finance@sodayon.com") assignedRole = "FINANCE_MANAGER";
    else if (email === "marketing@sodayon.com") assignedRole = "DIGITAL_MARKETER";
    else if (email === "content@sodayon.com") assignedRole = "CONTENT_MANAGER";

    if (assignedRole) {
      localStorage.setItem("admin-auth-token", assignedRole);
      setUser({
        id: "demo-user-123",
        name: assignedRole.split("_").join(" "),
        role: assignedRole,
        permissions: defaultPermissions[assignedRole],
      });
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin-auth-token");
    if (typeof document !== "undefined") {
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
    setUser(null);
  };

  const setRole = (role: Role) => {
    // Used ONLY by the RoleSimulator widget for testing utility. 
    // Usually wouldn't exist in production AuthContext.
    localStorage.setItem("admin-auth-token", role);
    setUser({
      id: "demo-user-123",
      name: role.split("_").join(" "),
      role,
      permissions: defaultPermissions[role],
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

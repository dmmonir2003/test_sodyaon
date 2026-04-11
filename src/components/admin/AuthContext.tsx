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
    
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));

    if (pass !== "admin123") {
      setIsLoading(false);
      return false;
    }

    let assignedRole: Role | null = null;
    if (email === "admin@playtime.com") assignedRole = "SUPER_ADMIN";
    else if (email === "investor@playtime.com") assignedRole = "INVESTOR";
    else if (email === "finance@playtime.com") assignedRole = "FINANCE_MANAGER";
    else if (email === "marketing@playtime.com") assignedRole = "DIGITAL_MARKETER";
    else if (email === "content@playtime.com") assignedRole = "CONTENT_MANAGER";

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

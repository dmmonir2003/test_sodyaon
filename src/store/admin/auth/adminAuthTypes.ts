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
  email: string;
  role: Role;
  permissions: Permissions;
}

export interface AdminAuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

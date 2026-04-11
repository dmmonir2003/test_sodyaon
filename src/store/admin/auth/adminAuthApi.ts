import { baseApi } from '../../baseApi';
import { User, Role } from './adminAuthTypes';

export const adminAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<User, { email: string; pass: string }>({
      // We pass the function to simulate the query since we don't have a real backend url mapping yet.
      // Usually it would be: query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials })
      queryFn: async ({ email, pass }) => {
        // Mock Backend Logic directly in QueryFn
        await new Promise(resolve => setTimeout(resolve, 800));

        if (pass !== "admin123") {
          return { error: { status: 401, data: "Invalid Credentials" } as any };
        }

        let assignedRole: Role | null = null;
        if (email === "admin@playtime.com") assignedRole = "SUPER_ADMIN";
        else if (email === "investor@playtime.com") assignedRole = "INVESTOR";
        else if (email === "finance@playtime.com") assignedRole = "FINANCE_MANAGER";
        else if (email === "marketing@playtime.com") assignedRole = "DIGITAL_MARKETER";
        else if (email === "content@playtime.com") assignedRole = "CONTENT_MANAGER";

        if (!assignedRole) {
          return { error: { status: 403, data: "Unauthorized Email" } as any };
        }

        const defaults = {
          canViewFinances: false, canEditFinances: false, canManageMarketing: false, canManageOrders: false, canManageContent: false, canManageTeam: false
        };
        let permissions = defaults;
        if (assignedRole === 'SUPER_ADMIN') permissions = { ...defaults, canViewFinances: true, canEditFinances: true, canManageMarketing: true, canManageOrders: true, canManageContent: true, canManageTeam: true };
        else if (assignedRole === 'INVESTOR') permissions = { ...defaults, canViewFinances: true };
        else if (assignedRole === 'FINANCE_MANAGER') permissions = { ...defaults, canViewFinances: true, canEditFinances: true };
        else if (assignedRole === 'DIGITAL_MARKETER') permissions = { ...defaults, canManageMarketing: true, canManageOrders: true };
        else if (assignedRole === 'CONTENT_MANAGER') permissions = { ...defaults, canManageContent: true };

        return {
          data: {
            id: `usr_${Math.random().toString(36).substring(2)}`,
            email,
            name: assignedRole.split('_').join(' '),
            role: assignedRole,
            permissions
          }
        };
      }
    })
  })
});

export const { useLoginAdminMutation } = adminAuthApi;

import { Document } from 'mongoose';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'INVESTOR'
  | 'FINANCE_MANAGER'
  | 'DIGITAL_MARKETER'
  | 'CONTENT_MANAGER'
  | 'CUSTOMER';

export interface IPermissions {
  canViewFinances: boolean;
  canEditFinances: boolean;
  canManageMarketing: boolean;
  canManageOrders: boolean;
  canManageContent: boolean;
  canManageTeam: boolean;
}

export interface IUser {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  address?: string;
  role: UserRole;
  avatar?: string;
  permissions: IPermissions;
  otp?: string;
  otpExpiresAt?: Date;
  tempResetToken?: string;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

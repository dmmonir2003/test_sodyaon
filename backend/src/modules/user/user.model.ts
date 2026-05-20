import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDocument } from './user.types';

const PermissionsSchema = new Schema(
  {
    canViewFinances: { type: Boolean, default: false },
    canEditFinances: { type: Boolean, default: false },
    canManageMarketing: { type: Boolean, default: false },
    canManageOrders: { type: Boolean, default: false },
    canManageContent: { type: Boolean, default: false },
    canManageTeam: { type: Boolean, default: false },
  },
  { _id: false }
);

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true },
    password: { type: String, select: false },
    address: { type: String, trim: true },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'INVESTOR', 'FINANCE_MANAGER', 'DIGITAL_MARKETER', 'CONTENT_MANAGER', 'CUSTOMER'],
      default: 'CUSTOMER',
    },
    avatar: { type: String },
    permissions: {
      type: PermissionsSchema,
      default: () => ({
        canViewFinances: false,
        canEditFinances: false,
        canManageMarketing: false,
        canManageOrders: false,
        canManageContent: false,
        canManageTeam: false,
      }),
    },
    otp: { type: String, select: false },
    otpExpiresAt: { type: Date, select: false },
    tempResetToken: { type: String, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.otp;
        delete ret.otpExpiresAt;
        delete ret.tempResetToken;
      },
    },
  }
);

// Hash password before saving
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password || '', salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password || '');
};

export const User = model<IUserDocument>('User', UserSchema);
export default User;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';
import { UserRole, IPermissions } from '../user/user.types';

// Helper to sign JWT token
const signToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'sodayon-default-secret', {
    expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
  });
};

// Set up default permissions based on role
const getPermissionsForRole = (role: UserRole): IPermissions => {
  const defaults = {
    canViewFinances: false,
    canEditFinances: false,
    canManageMarketing: false,
    canManageOrders: false,
    canManageContent: false,
    canManageTeam: false,
  };

  switch (role) {
    case 'SUPER_ADMIN':
      return {
        canViewFinances: true,
        canEditFinances: true,
        canManageMarketing: true,
        canManageOrders: true,
        canManageContent: true,
        canManageTeam: true,
      };
    case 'INVESTOR':
      return { ...defaults, canViewFinances: true };
    case 'FINANCE_MANAGER':
      return { ...defaults, canViewFinances: true, canEditFinances: true };
    case 'DIGITAL_MARKETER':
      return { ...defaults, canManageMarketing: true, canManageOrders: true };
    case 'CONTENT_MANAGER':
      return { ...defaults, canManageContent: true };
    default:
      return defaults;
  }
};

// Register customer
export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, password, address } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(400, 'Email already in use'));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    address,
    role: 'CUSTOMER',
    permissions: getPermissionsForRole('CUSTOMER'),
  });

  const token = signToken(user.id, user.role);

  res.status(201).json({
    success: true,
    data: {
      user,
      token,
    },
  });
});

// Login user (supports auto-seeding admin accounts for standard dev emails)
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let user: any = await User.findOne({ email }).select('+password');

  // Auto-seed admin accounts if they do not exist for easier local testing
  const devAdmins: Record<string, { role: UserRole; name: string }> = {
    'admin@sodayon.com': { role: 'SUPER_ADMIN', name: 'Super Admin' },
    'investor@sodayon.com': { role: 'INVESTOR', name: 'Investor User' },
    'finance@sodayon.com': { role: 'FINANCE_MANAGER', name: 'Finance Manager' },
    'marketing@sodayon.com': { role: 'DIGITAL_MARKETER', name: 'Digital Marketer' },
    'content@sodayon.com': { role: 'CONTENT_MANAGER', name: 'Content Manager' },
  };

  if (!user && devAdmins[email]) {
    const adminDetails = devAdmins[email];
    user = await User.create({
      name: adminDetails.name,
      email,
      password: 'admin123', // Default dev password
      role: adminDetails.role,
      permissions: getPermissionsForRole(adminDetails.role),
    });
    // Re-query to include password field for verification
    user = await User.findOne({ email }).select('+password');
  }

  if (!user || !(await user.comparePassword(password))) {
    return next(new ApiError(401, 'Invalid email or password'));
  }

  const token = signToken(user.id, user.role);

  // Set auth cookie for proxy support if needed
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    data: {
      user,
      token,
    },
  });
});

// Forgot password - Generate 6 digit OTP (mock sending for development)
export const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { identifier } = req.body;

  // Search by email or phone
  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  if (!user) {
    return next(new ApiError(404, 'No user found with that identifier'));
  }

  // Generate 6 digit OTP
  const otp = '123456'; // Default otp for development, or Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  // We bypass select schema restrictions for update
  await User.updateOne({ _id: user._id }, { otp, otpExpiresAt });

  console.log(`[OTP Sent to ${identifier}] OTP is ${otp}`);

  res.status(200).json({
    success: true,
    message: 'OTP sent successfully (Dummy code: 123456)',
  });
});

// Verify OTP
export const verifyOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { identifier, otp } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
    otp,
    otpExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    return next(new ApiError(400, 'Invalid or expired OTP'));
  }

  // Generate a temp token for resetting password
  const tempResetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'sodayon-default-secret', {
    expiresIn: '15m',
  });

  await User.updateOne({ _id: user._id }, { $unset: { otp: 1, otpExpiresAt: 1 }, tempResetToken });

  res.status(200).json({
    success: true,
    data: {
      token: tempResetToken,
    },
  });
});

// Reset Password
export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { token, newPassword } = req.body;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'sodayon-default-secret');
    const user = await User.findOne({ _id: decoded.id, tempResetToken: token });

    if (!user) {
      return next(new ApiError(400, 'Invalid or expired reset token'));
    }

    user.password = newPassword;
    user.tempResetToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (err) {
    return next(new ApiError(400, 'Invalid or expired reset token'));
  }
});

// Change Password (Authenticated)
export const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { currentPassword, newPassword } = req.body;
  const userId = (req as any).user.id;

  const user = await User.findById(userId).select('+password');
  if (!user || !(await user.comparePassword(currentPassword))) {
    return next(new ApiError(400, 'Current password is incorrect'));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

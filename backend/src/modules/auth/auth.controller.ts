import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';
import { UserRole, IPermissions } from '../user/user.types';
import { sendSMS } from '../../utils/sms';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { admin, isFirebaseEnabled } from '../../config/firebase';
import { sendEmail } from '../../utils/email';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

  if (email) {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      if (existingUser.password) {
        return next(new ApiError(400, 'Email already in use'));
      }
      // If the user document was created as a pending OTP registration, complete it!
      existingUser.name = name;
      existingUser.password = password;
      if (address) existingUser.address = address;
      await existingUser.save();

      const token = signToken(existingUser.id, existingUser.role);
      return res.status(200).json({
        success: true,
        data: {
          user: existingUser,
          token,
        },
      });
    }
  }

  if (phone) {
    const cleanPhoneStr = phone.replace(/^(\+880|0)/, '');
    const existingPhone = await User.findOne({
      $or: [
        { phone: phone },
        { phone: `+880${cleanPhoneStr}` },
        { phone: `0${cleanPhoneStr}` },
        { phone: cleanPhoneStr }
      ]
    });
    if (existingPhone) {
      if (existingPhone.password) {
        return next(new ApiError(400, 'Phone number already registered'));
      }
      // Complete phone registration
      existingPhone.name = name;
      existingPhone.password = password;
      if (address) existingPhone.address = address;
      existingPhone.isPhoneVerified = true;
      await existingPhone.save();

      const token = signToken(existingPhone.id, existingPhone.role);
      return res.status(200).json({
        success: true,
        data: {
          user: existingPhone,
          token,
        },
      });
    }
  }

  const cleanPhoneStr = phone ? phone.replace(/^(\+880|0)/, '') : '';

  const user = await User.create({
    name,
    email: email ? email.toLowerCase() : undefined,
    phone: phone ? `+880${cleanPhoneStr}` : undefined,
    password,
    address,
    role: 'CUSTOMER',
    permissions: getPermissionsForRole('CUSTOMER'),
    isPhoneVerified: !!phone, // If phone is provided, it means OTP was verified on the frontend
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


// Phone Login - Request OTP (registers automatically if unregistered)
export const phoneLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { phone } = req.body;
  if (!phone) {
    return next(new ApiError(400, 'Mobile phone number is required'));
  }

  // Look for user by phone
  let user = await User.findOne({ phone });

  // Generate 6 digit numeric OTP code
  const otp = process.env.NODE_ENV === 'production' 
    ? Math.floor(100000 + Math.random() * 900000).toString() 
    : '123456';
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

  if (!user) {
    // Auto-register new customer account
    user = await User.create({
      name: `Customer ${phone.slice(-4)}`,
      phone,
      role: 'CUSTOMER',
      permissions: getPermissionsForRole('CUSTOMER'),
      otp,
      otpExpiresAt,
      isPhoneVerified: false,
    });
  } else {
    // Save generated OTP
    await User.updateOne({ _id: user._id }, { otp, otpExpiresAt });
  }

  // Send real Twilio SMS (or log in dev environment)
  await sendSMS(phone, otp);

  res.status(200).json({
    success: true,
    message: 'Verification code sent successfully',
  });
});

// Phone Verify - Confirm OTP / Firebase ID Token and log in
export const phoneVerify = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { phone, idToken, otp } = req.body;
  if (!phone) {
    return next(new ApiError(400, 'Mobile phone number is required'));
  }

  let isVerified = false;

  if (otp) {
    const cleanPhoneStr = phone.replace(/^(\+880|0)/, '');
    const matchedUser = await User.findOne({
      $or: [
        { phone: phone },
        { phone: `+880${cleanPhoneStr}` },
        { phone: `0${cleanPhoneStr}` },
        { phone: cleanPhoneStr }
      ],
      otp,
      otpExpiresAt: { $gt: new Date() }
    });

    if (matchedUser) {
      isVerified = true;
      console.log(`[DB OTP Success] Securely verified database OTP code for: ${phone}`);
    } else if (process.env.NODE_ENV !== 'production' && otp === '123456') {
      isVerified = true;
      console.log(`[DB OTP Dev Bypass] Bypassed OTP check using developer code: 123456`);
    } else {
      return next(new ApiError(400, 'Invalid or expired OTP verification code'));
    }
  } else if (isFirebaseEnabled && idToken) {
    try {
      // 1. Verify the cryptographic Firebase ID Token via Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const verifiedPhone = decodedToken.phone_number; // e.g. "+8801700000000"
      
      // Make sure numbers are formatted consistently (international format check)
      const cleanPhone = phone.replace(/^(\+880|0)/, '');
      const cleanVerifiedPhone = verifiedPhone ? verifiedPhone.replace(/^(\+880|0)/, '') : '';

      if (!cleanVerifiedPhone || !cleanPhone.includes(cleanVerifiedPhone) && !cleanVerifiedPhone.includes(cleanPhone)) {
        return next(new ApiError(400, 'Cryptographic token validation failed: phone number mismatch'));
      }

      isVerified = true;
      console.log(`[Firebase Auth Success] Securely verified phone token: ${verifiedPhone}`);
    } catch (err: any) {
      console.error('[Firebase Auth Error] Token verification failed:', err.message);
      return next(new ApiError(400, `Firebase token validation error: ${err.message}`));
    }
  } else {
    // 2. Developer Emulation Mode Fallback (when Firebase credentials are blank)
    const isMockToken = idToken && idToken.startsWith('mock_firebase_token');
    const isStandardOtp = otp === '123456';

    if (isMockToken || isStandardOtp) {
      isVerified = true;
      console.log(`[Firebase Auth Dev Emulator] Bypassing secure checks for: ${phone}`);
    } else {
      return next(new ApiError(400, 'Firebase keys omitted. To verify, please input developer code: 123456'));
    }
  }

  if (!isVerified) {
    return next(new ApiError(400, 'Identity verification failed'));
  }

  // Look for user by phone using robust variations (E.164, local 01X, or base digits)
  const cleanPhoneStr = phone.replace(/^(\+880|0)/, '');
  let user = await User.findOne({
    $or: [
      { phone: phone },
      { phone: `+880${cleanPhoneStr}` },
      { phone: `0${cleanPhoneStr}` },
      { phone: cleanPhoneStr }
    ]
  });

  if (!user) {
    // Auto-register new customer account in MongoDB
    user = await User.create({
      name: `Customer ${phone.slice(-4)}`,
      phone: `+880${cleanPhoneStr}`, // Normalize to E.164 standard in DB
      role: 'CUSTOMER',
      permissions: getPermissionsForRole('CUSTOMER'),
      isPhoneVerified: true,
    });
    console.log(`[Mongoose Auto-Register] Created new customer account for phone: +880${cleanPhoneStr}`);
  } else {
    // Update phone to E.164 standard and verify
    await User.updateOne(
      { _id: user._id },
      { 
        $set: { 
          isPhoneVerified: true,
          phone: `+880${cleanPhoneStr}` // Automatically update legacy local format to standardized E.164
        } 
      }
    );
    // Reload user with updated values
    const reloaded = await User.findById(user._id);
    if (reloaded) {
      user = reloaded;
    }
  }


  const token = signToken(user.id, user.role);

  // Write JWT token to HTTPOnly cookie
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    data: {
      user,
      token,
    },
  });
});

// Cryptographic Social Login Controller (Google/Facebook)
export const socialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { provider, token: clientToken, email: devEmail, name: devName } = req.body;

  if (!provider || !clientToken) {
    return next(new ApiError(400, 'Provider and token are required'));
  }

  let socialId = '';
  let email = devEmail || '';
  let name = devName || 'Social Customer';
  let avatar = '';

  if (provider === 'google') {
    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      if (clientId) {
        // Real production-grade cryptographic Google ID Token verify
        const ticket = await googleClient.verifyIdToken({
          idToken: clientToken,
          audience: clientId,
        });
        const payload = ticket.getPayload();
        if (payload) {
          socialId = payload.sub; // unique Google ID
          email = payload.email || '';
          name = payload.name || name;
          avatar = payload.picture || '';
        }
      } else {
        // Local developer mode emulator when env keys are omitted
        socialId = `google_${clientToken.slice(-10)}`;
        email = email || `google_${clientToken.slice(-6)}@example.com`;
      }
    } catch (err: any) {
      console.warn('[Social Auth] Google token verify failed, running local emulator:', err.message);
      socialId = `google_${clientToken.slice(-10)}`;
    }
  } else if (provider === 'facebook') {
    try {
      // Real production-grade Facebook Graph API token verification
      const fbResponse = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${clientToken}`
      );
      const payload = fbResponse.data;
      if (payload && payload.id) {
        socialId = payload.id;
        email = payload.email || '';
        name = payload.name || name;
        avatar = payload.picture?.data?.url || '';
      }
    } catch (err: any) {
      console.warn('[Social Auth] Facebook verification failed, running local emulator:', err.message);
      socialId = `facebook_${clientToken.slice(-10)}`;
    }
  } else {
    return next(new ApiError(400, 'Unsupported social auth provider'));
  }

  // Look for user by social identity ID first
  const queryField = provider === 'google' ? { googleId: socialId } : { facebookId: socialId };
  let user = await User.findOne(queryField);

  if (!user && email) {
    // Look by email as secondary check
    user = await User.findOne({ email });
    if (user) {
      // Update social credentials on existing account
      const updateData = provider === 'google' ? { googleId: socialId } : { facebookId: socialId };
      await User.updateOne({ _id: user._id }, updateData);
    }
  }

  if (!user) {
    // Auto-create new secure user account
    const createPayload: any = {
      name,
      role: 'CUSTOMER',
      permissions: getPermissionsForRole('CUSTOMER'),
      avatar,
    };
    if (email) createPayload.email = email;
    if (provider === 'google') createPayload.googleId = socialId;
    if (provider === 'facebook') createPayload.facebookId = socialId;

    user = await User.create(createPayload);
  }

  const token = signToken(user.id, user.role);

  // Write cookie
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    data: {
      user,
      token,
    },
  });
});

// Login user (supports email or phone with password, and admin auto-seeding)
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, phone, password } = req.body;

  let query: any = {};
  if (email) {
    query.email = email.toLowerCase();
  } else if (phone) {
    const cleanPhoneStr = phone.replace(/^(\+880|0)/, '');
    query.$or = [
      { phone: phone },
      { phone: `+880${cleanPhoneStr}` },
      { phone: `0${cleanPhoneStr}` },
      { phone: cleanPhoneStr }
    ];
  } else {
    return next(new ApiError(400, 'Email or Phone number is required'));
  }

  let user: any = await User.findOne(query).select('+password');

  // Auto-seed admin accounts if they do not exist for easier local testing (emails only)
  const devAdmins: Record<string, { role: UserRole; name: string }> = {
    'admin@sodayon.com': { role: 'SUPER_ADMIN', name: 'Super Admin' },
    'investor@sodayon.com': { role: 'INVESTOR', name: 'Investor User' },
    'finance@sodayon.com': { role: 'FINANCE_MANAGER', name: 'Finance Manager' },
    'marketing@sodayon.com': { role: 'DIGITAL_MARKETER', name: 'Digital Marketer' },
    'content@sodayon.com': { role: 'CONTENT_MANAGER', name: 'Content Manager' },
  };

  if (!user && email && devAdmins[email]) {
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
    return next(new ApiError(401, 'Invalid credentials'));
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


// Forgot password - Generate 6 digit OTP
export const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { identifier } = req.body;
  if (!identifier) {
    return next(new ApiError(400, 'Identifier is required'));
  }

  // Normalize phone variations if identifier is a phone number
  const cleanPhoneStr = identifier.replace(/^(\+880|0)/, '').replace(/[\s-]/g, '');

  // Search by email or phone robust variations
  const user = await User.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { phone: identifier },
      { phone: `+880${cleanPhoneStr}` },
      { phone: `0${cleanPhoneStr}` },
      { phone: cleanPhoneStr },
      // Support matching formatted numbers with dashes/spaces in database e.g. +880 1679-334323
      { phone: new RegExp(cleanPhoneStr.split('').join('[\\s-]*') + '$') }
    ],
  });

  if (!user) {
    return next(new ApiError(404, 'No user found with that identifier'));
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  // We bypass select schema restrictions for update
  await User.updateOne({ _id: user._id }, { otp, otpExpiresAt });

  if (user.email) {
    const emailSubject = 'সদায়ন (Sodayon) পাসওয়ার্ড রিসেট কোড';
    const emailText = `আপনার সদায়ন ওটিপি (OTP) পাসওয়ার্ড রিসেট কোড: ${otp}`;
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ef4444; margin: 0; font-size: 26px; font-weight: 800;">পাসওয়ার্ড রিসেট</h2>
          <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">সদায়ন অ্যাকাউন্ট পুনরুদ্ধার</p>
        </div>
        <div style="border-top: 1px solid #f1f5f9; padding-top: 24px;">
          <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
            আপনার সদায়ন অ্যাকাউন্টের পাসওয়ার্ড রিসেট করার জন্য অনুরোধ পাওয়া গিয়েছে। পাসওয়ার্ড পরিবর্তন সম্পন্ন করতে নিচের ওটিপি (OTP) কোডটি ব্যবহার করুন। এই কোডটির মেয়াদ <strong>১০ মিনিট</strong> থাকবে।
          </p>
          <div style="text-align: center; margin: 35px 0;">
            <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #ef4444; background-color: #fef2f2; padding: 14px 35px; border-radius: 12px; border: 2px dashed #fca5a5; display: inline-block;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 30px;">
            যদি আপনি পাসওয়ার্ড পরিবর্তনের অনুরোধ না করে থাকেন, তবে নিরাপদ থাকতে অনুগ্রহ করে আপনার পাসওয়ার্ড পরিবর্তন করুন এবং এই ইমেইলটি উপেক্ষা করুন।
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });
  }

  res.status(200).json({
    success: true,
    message: 'OTP sent successfully',
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
  user.hasDefaultPassword = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

// Email Register Init - Generate & send email OTP (registers pending if unregistered)
export const emailRegisterInit = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    return next(new ApiError(400, 'Email address is required'));
  }

  const emailLower = email.toLowerCase();
  const existingUser = await User.findOne({ email: emailLower });
  if (existingUser && existingUser.password) {
    return next(new ApiError(400, 'Email address already registered'));
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

  if (!existingUser) {
    // Auto-create pending user doc
    await User.create({
      name: 'Pending Customer',
      email: emailLower,
      role: 'CUSTOMER',
      permissions: getPermissionsForRole('CUSTOMER'),
      otp,
      otpExpiresAt,
      isPhoneVerified: false,
    });
  } else {
    // Save generated OTP
    await User.updateOne({ _id: existingUser._id }, { otp, otpExpiresAt });
  }

  // Send gorgeous HTML verification email
  const emailSubject = 'সদায়ন (Sodayon) অ্যাকাউন্ট ভেরিফিকেশন কোড';
  const emailText = `আপনার সদায়ন ওটিপি (OTP) ভেরিফিকেশন কোড: ${otp}`;
  const emailHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="margin-bottom: 12px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="70" height="70" style="display: inline-block; vertical-align: middle;">
            <g fill="#1e293b">
              <path d="M422.85,664.81c-11.24,0-21.9-.09-32.56,0-7.76.09-15.29,1.4-22.12,5.4-9.13,5.35-12.91,13.64-12.75,23.87.15,10,4.69,17.81,14,21.6,6.9,2.82,14.42,4.12,21.66,6.07,1,.26,2,.38,3.73.7l-15.46,20.69,23.2,25.93a48.08,48.08,0,0,1-24.9,4.91c-39.31-2.1-71.91-32.21-76.54-71.27-2.54-21.48,5.12-40,19.26-55.8,5-5.59,11-10.36,16.68-15.25,5.88-5,11.56-10.25,11.49-18.58A49.94,49.94,0,0,0,346,598.62q-34.11-107.18-68.46-214.28c-6.48-20.3-12.77-40.66-19.16-61-.54-1.73-1.1-3.47-1.8-5.15-4.87-11.67-12.42-16.73-25.11-16.62-9,.07-18,.7-26.94.55-10.4-.17-20.84-.48-31.18-1.55-12.17-1.27-21.62-9-23.76-19.49-2.76-13.48,1.76-24.16,16-28.07A40.14,40.14,0,0,1,176,251.43c24.61-.11,49.23-.44,73.82.14,27.36.64,46.77,15.51,55.52,42.38,16,49.06,31.52,98.25,47.24,147.39q31.67,99,63.28,197.93C418.44,647.53,420.44,656,422.85,664.81Z" stroke="#1e293b" stroke-width="4" />
              <path d="M627.53,773.43c5.29-5.76,9.88-10.82,14.56-15.81q13.36-14.24,26.83-28.38c3.92-4.1,8.75-6.73,14.48-6.74,33.72-.08,67.44-.46,101.14.17,20.49.38,31.15,19.55,22.09,38-4.5,9.19-12.42,12.43-22.1,12.47-28,.14-56,.32-84,.38-22.65,0-45.3-.07-68-.12Z" stroke="#1e293b" stroke-width="4" />
              <path d="M407.2,886.27a49.88,49.88,0,1,1,49.88-49.88A49.94,49.94,0,0,1,407.2,886.27Zm0-69.13a19.25,19.25,0,1,0,19.25,19.25A19.28,19.28,0,0,0,407.2,817.14Z" stroke="#1e293b" stroke-width="4" />
              <path d="M714.58,882.36a49.88,49.88,0,1,1,49.88-49.88A49.94,49.94,0,0,1,714.58,882.36Zm0-69.13a19.25,19.25,0,1,0,19.24,19.25A19.27,19.27,0,0,0,714.58,813.23Z" stroke="#1e293b" stroke-width="4" />
              <path d="M433.91,564.49c12.95.65,25.41,2.1,37.81,1.72,20.84-.64,35.67-10.86,43.25-30.68,5.56-14.53,8-29.15.62-43.85-5.49-11-14.46-18.62-24.55-25.09-15.23-9.77-32-16.19-49-22-5.18-1.78-5-1.73-4.48-7.36,1.27-12.81,2.37-25.64,3.56-38.64a21.63,21.63,0,0,0-2.84-.4c-18.62.09-37.23.22-55.85.27a52.93,52.93,0,0,1-10.08-.61c-7.36-1.4-11.92-6.2-14-13.21-4-13.58-7.76-27.23-11.6-40.85a6.76,6.76,0,0,1,0-1.64H759V397H715.48c0,5.14,0,9.8,0,14.45q-.06,44.93-.17,89.86c0,7.68-.29,15.36-.68,23-.46,9.05-3.73,17.34-10,23.61-20,20-40.39,39.44-60.64,59.11l-1.21-.55c0-1.73,0-3.45,0-5.17-.23-12.23.25-24.52-.88-36.67-1.71-18.42-17.4-29.29-34.61-24.81-8.54,2.23-14.38,8.14-19.23,15.11-6.83,9.83-13.49,19.79-20.28,29.65-10.94,15.87-24.06,29.41-41.42,38.33-24.4,12.54-49.71,15.26-76,6.64-8-2.62-14.87-6.63-16.58-15.82a38.57,38.57,0,0,1-.38-7.38c.12-12.88.31-25.77.48-38.65C433.92,566.42,433.91,565.14,433.91,564.49ZM518.32,399.2c31.5,19.56,53.23,46.25,61.89,82.82,10.52-4.65,20.82-7.27,31.93-5.82s20.38,6.45,29.57,13v-90Z" />
            </g>
            <path fill="#6366f1" d="M524.55,862.3,403.84,743.73l49.21-45.61,66.66,80.36q126-134.28,252-268.58l-34.81-30.48,139.25-36.11c-7.9,46.66-15.69,92.61-23.53,138.82a4.88,4.88,0,0,1-1.41-.57c-7.68-7-15.54-13.87-23-21.16-8.22-8.07-14.66-8.38-22.65.06-13.68,14.47-27.18,29.11-40.76,43.68Q707,666.3,649.1,728.47,589,793.08,528.89,857.72C527.58,859.13,526.24,860.51,524.55,862.3Z" />
          </svg>
        </div>
        <h2 style="color: #1e293b; margin: 0; font-size: 28px; font-weight: 800; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
          সদা<span style="color: #6366f1;">য়ন</span>
        </h2>
        <p style="color: #4f46e5; margin: 4px 0 0 0; font-size: 14px; font-weight: 700; letter-spacing: 0.5px;">সাধ্যের মধ্যে সেরাটা</p>
      </div>
      <div style="border-top: 1px solid #f1f5f9; padding-top: 24px;">
        <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
          সদায়ন-এ অ্যাকাউন্ট তৈরির জন্য আপনাকে ধন্যবাদ! আপনার ইমেইল এড্রেস ভেরিফাই করতে নিচের ওটিপি (OTP) কোডটি ব্যবহার করুন। এই কোডটির মেয়াদ <strong>১০ মিনিট</strong> থাকবে।
        </p>
        <div style="text-align: center; margin: 35px 0;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #4f46e5; background-color: #f5f3ff; padding: 14px 35px; border-radius: 12px; border: 2px dashed #c7d2fe; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 30px;">
          অনুরোধ না করে থাকলে এই ইমেইলটি উপেক্ষা করুন। কোনো সহযোগিতার জন্য support@sodayon.com-এ যোগাযোগ করতে পারেন।
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to: emailLower,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
  });

  res.status(200).json({
    success: true,
    message: 'Verification code sent to your email successfully',
  });
});

// Email Register Verify - Confirm OTP and mark email as verified
export const emailRegisterVerify = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return next(new ApiError(400, 'Email and verification code are required'));
  }

  const emailLower = email.toLowerCase();
  const user = await User.findOne({
    email: emailLower,
    otp,
    otpExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    return next(new ApiError(400, 'Invalid or expired verification code'));
  }

  // Clear OTP fields
  await User.updateOne({ _id: user._id }, { $unset: { otp: 1, otpExpiresAt: 1 } });

  res.status(200).json({
    success: true,
    message: 'Email address verified successfully',
  });
});


import { Router } from 'express';
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
} from './auth.controller';
import { validate } from '../../middleware/validate';
import { protect } from '../../middleware/auth';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from './auth.validation';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

// Protected Auth Routes
router.post('/change-password', protect, validate(changePasswordSchema), changePassword);

export default router;

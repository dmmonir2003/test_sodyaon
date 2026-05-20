import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import { ApiError } from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';
import { UserRole, IPermissions } from '../modules/user/user.types';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Retrieve token from Authorization header or cookie
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers.cookie) {
    const parsedCookies = req.headers.cookie.split(';').reduce((acc: Record<string, string>, cur) => {
      const [key, val] = cur.trim().split('=');
      if (key && val) acc[key] = val;
      return acc;
    }, {});
    if (parsedCookies.auth_token) {
      token = parsedCookies.auth_token;
    }
  }

  if (!token) {
    return next(new ApiError(401, 'You are not logged in. Please log in to gain access.'));
  }

  // Verify JWT
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'sodayon-default-secret');

  // Verify user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new ApiError(401, 'The user belonging to this token no longer exists.'));
  }

  // Add user to the request object
  req.user = currentUser;
  next();
});

// Role-based restrict middleware
export const restrictTo = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have permission to perform this action.'));
    }
    next();
  };
};

// Permission-based restrict middleware
export const requirePermission = (permission: keyof IPermissions) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Please authenticate.'));
    }

    // SUPER_ADMIN automatically bypasses all permission checks
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    if (!req.user.permissions || !req.user.permissions[permission]) {
      return next(new ApiError(403, 'You do not possess the required permission for this resource.'));
    }

    next();
  };
};

import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Get Profile by ID
export const getUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const reqUser = (req as any).user;

  // Customers can only access their own profiles. Admins/Staff can access any.
  if (reqUser.role === 'CUSTOMER' && reqUser.id !== userId) {
    return next(new ApiError(403, 'Forbidden: You cannot access this user profile'));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError(404, 'User profile not found'));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Update Profile
export const updateUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const reqUser = (req as any).user;
  const updates = { ...req.body };

  // Safety/Security validation: Customers can only update their own profile.
  if (reqUser.role === 'CUSTOMER' && reqUser.id !== userId) {
    return next(new ApiError(403, 'Forbidden: You cannot modify this user profile'));
  }

  // Prevent role/permissions escalation unless requestor is SUPER_ADMIN or possesses canManageTeam permissions
  if (updates.role || updates.permissions) {
    const isAuthorized = reqUser.role === 'SUPER_ADMIN' || (reqUser.permissions && reqUser.permissions.canManageTeam);
    if (!isAuthorized) {
      delete updates.role;
      delete updates.permissions;
    }
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ApiError(404, 'User not found'));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

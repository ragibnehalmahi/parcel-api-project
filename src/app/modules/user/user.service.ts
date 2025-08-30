import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import AppError from "../../../errorHelpers/appError";
import { IAuthProvider, IUser, UserRole, UserStatus } from "./user.interface";
import { User } from "./user.model";
import { envVars } from "../../config";

/**
 * Create a new user
 */
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  if (!email || !password) {
    throw new AppError("Email and password are required", httpStatus.BAD_REQUEST);
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError("User already exists", httpStatus.BAD_REQUEST);
  }

  
  const hashedPassword = await bcrypt.hash(
    password as string,
      10,
  );

 
  const newUser = await User.create({ ...rest, email, password: hashedPassword });

  return newUser;
};

/**
 * Update user details
 */
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  authUser: { _id: string; role: string; status: string }
) => {
  const existingUser = await User.findById(userId);

  if (!existingUser) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  // Prevent email update
  if (payload.email) {
    throw new AppError("Email cannot be updated", httpStatus.BAD_REQUEST);
  }

  // Role-based restrictions
  if (payload.role) {
    if (authUser.role === UserRole.SENDER || authUser.role === UserRole.RECEIVER) {
      throw new AppError("You are not authorized to change roles", httpStatus.FORBIDDEN);
    }

    if (payload.role === UserRole.ADMIN && authUser.role !== UserRole.ADMIN) {
      throw new AppError("You are not authorized to promote to admin", httpStatus.FORBIDDEN);
    }
  }

  // Status changes restricted
  if (payload.status || payload.isDeleted || payload.isVerified) {
    if (authUser.role !== UserRole.ADMIN) {
      throw new AppError("You are not authorized to change user status", httpStatus.FORBIDDEN);
    }
  }

  // Hash password if updated
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};


/**
 * Get all users
 */
const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
  updateUser,
};
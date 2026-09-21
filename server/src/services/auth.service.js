import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const SALT_ROUNDS = 10;

export async function register({ name, email, password }) {
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400, 'MISSING_FIELDS');
  }
  if (password.length < 6) {
    throw new AppError('Password must be at least 6 characters', 400, 'WEAK_PASSWORD');
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new AppError('Email already registered', 409, 'EMAIL_EXISTS');
  }

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email: email.toLowerCase(), password_hash });

  const token = generateToken(user);
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
}

export async function login({ email, password }) {
  if (!email || !password) {
    throw new AppError('Email and password are required', 400, 'MISSING_FIELDS');
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const token = generateToken(user);
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
}

export async function getSession(userId) {
  const user = await User.findById(userId).select('-password_hash');
  if (!user) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }
  return { id: user._id, name: user.name, email: user.email };
}

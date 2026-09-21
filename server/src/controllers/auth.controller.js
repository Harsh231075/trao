import * as authService from '../services/auth.service.js';

export async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  res.json({ message: 'Logged out successfully' });
}

export async function getSession(req, res, next) {
  try {
    const user = await authService.getSession(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

import { getUserBySessionToken } from '../models/user.model';
import ApiError from '../errors/api.errors';
import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['praktikaUserToken'];

    if (!sessionToken) throw ApiError.Unauthorized();

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) throw ApiError.Unauthorized();

    // here I want to add user to request with this middleware on protected routes

    return next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['praktikaUserToken'];

    if (!sessionToken) throw ApiError.Unauthorized();

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) throw ApiError.Unauthorized();

    if (existingUser.role !== 'ADMIN') throw ApiError.Forbidden();

    next();
  } catch (error) {
    next(error);
  }
};

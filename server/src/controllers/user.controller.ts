import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const result = await UserService.register(username, email, password);

      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await UserService.login(email, password);

      res.cookie('praktikaUserToken', user.userToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 diena
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(200).json({ success: true, data: user.userData });
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(201).json({ success: true, data: 'logout' });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const allUsers = await UserService.getAllUsers();

      res.status(201).json({ success: true, data: allUsers });
    } catch (error) {
      next(error);
    }
  }

  static async profile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(201).json({ success: true, data: 'profile' });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(201).json({ success: true, data: 'update user' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const deletedUser = await UserService.deleteUser(id);

      res.status(200).json({ success: true, data: deletedUser });
    } catch (error) {
      next(error);
    }
  }
}

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

      res.cookie('praktikaUserToken', user.sessionToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 diena
        httpOnly: true,
      });

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
}

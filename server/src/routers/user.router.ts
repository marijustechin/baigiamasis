import { validateData } from '../middlewares/validation.middleware';
import UserController from '../controllers/user.controller';
import express from 'express';
import {
  mongoIdSchema,
  userLoginSchema,
  userRegisterSchema,
} from '../schemas/user.schemas';
import { isAdmin } from '../middlewares/auth.middleware';

const userRouter = express.Router();

userRouter.post(
  '/register',
  validateData(userRegisterSchema, 'body'),
  UserController.register
);

userRouter.post(
  '/login',
  validateData(userLoginSchema, 'body'),
  UserController.login
);
userRouter.post('/logout', UserController.logout);
userRouter.get('/', UserController.getAllUsers);

userRouter.delete(
  '/:id',
  isAdmin,
  validateData(mongoIdSchema, 'params'),
  UserController.deleteUser
);

userRouter.get('/me', UserController.profile);
userRouter.patch('/update', UserController.updateUser);

export default userRouter;

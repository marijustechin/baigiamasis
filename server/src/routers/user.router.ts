import { validateData } from '../middlewares/validation.middleware';
import UserController from '../controllers/user.controller';
import express from 'express';
import { userLoginSchema, userRegisterSchema } from '../schemas/user.schemas';

const userRouter = express.Router();

userRouter.post(
  '/register',
  validateData(userRegisterSchema),
  UserController.register
);
userRouter.post('/login', validateData(userLoginSchema), UserController.login);

export default userRouter;

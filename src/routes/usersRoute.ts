import { Router, Request, Response } from 'express';
import * as userController from '../controllers/userController';
import { getToken } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

export const usersRouter = Router();

// user signup
usersRouter.post('/', userController.createUser, getToken);

usersRouter.use('/me', authMiddleware);
usersRouter.route('/me').get(userController.getUser);

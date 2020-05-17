import { Router, Request, Response } from 'express';
import * as userController from '../controllers/userController';
import { getToken } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { conversationsRouter } from './conversationsRoute';

export const usersRouter = Router();

// user signup
usersRouter.post('/', userController.validateUserSignup, userController.createUser, getToken);

usersRouter.use('/me', authMiddleware);
usersRouter.route('/me').get(userController.getUser);

usersRouter.use('/me/conversations', conversationsRouter);

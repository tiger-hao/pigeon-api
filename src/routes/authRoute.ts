import { Router, Request, Response } from 'express';
import { getToken } from '../controllers/authController';
import { validateUserLogin } from '../controllers/userController';

export const authRouter = Router();

authRouter.post('/token', validateUserLogin, getToken);

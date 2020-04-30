import { Router, Request, Response } from 'express';
import { getToken } from '../controllers/authController';
import { validateUser } from '../controllers/userController';

export const authRouter = Router();

authRouter.post('/token', validateUser, getToken);

import { Router, Request, Response } from 'express';
import * as authController from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/token', authController.getToken);

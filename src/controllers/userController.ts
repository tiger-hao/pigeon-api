import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { IUser } from '../models/userModel';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      error: 'Invalid body: required fields missing'
    });
  }

  try {
    const userData: IUser = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    };
    const user = await userService.createUser(userData);

    return res.json({
      user: { email: user.email }
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Email already in use'
      });
    }

    next(err);
  }
}

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { IUser, validateUser } from '../models/userModel';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message)
    });
  }

  try {
    const user = await userService.createUser({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    });

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

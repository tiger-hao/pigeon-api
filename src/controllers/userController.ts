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

  const { email, password } = req.body;

  try {
    if (await userService.getUserByEmail(email)) {
      return res.status(400).json({
        error: 'Email already in use'
      });
    }

    const user = await userService.createUser({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    });

    next();
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const { email } = req.app.locals.user;

  try {
    const user = await userService.getUserByEmail(email);
    return res.json({
      user: { email: user.email }
    });
  } catch (err) {
    next(err);
  }
}

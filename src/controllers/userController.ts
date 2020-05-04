import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import * as userService from '../services/userService';

export const validateUserLogin = [
  check('email')
    .exists().withMessage('Email required')
    .isEmail().normalizeEmail(),
  check('password')
    .exists().withMessage('Password required')
    .isLength({ min: 8 }).withMessage('Must be at least 8 characters long')
    .matches(/\d/).withMessage('Must contain a number')
];

export const validateUserSignup = [
  ...validateUserLogin,
  check('name.first').exists().withMessage('First name required'),
  check('name.last').exists().withMessage('Last name required')
];

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array({ onlyFirstError: true })
    });
  }

  const { email, password, name } = req.body;

  try {
    if (await userService.getUserByEmail(email)) {
      return res.status(400).json({
        error: 'Email already in use'
      });
    }

    const user = await userService.createUser({
      email,
      password: await bcrypt.hash(password, 10),
      name
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

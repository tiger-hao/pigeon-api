import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { check } from 'express-validator';
import * as userService from '../services/userService';
import { validationMiddleware } from '../middleware/validationMiddleware';

export const validateUserLogin = [
  check('email')
    .exists().withMessage('Email required')
    .isEmail().normalizeEmail(),
  check('password')
    .exists().withMessage('Password required')
    .isLength({ min: 8 }).withMessage('Must be at least 8 characters long')
    .matches(/\d/).withMessage('Must contain a number'),
  validationMiddleware
];

export const validateUserSignup = [
  ...validateUserLogin,
  check('name.first').exists().withMessage('First name required'),
  check('name.last').exists().withMessage('Last name required'),
  validationMiddleware
];

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, name } = req.body;

  try {
    if (await userService.getUserByEmail(email)) {
      return res.status(409).json({
        status: 'fail',
        data: {
          email: 'Email already in use'
        }
      });
    }

    await userService.createUser({
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
  const { id } = req.app.locals.user;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        data: {
          user: 'Account does not exist'
        }
      });
    }

    const { name, email } = user;

    return res.json({
      status: 'success',
      data: {
        user: {
          name,
          email
        }
      }
    });
  } catch (err) {
    next(err);
  }
}

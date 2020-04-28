import { Router, Request, Response, NextFunction } from 'express';
import { UserModel, IUserModel, IUser } from '../models/userModel';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      error: 'Invalid body: required fields missing'
    });
  }

  const userData: IUser = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const emailTaken = await UserModel.findOne({ email: userData.email });

    if (emailTaken) {
      res.status(400).json({
        error: 'Email already in use'
      });
      return;
    }

    const user = await UserModel.create(userData);
    res.json({
      user: { email: user.email }
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      error: 'Invalid body: required fields missing'
    });
  }

  const userData: IUser = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const user = await UserModel.findOne(userData);

    if (!user) {
      res.status(401).json({
        error: 'User not found'
      });
    }

    res.json({
      user: { email: user.email }
    });
  } catch (err) {
    next(err);
  }
}

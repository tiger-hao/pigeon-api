import { Router, Request, Response } from 'express';
import { UserModel, IUserModel } from '../models/userModel';

export function createUser(req: Request, res: Response): Response {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      error: "Invalid Body",
    });
  }

  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  // insert user into db
  UserModel.create(userData, (err: any, user: IUserModel) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.json({
      success: true,
      user: { email: user.email },
    });
  });
}

export function login(req: Request, res: Response): Response {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      error: "Invalid Body",
    });
  }

  const user = {
    email: req.body.email,
    password: req.body.password
  };

  UserModel.findOne(user, (err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else if (!data) {
      return res.status(401).json({
        success: false,
        error: "User not found"
      });
    }

    return res.json({ success: true, data: data });
  });
}

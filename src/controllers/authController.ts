import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, IUser, validateUser } from '../models/userModel';
import { getUserByEmail } from '../services/userService';

export async function getToken(req: Request, res: Response, next: NextFunction) {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message)
    });
  }

  try {
    const user = await getUserByEmail(req.body.email);

    if (!user) {
      return res.status(400).json({
        error: 'Account does not exist'
      });
    }

    const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json({
        error: 'Incorrect password'
      });
    }

    const payload = {
      user: {
        email: user.email
      }
    }

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

    return res.json({
      access_token: token,
      token_type: 'Bearer'
    });
  } catch (err) {
    next(err);
  }
}

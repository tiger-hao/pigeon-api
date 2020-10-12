import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../services/userService';

export interface TokenPayload {
  user: {
    id: string;
  };
}

export async function getToken(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUserByEmail(req.body.email);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        data: {
          email: 'Account does not exist'
        }
      });
    }

    const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json({
        status: 'fail',
        data: {
          password: 'Incorrect password'
        }
      });
    }

    const payload: TokenPayload = {
      user: {
        id: user.id
      }
    }

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    return res.json({
      status: 'success',
      data: {
        access_token: token,
        token_type: 'Bearer'
      }
    });
  } catch (err) {
    next(err);
  }
}

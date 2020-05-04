import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../services/userService';

export async function getToken(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      data: {
        errors: errors.array({ onlyFirstError: true })
      }
    });
  }

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

    const payload = {
      user: {
        email: user.email
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

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { UserModel, IUser, validateUser } from '../models/userModel';

export async function getToken(req: Request, res: Response, next: NextFunction) {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message)
    });
  }

  try {
    const user = await UserModel.findOne({ email: req.body.email });

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

    return res.json({
      user: { email: user.email }
    });
  } catch (err) {
    next(err);
  }
}

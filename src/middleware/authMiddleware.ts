import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../controllers/authController';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization && req.headers.authorization.split(' ');

  if (!authHeader || authHeader[0] !== "Bearer" || !authHeader[1]) {
    return res.sendStatus(401);
  }

  const token = authHeader[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as TokenPayload;
    res.locals.user = decoded.user;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization && req.headers.authorization.split(' ');

  if (!authHeader || authHeader[0] !== "Bearer" || !authHeader[1]) {
    return res.sendStatus(401);
  }

  const token = authHeader[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.app.locals = decoded;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}

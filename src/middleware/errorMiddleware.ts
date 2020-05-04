import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  return res.status(500).json({
    status: 'error',
    message: err.message
  });
}

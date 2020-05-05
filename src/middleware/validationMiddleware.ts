import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { ValidationError } from 'express-validator/src/base';

export function validationMiddleware(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const data: { [key: string]: string } = {};

    errors.array({ onlyFirstError: true }).forEach(({ param, msg }: ValidationError) => {
      data[param] = msg;
    })

    return res.status(400).json({
      status: 'fail',
      data
    });
  }

  next();
}

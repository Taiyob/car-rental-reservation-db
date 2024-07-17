import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

const zodValidationMiddleware = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default zodValidationMiddleware;

import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

const zodValidationMiddleware = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      console.log('Testing', body);
      await schema.parseAsync(body);
      next();
    } catch (error) {
      console.log('From zod validation',error);
      next(error);
    }
  };
};

export default zodValidationMiddleware;

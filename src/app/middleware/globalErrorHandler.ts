import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { TErrorResources } from '../interface/error.interface';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorResources: TErrorResources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error?.name === 'ValidationError') {
    const simplyfiedError = handleValidationError(error);
    errorResources = simplyfiedError?.errorResources;
    statusCode = simplyfiedError.statusCode;
  } else if (error?.name === 'CastError') {
    const simplyfiedError = handleCastError(error);
    errorResources = simplyfiedError?.errorResources;
    statusCode = simplyfiedError.statusCode;
  } else if (error?.code === 11000) {
    const simplyfiedError = handleDuplicateError(error);
    errorResources = simplyfiedError?.errorResources;
    statusCode = simplyfiedError.statusCode;
  } else if (error instanceof ZodError) {
    const simplyfiedError = handleZodError(error);
    errorResources = simplyfiedError?.errorResources;
    statusCode = simplyfiedError.statusCode;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorResources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorResources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  return res.send(statusCode).json({
    success: false,
    statusCode,
    message: error?.name | (message as any),
    errorResources,
  });
};

export default globalErrorHandler;

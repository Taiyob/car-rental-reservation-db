import { ZodError } from 'zod';
import { TErrorResources } from '../interface/error.interface';
import httpStatus from 'http-status';

const handleZodError = (error: ZodError) => {
  const errorResources: TErrorResources = error.issues.map((err) => {
    return {
      path: err?.path[err?.path.length - 1],
      message: err?.message,
    };
  });

  return {
    statusCode: httpStatus.NOT_FOUND,
    message: 'Zod Error',
    errorResources,
  };
};

export default handleZodError;

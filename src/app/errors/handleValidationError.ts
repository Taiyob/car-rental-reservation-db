import mongoose from 'mongoose';
import { TErrorResources } from '../interface/error.interface';
import httpStatus from 'http-status';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorResources: TErrorResources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: val?.path, message: val?.message };
    },
  );
  return {
    statusCode: httpStatus.NOT_ACCEPTABLE,
    message: 'Validation error',
    errorResources,
  };
};

export default handleValidationError;

import mongoose from 'mongoose';
import { TErrorResources } from '../interface/error.interface';
import httpStatus from 'http-status';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errorResources: TErrorResources = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Cast Error',
    errorResources,
  };
};

export default handleCastError;

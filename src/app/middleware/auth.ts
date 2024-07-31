import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils.ts/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';

const authMiddleware = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not valid user!!!');
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decode) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        //console.log('Decode object:', decode);
        //const { email, userRole, user } = decode;

        req.user = decode as JwtPayload;

        next();
      },
    );
  });
};

export default authMiddleware;

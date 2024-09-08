import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils.ts/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const authMiddleware = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not valid user!!!');
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      console.log('From App TS:', decoded);
    } catch (error) {
      console.log('From App TS:', decoded);
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    console.log('From App TS:', decoded);

    //const { email, userRole, user, iat } = decoded;
    const { email, userRole, iat } = decoded;
    const userCheck = await User.isUserExistByEmail(email);
    if (!userCheck) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const isDeleted = userCheck?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
    }

    if (
      userCheck?.passwordChangedAt &&
      User?.isJWTIssuedBeforePasswordChange(
        userCheck?.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    //const role = (decoded as JwtPayload)?.userRole;
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        `You are not authorized!... ${userRole} can not handle it`,
      );
    }

    req.user = decoded as JwtPayload;
    next();

    // jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    //   function (err, decode) {
    //     if (err) {
    //       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    //     }
    //     console.log('Decode object:', decode);
    //     const { email, userRole, user } = decode;

    //     const role = (decode as JwtPayload)?.userRole;
    //     if (userRole && !userRole.includes(role)) {
    //       throw new AppError(
    //         httpStatus.UNAUTHORIZED,
    //         `You are not authorized!... ${role} can not handle it`,
    //       );
    //     }

    //     req.user = decode as JwtPayload;

    //     next();
    //   },
    // );
  });
};

export default authMiddleware;

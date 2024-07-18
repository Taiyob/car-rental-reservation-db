import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUserIntoDB = async (payLoad: TUser) => {
  const email = payLoad.email;
  const name = payLoad.name;
  const checkexistingUserNameAndEmail = await User.isUserExist(name, email);

  if (checkexistingUserNameAndEmail) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This name or mail is already in use for this web',
    );
  }

  payLoad.password = payLoad.password || (config.default_password as string);
  const result = await User.create(payLoad);
  return result;
};

const loginUserFromDB = async (payLoad: TUser) => {
  const user = await User.isUserExistByEmail(payLoad?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is already deleted');
  }

  const isPassowrdMatched = await User.isPasswordMatched(
    payLoad?.password,
    user?.password,
  );
  if (!isPassowrdMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password not matched');
  }

  return { user };
};

export const AuthServices = {
  createUserIntoDB,
  loginUserFromDB,
};

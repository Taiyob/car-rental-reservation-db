import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUserIntoDB = async (payLoad: TUser) => {
    const email = payLoad.email;
    const name = payLoad.name;
    const checkexistingUserNameAndEmail = await User.isUserExist(name, email);

    if(checkexistingUserNameAndEmail){
        throw new AppError(httpStatus.BAD_REQUEST, 'This name or mail is already in use for this web');
    }

  payLoad.password = payLoad.password || (config.default_password as string);
  const result = await User.create(payLoad);
  return result;
};

export const AuthServices = {
  createUserIntoDB,
};

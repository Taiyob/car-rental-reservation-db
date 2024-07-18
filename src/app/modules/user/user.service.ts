import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUserFromDB = async () => {
  const result = await User.find();

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

export const UserServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
};

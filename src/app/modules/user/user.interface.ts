import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
  isDeleted?: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(name: string, email: string): boolean;
}

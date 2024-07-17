import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    role: { type: String, enum: ['user', 'admin'], required: true },
    password: { type: String, required: [true, 'Password is required'] },
    phone: { type: String, required: [true, 'Phone is required'] },
    address: { type: String, required: [true, 'Address is required'] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const User = model<TUser>('User', userSchema);

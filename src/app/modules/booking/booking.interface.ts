import { Model, Types } from 'mongoose';

export type TBooking = {
  date: Date;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost?: number;
  status?: string;
};
// 15minutesbd@gmail.com

export interface BookingModel extends Model<TBooking> {
  isBookingExistById(id: string): Promise<TBooking>;
}

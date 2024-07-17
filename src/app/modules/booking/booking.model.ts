import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  date: { type: Date, required: [true, 'Date is required'] },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Car ID is required'],
  },
  startTime: { type: String, required: [true, 'Start time is required'] },
  endTime: { type: String, required: [true, 'End time is required'] },
  totalCost: { type: Number, required: [true, 'Total cost is required'] },
});

export const Booking = model<TBooking>('Booking', bookingSchema);

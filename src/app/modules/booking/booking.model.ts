import { model, Schema } from 'mongoose';
import { BookingModel, TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking, BookingModel>(
  {
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
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
    },
    transactionId: { type: String },
  },
  { timestamps: true },
);

bookingSchema.statics.isBookingExistById = async function (id: string) {
  return await Booking.findById(id);
};

export const Booking = model<TBooking, BookingModel>('Booking', bookingSchema);

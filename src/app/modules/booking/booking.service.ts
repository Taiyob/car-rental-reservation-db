import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Car } from '../car/car.model';
import { TBooking } from './booking.interface';

const bookingCarIntoDB = async (payLoad: TBooking) => {
  const carExist = await Car.isCarExist(payLoad?.car);
  if (!carExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This car is not in database');
  }

  const carAvailability = carExist?.status;
  if (carAvailability === 'unavailable') {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Sorry!!! At this time, this product is not in-stock',
    );
  }

  const isDeleted = carExist?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This car request is not acceptable, because it is already deleted!!!',
    );
  }

  //const result = await
};

export const BookingCarServices = { bookingCarIntoDB };

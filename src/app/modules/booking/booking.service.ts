import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Car } from '../car/car.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { JwtPayload } from 'jsonwebtoken';

const bookingCarIntoDB = async ({
  payLoad,
  userInfo,
}: {
  payLoad: TBooking;
  userInfo: JwtPayload;
}) => {
  const { user } = userInfo;
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not registered, first you make a account please.',
    );
  }

  const car = await Car.isCarExist(payLoad?.car);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'This car is not in database');
  }

  const carAvailability = car?.status;
  if (carAvailability === 'unavailable') {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Sorry!!! At this time, this product is not in-stock',
    );
  }

  const isDeleted = car?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This car request is not acceptable, because it is already deleted!!!',
    );
  }

  //const totalCost = carExist.pricePerHour * (new Date(payLoad.endTime).getHours() - new Date(payLoad.startTime).getHours());

  const result = await Booking.create({ ...payLoad, user: user, car: car });

  const populatedResult = await Booking.findById(result._id)
    .populate('user')
    .populate('car')
    .exec();

  return populatedResult;
};

export const BookingCarServices = { bookingCarIntoDB };

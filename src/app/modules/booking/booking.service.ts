import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Car } from '../car/car.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookingSearchableFields } from './booking.constant';

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
      'Sorry!!! At this time, this car is not available',
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

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  //const result1 = await Booking.find().populate('user').populate('car');
  const bookingQuery = new QueryBuilder(
    Booking.find().populate('user').populate('car'),
    query,
  )
    .search(bookingSearchableFields)
    .filter();
  // .sort()
  // .paginate()
  // .fields();
  try {
    const result = await bookingQuery.modelQuery;
    return result;
  } catch (error) {
    // Log or handle error appropriately
    console.error('Error retrieving bookings:', error);
    throw new Error('Error retrieving bookings');
  }
};

const getUserHisAllBookingsFromDB = async (userInfo: JwtPayload) => {
  const { user } = userInfo;
  if (!user || !user._id) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User information is missing or invalid.',
    );
  }

  const result = await Booking.find({ user: user._id })
    .populate('user')
    .populate('car');

  return result;
};

export const BookingCarServices = {
  bookingCarIntoDB,
  getAllBookingsFromDB,
  getUserHisAllBookingsFromDB,
};

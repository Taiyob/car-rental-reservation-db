import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Car } from '../car/car.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookingSearchableFields } from './booking.constant';
import { initiatePayment } from '../payment/payment.utils';

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
    .filter()
    .sort()
    .paginate()
    .fields();
  try {
    const result = await bookingQuery.modelQuery;
    const meta = await bookingQuery.countTotal();
    return { meta, result };
  } catch (error) {
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

const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id).populate('user').populate('car');

  return result;
};

const bookingApprovalFromAdmin = async (id: string) => {
  const isBookingExist = await Booking.isBookingExistById(id);
  if (!isBookingExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no booking against this ID.',
    );
  }

  const isAlreadyApproved = isBookingExist.status;
  if (isAlreadyApproved === 'approved') {
    throw new AppError(
      httpStatus.CONFLICT,
      'This booking has already been approved.',
    );
  }

  const payLoad = { status: 'approved' };
  const result = await Booking.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  });

  return result;
};

const completeBooking = async (id: string, payLoad: Partial<TBooking>) => {
  const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

  const result = await Booking.findByIdAndUpdate(
    id,
    { ...payLoad, transactionId },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data do not found!!!');
  }
  await result.save();

  const paymentData = {
    transactionId,
  };

  const paymentSession = await initiatePayment(paymentData);
  console.log(paymentSession);

  return paymentSession;
};

export const BookingCarServices = {
  bookingCarIntoDB,
  getAllBookingsFromDB,
  getUserHisAllBookingsFromDB,
  getSingleBookingFromDB,
  bookingApprovalFromAdmin,
  completeBooking,
};

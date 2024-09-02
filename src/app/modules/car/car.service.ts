import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCar } from './car.interface';
import { Car } from './car.model';
import { TBooking } from '../booking/booking.interface';
import { Booking } from '../booking/booking.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { carSearchableFields } from './car.constant';

const createCarIntoDB = async (payLoad: TCar) => {
  const name = await Car.isCarNameExit(payLoad?.name);
  console.log('Car name:', name);
  if (name) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'This same car name is already exist, please make a new car bio...',
    );
  }

  const result = await Car.create(payLoad);

  return result;
};

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(Car.find(), query)
    .search(carSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  const meta = await carQuery.countTotal();

  return { meta, result };
};

const getAllCarsImageFromDB = async () => {
  const result = await Car.find(
    {},
    {
      image: { $slice: 1 },
      name: 0,
      color: 0,
      description: 0,
      features: 0,
      _id: 0,
      isDeleted: 0,
      isElectric: 0,
      pricePerHour: 0,
      status: 0,
    },
  );

  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);

  return result;
};

const updateCarFromDB = async (id: string, payLoad: Partial<TCar>) => {
  const car = await Car.isCarExist(id);
  if (!car) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This car do not exist in database!!!',
    );
  }

  const isDeleted = car?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'This car is already deleted softly, you can not update it',
    );
  }

  const result = await Car.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCarFromDB = async (id: string) => {
  const car = await Car.isCarExist(id);
  if (!car) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This car do not exist in database!!!',
    );
  }
  const isDeleted = car?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This car is already deleted from database!!!',
    );
  }

  const result = await Car.findOneAndUpdate(
    { _id: id },
    { isDeleted: true, status: 'unavailable' },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const returnCarFromCustomer = async ({
  payLoad,
  bookingId,
}: {
  payLoad: Partial<TBooking>;
  bookingId: string;
}) => {
  const bookedCarDetails = await Booking.findById(bookingId);
  console.log('Checking the ID:', bookedCarDetails);
  if (!bookedCarDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'This car is not booked!!!');
  }

  const car = await Car.findById({ _id: bookedCarDetails.car });
  console.log('See the price:', car);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car details not found!');
  }

  const price = car?.pricePerHour;
  if (!price) {
    throw new AppError(
      httpStatus.NOT_IMPLEMENTED,
      'Price do not set in the car properly!!',
    );
  }

  if (!payLoad.startTime || !payLoad.endTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Start time and end time are required!',
    );
  }

  const startTime = new Date(`${bookedCarDetails.date}T${payLoad.startTime}`);
  const endTime = new Date(`${bookedCarDetails.date}T${payLoad.endTime}`);

  if (endTime <= startTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'End time must be after start time!',
    );
  }

  const durationInHours =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  const totalCost = price * durationInHours;

  const result = await Booking.findOneAndUpdate(
    { _id: bookingId },
    { endTime: payLoad.endTime, totalCost },
    { new: true, runValidators: true },
  )
    .populate('user')
    .populate('car');

  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getAllCarsImageFromDB,
  getSingleCarFromDB,
  updateCarFromDB,
  deleteCarFromDB,
  returnCarFromCustomer,
};

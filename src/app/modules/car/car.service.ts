import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCar } from './car.interface';
import { Car } from './car.model';

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

const getAllCarsFromDB = async () => {
  const result = await Car.find();

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

  const result = await Car.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarFromDB,
  deleteCarFromDB,
};

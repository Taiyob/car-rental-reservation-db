import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payLoad: TCar) => {
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

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
};

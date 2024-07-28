import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { CarServices } from './car.service';

const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car created successfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved successfully',
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A cars retrieved successfully',
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const body = req.body;
  console.log(body);
  const result = await CarServices.updateCarFromDB(id, body);
  console.log('From car update controller to see result:', result);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const body = req.body;
  console.log(body);
  const result = await CarServices.updateCarFromDB(id, body);
  console.log('From car update controller to see result:', result);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car Deleted successfully',
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};

import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { CarServices } from './car.service';

const createCar = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await CarServices.createCarIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car created successfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSellingCar = catchAsync(async (req, res) => {
  const result = await CarServices.getSellingCarFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Selling car retrieved successfully',
    data: result,
  });
});

const getAllCarsImage = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsImageFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Images retrieve successfully',
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
  const body = req.body;
  const result = await CarServices.updateCarFromDB(id, body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car Deleted successfully',
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const { bookingId, startTime, endTime } = req.body;
  const result = await CarServices.returnCarFromCustomer({
    payLoad: { startTime, endTime },
    bookingId,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car returned successfully',
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getSellingCar,
  getAllCarsImage,
  getSingleCar,
  updateCar,
  deleteCar,
  returnCar,
};

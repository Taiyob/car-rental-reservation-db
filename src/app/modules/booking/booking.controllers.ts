import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { BookingCarServices } from './booking.service';

const bookingCar = catchAsync(async (req, res) => {
  const payLoad = req.body;
  const user = req.user;

  const result = await BookingCarServices.bookingCarIntoDB({
    payLoad,
    userInfo: user,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingCarServices.getAllBookingsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    //data: result,
    meta: result.meta,
    data: result.result,
  });
});

const getUserAllHisBookings = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingCarServices.getUserHisAllBookingsFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});
export const BookingCarControllers = {
  bookingCar,
  getAllBookings,
  getUserAllHisBookings,
};

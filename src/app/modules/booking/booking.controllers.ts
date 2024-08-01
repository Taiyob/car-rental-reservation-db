import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { BookingCarServices } from './booking.service';

const bookingCar = catchAsync(async (req, res) => {
  const payLoad = req.body;
  const user = req.user;
  console.log('From Controller-Catch user:', user);

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

export const BookingCarControllers = {
  bookingCar,
};

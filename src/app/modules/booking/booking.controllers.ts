import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { BookingCarServices } from './booking.service';

const bookingCar = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await BookingCarServices.bookingCarIntoDB(req.body);

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

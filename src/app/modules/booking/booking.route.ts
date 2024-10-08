import { Router } from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { BookingValidations } from './booking.validation';
import { BookingCarControllers } from './booking.controllers';
import authMiddleware from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  authMiddleware(USER_ROLE.user, USER_ROLE.admin),
  zodValidationMiddleware(BookingValidations.createBookingValidationSchema),
  BookingCarControllers.bookingCar,
);

router.get(
  '/',
  authMiddleware(USER_ROLE.admin),
  BookingCarControllers.getAllBookings,
);

router.get(
  '/my-bookings',
  authMiddleware(USER_ROLE.user, USER_ROLE.admin),
  BookingCarControllers.getUserAllHisBookings,
);

router.get(
  '/single-booking/:id',
  authMiddleware(USER_ROLE.user, USER_ROLE.admin),
  BookingCarControllers.getSingleBooking,
);

router.patch(
  '/change-booking-status/:id',
  authMiddleware(USER_ROLE.admin),
  zodValidationMiddleware(
    BookingValidations.updateBookingStatusValidationSchema,
  ),
  BookingCarControllers.bookingApproval,
);

router.patch('/complete-booking/:id', BookingCarControllers.completeBooking);

export const BookingRoutes = router;

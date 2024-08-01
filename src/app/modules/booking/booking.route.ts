import { Router } from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { BookingValidations } from './booking.validation';
import { BookingCarControllers } from './booking.controllers';
import authMiddleware from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  authMiddleware(USER_ROLE.user),
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
  authMiddleware(USER_ROLE.user),
  BookingCarControllers.getUserAllHisBookings,
);

export const BookingRoutes = router;

import { Router } from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { BookingValidations } from './booking.validation';
import { BookingCarControllers } from './booking.controllers';

const router = Router();

router.post(
  '/',
  zodValidationMiddleware(BookingValidations.createBookingValidationSchema),
  BookingCarControllers.bookingCar,
);

export const BookingRoutes = router;

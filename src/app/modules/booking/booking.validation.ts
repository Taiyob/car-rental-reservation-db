import { z } from 'zod';
import { User } from '../user/user.model';
import { Car } from '../car/car.model';

const createBookingValidationSchema = z.object({
  date: z.date(),
  user: z.string().refine(async (userId) => {
    try {
      const user = await User.findById(userId);
      return !!user;
    } catch (error) {
      return false;
    }
  }, 'Invalid user ID for user'),
  car: z.string().refine(async (carId) => {
    try {
      const car = await Car.findById(carId);
      return !!car;
    } catch (error) {
      return false;
    }
  }, 'Invalid car ID for car'),
  startTime: z.string(),
  endTime: z.string(),
  totalCost: z.number().min(0, 'Total cost must be a non-negative number'),
});

export const BookingValidations = {
  createBookingValidationSchema,
};

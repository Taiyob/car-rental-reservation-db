import { z } from 'zod';
import { User } from '../user/user.model';
import { Car } from '../car/car.model';

const createBookingValidationSchema = z.object({
  date: z.string().datetime(),
  // user: z.string().refine(async (userId) => {
  //   try {
  //     const user = await User.findById(userId);
  //     return !!user;
  //   } catch (error) {
  //     return false;
  //   }
  // }, 'Invalid user ID for user'),
  user: z.string().optional(),
  car: z.string().refine(async (carId) => {
    try {
      const car = await Car.findById(carId);
      return !!car;
    } catch (error) {
      return false;
    }
  }, 'Invalid car ID for car'),
  startTime: z.string(),
  endTime: z.string().nullable().default(null),
  totalCost: z.number().nullable().default(0),
});

export const BookingValidations = {
  createBookingValidationSchema,
};

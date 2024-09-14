import { z } from 'zod';
import { User } from '../user/user.model';
import { Car } from '../car/car.model';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().datetime(),
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
  }),
});

const updateBookingStatusValidationSchema = z.object({
  body: z.object({
    status: z.string().optional(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
  updateBookingStatusValidationSchema,
};

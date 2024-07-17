import { z } from 'zod';

const createCarValidationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  color: z.string().min(3, 'Color must be at least 3 characters'),
  isElectric: z.boolean(),
  status: z.enum(['available', 'unavailable']).default('available'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
  isDeleted: z.boolean().optional(),
});

export const CarValidation = {
  createCarValidationSchema,
};

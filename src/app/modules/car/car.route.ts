import { Router } from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { CarValidation } from './car.validation';
import { CarControllers } from './car.controller';

const router = Router();

router.post(
  '/',
  zodValidationMiddleware(CarValidation.createCarValidationSchema),
  CarControllers.createCar,
);

router.get('/', CarControllers.getAllCars);

router.get('/:id', CarControllers.getSingleCar);

router.patch('/:id', CarControllers.updateCar);

router.delete('/:id', CarControllers.deleteCar);

export const CarRoutes = router;

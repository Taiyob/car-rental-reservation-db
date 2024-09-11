import { Router } from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { CarValidation } from './car.validation';
import { CarControllers } from './car.controller';
import authMiddleware from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  authMiddleware(USER_ROLE.admin),
  zodValidationMiddleware(CarValidation.createCarValidationSchema),
  CarControllers.createCar,
);

router.get('/', CarControllers.getAllCars);

router.get('/available-car', CarControllers.getSellingCar);

router.get('/image', CarControllers.getAllCarsImage);

router.get('/:id', CarControllers.getSingleCar);

router.patch(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  zodValidationMiddleware(CarValidation.updateCarValidationSchema),
  CarControllers.updateCar,
);

router.delete(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  CarControllers.deleteCar,
);

router.put(
  '/return',
  authMiddleware(USER_ROLE.admin),
  CarControllers.returnCar,
);

export const CarRoutes = router;

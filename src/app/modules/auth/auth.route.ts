import express from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  zodValidationMiddleware(UserValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

router.post(
  '/signin',
  zodValidationMiddleware(AuthValidation.createAuthValidation),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;

import express from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  zodValidationMiddleware(UserValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

export const AuthRoutes = router;

import { Router } from 'express';
import { CarRoute } from '../modules/car/car.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const allRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/',
    route: CarRoute,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

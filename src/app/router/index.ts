import { Router } from 'express';
import { CarRoute } from '../modules/car/car.route';

const router = Router();

const allRoutes = [
  {
    path: '/',
    route: CarRoute,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

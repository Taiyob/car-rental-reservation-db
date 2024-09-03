import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CorsOptions } from 'cors';
import router from './app/router';
import cookieParser from 'cookie-parser';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();
type CorsOptionsCallback = (err: Error | null, allow: boolean) => void;

app.use(express.json());
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: CorsOptionsCallback) {
    if (
      !origin ||
      [
        'http://localhost:5173',
        'https://api.imgbb.com/1/upload?key=b5d58f2b65bca81795a60b4d18decd6e',
      ].includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: [
//       'http://localhost:5173',
//       'https://car-colledtion-reservation-backend.vercel.app',
//     ],
//     credentials: true,
//   }),
// );
app.use(cookieParser());

// Application route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Car Collection Reservation');
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;

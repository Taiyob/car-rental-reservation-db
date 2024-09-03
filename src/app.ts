import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import cookieParser from 'cookie-parser';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);
app.use(cookieParser());

// Application route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Car Collection Reservation');
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;

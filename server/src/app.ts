import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routers/user.router';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);

app.use(errorMiddleware);

export default app;

import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import cookieParser from 'cookie-parser';

import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use('/api/1.0/user', userRouter);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

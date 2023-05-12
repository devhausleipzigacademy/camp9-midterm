import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('You are not authenticated');
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    res.locals.userId = userId;
    next();
  } catch (err) {
    return res.status(401).send('You are not authenticated');
  }
}

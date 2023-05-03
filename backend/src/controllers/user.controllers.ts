import { Request, Response, NextFunction } from 'express';
import { SignupUser } from '../validate/uservalidation';
import { z } from 'zod';

export const signupController = (
  req: Request<{}, {}, SignupUser>,
  res: Response,
  next: NextFunction
) => {
  // hashing password
  // Save user to database
  console.log(req.body);
  res.send('signup');
};

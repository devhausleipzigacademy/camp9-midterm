import { Request, Response, NextFunction } from 'express';
import { SignupUser } from '../validate/userValidation';
import { PrismaClient } from '@prisma/client';
import { LoginUser } from '../validate/loginValidation';

const prisma = new PrismaClient();

export const signupController = async (
  req: Request<{}, {}, SignupUser>,
  res: Response,
  next: NextFunction
) => {
  const checkEmail = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (checkEmail) {
    return res.status(422).send('Email already exists');
  }

  const newUser = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    include: {
      bookings: true,
    },
  });
  res.send(newUser.email);
};

export const loginController = (
  req: Request<{}, {}, LoginUser>,
  res: Response,
  next: NextFunction
) => {
  //authenticating user
  res.send({ token: 'jwt' });
};

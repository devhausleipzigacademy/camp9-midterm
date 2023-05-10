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
  console.log(req.body);
  res.send(newUser.email);
};

export const loginController = (
  req: Request<{}, {}, LoginUser>,
  res: Response,
  next: NextFunction
) => {
  //authenticating user
  console.log(req.body);
  res.send({ token: 'jwt' });
};

export const getSingleUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    include: {
      bookings: true,
    },
  });
  res.send(user);
};

export const editProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.update({
    where: { id: req.body.id },
    data: {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  });
  res.send(user);
};

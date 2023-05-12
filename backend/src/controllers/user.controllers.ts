import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { SignupUser } from '../validate/userValidation';
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

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const newUser = await prisma.user.create({
    data: {
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
    include: {
      bookings: true,
    },
  });
  res.send(newUser.email);
};

export const loginController = async (
  req: Request<{}, {}, LoginUser>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(422).send('Email does not exist');
  }
  //check if password is correct
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(422).send('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== 'development',
  });
  //authenticating user
  res.send({ token });
};

//=======================================================
// logoutController
//=======================================================

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //delete the cookie
  //send a response"Logged out"
  res.clearCookie('token');
  res.status(200).send('Logged out');
};

export const checkAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    res.status(200).send(decode);
  } catch (err) {
    res.status(401).send('Not authenticated');
  }
};

export const getSingleUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.findUnique({
    where: { id: res.locals.userId },
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

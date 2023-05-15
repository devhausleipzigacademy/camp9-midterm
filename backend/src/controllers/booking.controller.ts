import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { Booking } from '../validate/bookingValidation';

const prisma = new PrismaClient();

export const bookingController = async (
  req: Request<{}, {}, Booking>,
  res: Response,
  next: NextFunction
) => {
  let screening = await prisma.screening.findFirst({
    where: {
      date: req.body.date,
      time: req.body.time,
      movieId: req.body.movieId,
    },
  });
  if (!screening) {
    screening = await prisma.screening.create({
      data: {
        date: req.body.date,
        time: req.body.time,
        movieId: req.body.movieId,
      },
    });
  }

  const booking = await prisma.booking.create({
    data: {
      screening: {
        connect: {
          id: screening.id,
        },
      },
      seats: {
        create: req.body.seats.map(seat => ({
          row: seat.split('-')[0],
          number: parseInt(seat.split('-')[1]),
          price:
            seat.split('-')[0] === 'A'
              ? 12.95
              : seat.split('-')[0] === 'F'
              ? 16.95
              : 14.95,
        })),
      },
      user: {
        connect: {
          id: res.locals.userId,
        },
      },
      totalPrice: req.body.seats.reduce((acc, seat) => {
        if (seat.split('-')[0] === 'A') {
          return acc + 12.95;
        } else if (seat.split('-')[0] === 'F') {
          return acc + 16.95;
        } else {
          return acc + 14.95;
        }
      }, 0),
    },
  });
  res.status(201).send(booking);
};

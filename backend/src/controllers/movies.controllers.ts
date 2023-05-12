import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const getMovieDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const movieId = req.params.movieId;

  const movie = await prisma.movie.findUnique({
    where: { tmdbId: Number(movieId) },
    include: {
      genres: true,
      credits: true,
    },
  });
  res.send({
    ...movie,
    credits: {
      cast: movie?.credits[0].cast,
      crew: movie?.credits[0].crew,
    },
  });
};

export const getMovieBySearchQueryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const searchQuery = req.query.query;
  const movies = await prisma.movie.findMany({
    where: {
      title: {
        contains: String(searchQuery),
        mode: 'insensitive',
      },
    },
  });
  res.send(movies);
};

type Movie = {
  id: number;
  tmdbId: number;
  title: string;
  releaseDate: Date;
  backdropPath: string;
  runtime: number;
  voteAverage: number;
  overview: string;
};

export const getNowPlayingMoviesController = async (
  req: Request<{}, {}, Movie>,
  res: Response,
  next: NextFunction
) => {
  const movies = await prisma.movie.findMany({});
  res.send(movies);
};
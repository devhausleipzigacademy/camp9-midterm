import { z } from 'zod';

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

export type MovieDbResponse = {
  [x: string]: any;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
export type TicketProps = {
  movieTitle: string;
  movieTime: string;
  movieDate: string;
};

export type MovieDetailDbResponse = {
  map(arg0: (movie: any, index: any) => void): import('react').ReactNode;
  title: string;
  backdrop_path: string;
  release_date: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  runtime: number;
  vote_average: number;
  overview: string;
  id: number;
  imdb_id: string;
  credits: {
    id: number;
    cast: TMDBCast[];
    crew: TMDBCrew[];
  };
};

// types for the credits page
export type TMDBCast = {
  id: number;
  name: string;
  character: string;
  credit_id: string;
};

export type TMDBCrew = {
  id: number;
  name: string;
  job: string;
  credit_id: string;
};

export type MovieDbCreditsResponse = {
  id: number;
  cast: TMDBCast[];
  crew: TMDBCrew[];
};

export type PersonImagesRequest = {
  id: number;
  profiles: { file_path: string }[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type BookingResponse = { token: string };

export type Booking = {
  bookingId: string;
  user: string;
  userId: string;
  movieId: string;
  dateAndTime: string;
  seats: string[];
  price: string;
};

export interface GenreLibraryEntry {
  Genre: string;
  Emojie: string;
  id: number;
  GenreId: number;
  isSelected: boolean;
}

// write a zod schema for login and provide correct error messages if the user enters the wrong email or password
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

//  write a zod schema for signup and provide correct error messages
export const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
});

export type SignupUser = z.infer<typeof signUpSchema>;

export type LoginUser = z.infer<typeof loginSchema>;

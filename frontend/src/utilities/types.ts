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

export type SignupUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUser = {
  email: string;
  password: string;
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

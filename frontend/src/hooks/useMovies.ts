import axios from 'axios';
import {
  MovieDbResponse,
  MovieDetailDbResponse,
  PersonImagesRequest,
} from '../utilities/types';
import { useGenreContext } from '../contexts/GenreContext';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
// =====================================================================
// UTILITY FUNCTIONS
// =====================================================================
// parseQueryString returns a query string parsed from a given URL parameters object
function parseQueryString(URLParameters: object) {
  const queryString =
    '?' +
    Object.entries(URLParameters)
      .map(parameter => parameter.join('='))
      .join('&');
  return queryString;
}
// =====================================================================
// useGetMovies query function and hook (used in UpcomingMovies.tsx, Searchbar.tsx, Movies.tsx)
// =====================================================================
// getMovies is the query function for useGetMovies hook
// fetches 20 movies from the given page with selected gernes
async function getMovies(pageNumber: number, selectedGenreIDs: Array<number>) {
  // object containing all the URL query parameter keys and values
  const URLParameters = {
    api_key: import.meta.env.VITE_TMDB_KEY,
    page: pageNumber,
    language: 'en-US',
    with_genres: selectedGenreIDs.join(','),
  };
  // query string created from the URL parameters object
  const queryString = parseQueryString(URLParameters);
  // the axios GET request
  const response = await axios.get<MovieDbResponse>(
    `${import.meta.env.VITE_SERVER_URL}api/1.0/movies/allmovies${queryString}`
  );
  return response.data;
}
// useGetMovies hook gets 20 movies per fetch
//${import.meta.env.VITE_SERVER_URL}/api/1.0/movies/allmovies
// returns the query object including:
// data.pages - an array of all pages fetched, 20 movies per page (up to 500 pages)
// - note: if you only want to use the first 20 movies, use data.pages[0].results and ignore the fetchNextPage function
// fetchNextPage - function that fetches the next 20 movies, saves them in data.pages
// - note: do not pass any arguments to the fetchNextPage function!
// hasNextPage - boolean determining if the next page can be fetched
export function useGetMovies() {
  const { genreIDs } = useGenreContext();
  const infiniteQuery = useInfiniteQuery({
    queryKey: ['movies', genreIDs],
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam, genreIDs),
    getNextPageParam: lastPage =>
      lastPage.page >= lastPage.total_pages || lastPage.page >= 500
        ? undefined
        : lastPage.page + 1,
  });
  return infiniteQuery;
}
// =====================================================================
// useGetMoviesBySearchQuery query function and hook (used in the Searchbar component)
// =====================================================================
// getMoviesBySearchQuery is the query function for useGetMoviesBySearchQuery hook
async function getMoviesBySearchQuery(searchQuery: string) {
  // the axios GET request
  const response = await axios.get<MovieDbResponse>(
    `${
      import.meta.env.VITE_SERVER_URL
    }api/1.0/movies/search?query=${searchQuery}`
  );
  return response.data;
}
// useGetMoviesBySearchQuery hook fetches movies based on a search query
export function useGetMoviesBySearchQuery(searchQuery: string) {
  const userQuery = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => getMoviesBySearchQuery(searchQuery),
    enabled: searchQuery.length !== 0,
  });
  return userQuery;
}
// =====================================================================
// useGetMovieDetails query function and hook (used in MovieDetails.tsx, Ticket.tsx and Credits.tsx)
// =====================================================================
// getMovieDetails is the query function for useGetMovieDetails hook
// fetches details for a single movie based on a given movie ID
async function getMovieDetails(movieId: number) {
  // the axios GET request
  const response = await axios.get<MovieDetailDbResponse>(
    `${import.meta.env.VITE_SERVER_URL}api/1.0/movies/${movieId}`
  );
  return response.data;
}
// useGetMovieDetails hook fetches details for a single movie based on a given movie ID
export function useGetMovieDetails(movieId: number) {
  const query = useQuery({
    queryKey: ['movieDetail', movieId],
    queryFn: () => getMovieDetails(movieId),
  });
  return query;
}
// =====================================================================
// useGetPersonImages query function and hook (used in CreditsListItem.tsx)
// =====================================================================
// getPersonImages is the query function for useGetPersonImages hook
// fetches an array of images (data.profiles) for a single person (cast and crew member) based on a given person ID
async function getPersonImages(personId: number) {
  // object containing all the URL query parameter keys and values
  const URLParameters = {
    api_key: import.meta.env.VITE_TMDB_KEY,
  };
  // query string created from the URL parameters object
  const queryString = parseQueryString(URLParameters);
  // the axios GET request
  const response = await axios.get<PersonImagesRequest>(
    `https://api.themoviedb.org/3/person/${personId}/images${queryString}`
  );
  return response.data;
}
// useGetPersonImages hook fetches an array of images for a single person (cast and crew member) based on a given person ID
export function useGetPersonImages(personId: number) {
  const query = useQuery({
    queryKey: ['castAndCrewMember', personId],
    queryFn: () => getPersonImages(personId),
  });
  return { ...query, personImage: query.data };
}

// =====================================================================
// Functions for fetching movies from the database
// =====================================================================

// this function fetches movies with or without given genres from the database
async function getNowPlayingMovies(genreIds: string) {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}api/1.0/movies?genres=${genreIds}`
  );
  return response.data;
}

// this is the hook for fetching movies from the database
export function useGetNowPlayingMovies(genreIds: string) {
  const query = useQuery({
    queryKey: ['moviesNowPlaying', genreIds],
    queryFn: async () => await getNowPlayingMovies(genreIds),
  });
  return query;
}

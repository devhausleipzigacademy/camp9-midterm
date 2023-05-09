import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  MovieDbResponse,
  MovieDetailDbResponse,
  PersonImagesRequest,
} from '../utilities/types';
import { useGenreContext } from '../contexts/GenreContext';
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
    `https://api.themoviedb.org/3/discover/movie${queryString}`
  );
  return response.data;
}
// useGetMovies hook gets 20 movies per fetch
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
async function getMoviesBySearchQuery(query: string) {
  // object containing all the URL query parameter keys and values
  const URLParameters = {
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: 'en-US',
    query: query,
  };
  // query string created from the URL parameters object
  const queryString = parseQueryString(URLParameters);
  // the axios GET request
  const response = await axios.get<MovieDbResponse>(
    `https://api.themoviedb.org/3/search/movie${queryString}`
  );
  return response.data;
}
// useGetMoviesBySearchQuery hook fetches movies based on a search query
export function useGetMoviesBySearchQuery(query: string) {
  const userQuery = useQuery({
    queryKey: ['movies', query],
    queryFn: () => getMoviesBySearchQuery(query),
    enabled: query.length !== 0,
  });
  return userQuery;
}
// =====================================================================
// useGetMovieDetails query function and hook (used in MovieDetails.tsx, Ticket.tsx and Credits.tsx)
// =====================================================================
// getMovieDetails is the query function for useGetMovieDetails hook
// fetches details for a single movie based on a given movie ID
async function getMovieDetails(movieId: number) {
  // object containing all the URL query parameter keys and values
  const URLParameters = {
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: 'en-US',
    append_to_response: 'credits',
  };
  // query string created from the URL parameters object
  const queryString = parseQueryString(URLParameters);
  // the axios GET request
  const response = await axios.get<MovieDetailDbResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}${queryString}`
  );
  return response.data;
}
// useGetMovieDetails hook fetches details for a single movie based on a given movie ID
export function useGetMovieDetails(movieId: number) {
  const query = useQuery({
    queryKey: ['movies', movieId],
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

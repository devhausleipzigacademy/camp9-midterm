import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MovieDbResponse } from '../utilities/types';

async function getMoviesByQuery(query: string) {
  const response = await axios.get<MovieDbResponse>(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&query=${query}`
  );
  return response.data;
}

export function useGetMoviesByQuery(query: string) {
  const userQuery = useQuery({
    queryKey: [query],
    queryFn: () => getMoviesByQuery(query),
    enabled: query.length !== 0,
  });
  return userQuery;
}

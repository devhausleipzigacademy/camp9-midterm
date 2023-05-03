import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MovieDetailDbResponse } from '../utilities/types';

async function getMovieDetails(movieId: number) {
  const response = await axios.get<MovieDetailDbResponse>(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&append_to_response=credits`
  );
  return response.data;
}

export function useGetMovieDetails(movieId: number) {
  const query = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => getMovieDetails(movieId),
  });
  return query;
}

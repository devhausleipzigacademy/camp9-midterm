import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MovieDbResponse } from '../utilities/types';

async function getNowPlayingMovies() {
  const response = await axios.get<MovieDbResponse>(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&page=1&region=DE`
  );
  return response.data;
}

export function useGetNowPlayingMovies() {
  const query = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: getNowPlayingMovies,
  });
  return query;
}

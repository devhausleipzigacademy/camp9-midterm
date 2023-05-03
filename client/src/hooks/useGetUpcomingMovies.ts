import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MovieDbResponse } from '../utilities/types';

async function getUpcomingMovies(): Promise<MovieDbResponse> {
  const upcomingMoviesData = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  )
  return upcomingMoviesData.data
}

export default function useGetUpcomingMovies() {
  const query = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: getUpcomingMovies
  });

  return query;
}

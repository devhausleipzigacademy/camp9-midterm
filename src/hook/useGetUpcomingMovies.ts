import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export default function useGetUpcomingMovies<T>() {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      try {
        const { data } = await axios.get<T>(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}`);
        return data;
      } catch (err) {
        const error = err as AxiosError;
        return error.message;
      }
    },
  });
}

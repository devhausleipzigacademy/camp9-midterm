import axios from 'axios';
import { useQuery } from 'react-query';
import { MovieDetailDbResponse } from '../utilities/types';

async function getBookmarkedMovies(id: number) {
  const response = await axios.get<MovieDetailDbResponse>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US`
  );
  return response.data;
}

export function useGetBookmarkedMovies(id: number) {
  const query = useQuery({
    queryKey: ['bookmarkedMovies', id],
    queryFn: () => getBookmarkedMovies(id),
  });
  return query;
}

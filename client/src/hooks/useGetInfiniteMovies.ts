import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MovieDbResponse } from '../utilities/types';
import { EmojieLibraryEntry, useEmojieLibrary } from '../contexts/GenreContext';

function getSelectedGenres(filteredEmojieLibrary: EmojieLibraryEntry[]) {
  const selectedGenreIDs = filteredEmojieLibrary
    .filter(genreid => {
      if (genreid.isSelected === true) return genreid.GenreId;
    })
    .map(genreid => genreid.GenreId);
  if (selectedGenreIDs.length <= 0) {
    return '';
  } else {
    let selectedGenresParameter = '&with_genres=';
    selectedGenresParameter += selectedGenreIDs.join('|');
    return selectedGenresParameter;
  }
}

async function getInfiniteMovies(
  pageNumber: number,
  selectedGenresParameter: string
) {
  console.log(selectedGenresParameter);
  const response = await axios.get<MovieDbResponse>(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&page=${pageNumber}${selectedGenresParameter}`
  );
  return response.data;
}

export function useGetInfiniteMovies() {
  const { filteredEmojieLibrary } = useEmojieLibrary();
  const selectedGenresParameter = getSelectedGenres(filteredEmojieLibrary);
  const infiniteQuery = useInfiniteQuery({
    queryKey: ['infiniteMovies'],
    queryFn: ({ pageParam = 1 }) =>
      getInfiniteMovies(pageParam, selectedGenresParameter),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.page == 500 ? undefined : lastPage.page + 1,
  });
  return infiniteQuery;
}

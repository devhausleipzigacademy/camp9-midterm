import { useEmojieLibrary } from '../contexts/GenreContext';
import { MovieDbResponse } from '../utilities/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function getEmojieMovies(genreIDs: Number[]) {
  return axios
    .get<MovieDbResponse>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&with_genres=${genreIDs}`
    )
    .then(res => res.data);
}

function getNOTemojiesMovies() {
  return axios
    .get<MovieDbResponse>(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }`
    )
    .then(res => res.data);
}

export function useEmojieMovies() {
  const { filteredEmojieLibrary } = useEmojieLibrary();
  const genreIDs = filteredEmojieLibrary
    .filter(genreid => {
      if (genreid.isSelected === true) return genreid.GenreId;
    })
    .map(genreid => genreid.GenreId);

  if (genreIDs.length > 0) {
    const query = useQuery(['emojieMovies', genreIDs], () =>
      getEmojieMovies(genreIDs)
    );
    return {
      ...query,
      movies: query.data?.results,
    };
  }
  const query = useQuery(['notEmojieMovies'], getNOTemojiesMovies);
  return {
    ...query,
    movies: query.data?.results,
  };
}

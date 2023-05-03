import { MovieDetailDbResponse } from './types';

export function firstOneOrTwoGenres(data: MovieDetailDbResponse | null) {
  if (data) {
    if (data.genres.length === 1) {
      return data.genres[0].name;
    } else {
      return data.genres[0].name + '/' + data.genres[1].name;
    }
  }
}

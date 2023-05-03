import axios from 'axios';

export interface filteredMovies {
  Genre: string;
  Emoji: string;
  id: number;
  genreid: number;
  isSelected: boolean;
}

const BaseUrl = `/movie/upcoming?api_key=b83392e48747a4845ad80c2011eaa33b`;

export function getMovieList() {
  return axios
    .get(`https://api.themoviedb.org/3${BaseUrl}`)
    .then(res => res.data);
}

export function getGenresMovie(genreid: number[]) {
  return axios
    .get<filteredMovies>(
      `https://api.themoviedb.org/3${BaseUrl}&with_genres=${genreid}`
    )
    .then(res => res.data);
}
const test = getMovieList();
console.log(test);

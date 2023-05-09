import { Link } from 'react-router-dom';
import { useEmojieMovies } from '../hooks/useEmojieSorting';

interface PaginationMovies {
  state: number;
}

export default function PaginationMovies({ state }: PaginationMovies) {
  const { isError, isLoading, movies } = useEmojieMovies();

  if (isError) {
    return <h1>"Couldn't find the movies, sorry"</h1>;
  }
  if (isLoading) {
    return <h1>'wait a sec...'</h1>;
  }
  const allMovies = movies;
  let fourMovies = allMovies;
  switch (state) {
    case 1:
      fourMovies = allMovies?.slice(0, 4);  
      break;
    case 2:
      fourMovies = allMovies?.slice(4, 8);
      break;
    case 3:
      fourMovies = allMovies?.slice(8, 12);
      break;
    case 4:
      fourMovies = allMovies?.slice(12, 16);
      break;
    case 5:
      fourMovies = allMovies?.slice(16, 20);
      break;
  }

  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-5">
      {fourMovies?.map((movie, index) => {
        let image = movie.poster_path;
        return (
          <Link to={`/movies/${movie.id}`} key={index}>
            <div className="h-auto">
              <img
                src={`https://image.tmdb.org/t/p/original/${image}`}
              ></img>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

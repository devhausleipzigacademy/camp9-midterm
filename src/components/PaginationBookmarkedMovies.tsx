import { Link, useParams } from 'react-router-dom';
import { useGetBookmarkedMovies } from '../hooks/useGetBookmarkedMovies';
import { id } from 'date-fns/locale';

interface PaginationMovies {
  state: number;
}

export default function PaginationBookmarkedMovies({
  state,
}: PaginationMovies) {
  const { id } = useParams();

  const {
    data: movies,
    isLoading,
    isError,
  } = useGetBookmarkedMovies(parseInt(id!));

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError === true) {
    throw new Error('no data found');
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
              <img src={`https://image.tmdb.org/t/p/original/${image}`}></img>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

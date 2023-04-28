import { Link } from 'react-router-dom';
import { useGetMovieDetails } from '../hooks/useGetMovieDetails';

export default function PaginationBookmarkedMovies() {
  const id = 340;

  const { data, isLoading, isError } = useGetMovieDetails(id);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError === true) {
    throw new Error('no data found');
  }

  console.log(data);

  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-5">
      <Link to={`/movies/${movie}`} key={index}>
        <div className="h-auto">
          <img src={`https://image.tmdb.org/t/p/original/${image}`}></img>
        </div>
      </Link>
    </div>
  );
}

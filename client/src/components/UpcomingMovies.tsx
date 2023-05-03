import { Link } from 'react-router-dom';
import { Movie } from '../utilities/types';
import useGetUpcomingMovies from '../hooks/useGetUpcomingMovies';

function UpcomingMovies() {
  const { isLoading, isError, data } = useGetUpcomingMovies();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error!</span>;
  }

  if (typeof data == 'string') {
    return <span>Error!</span>;
  }

  const movies = data.results;

  return (
    <>
      <h2 className="typography-title">Upcoming Movies</h2>
      <section className="flex gap-5 overflow-y-hidden snap-mandatory snap-x -mx-5 py-3">
        {movies.map((movie: Movie) => (
          <div className="w-32 shrink-0 snap-center" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                className="rounded-md"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}

export default UpcomingMovies;

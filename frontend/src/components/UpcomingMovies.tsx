import { Link } from 'react-router-dom';
import { useGetMovies } from '../hooks/useMovies';

function UpcomingMovies() {
  const { isError, isLoading, data } = useGetMovies();
  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError) {
    return <span>Error!</span>;
  } else {
    return (
      <>
        <h2 className="typography-title dark:text-dark">Upcoming Movies</h2>
        <section className="flex gap-5 overflow-y-hidden snap-mandatory snap-x -mx-5 py-3">
          {data.pages[0].results.map(movie => (
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
}

export default UpcomingMovies;

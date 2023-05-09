import { Link } from 'react-router-dom';
import { useBookmarks } from '../contexts/BookmarkedMoviesContext';
import { Movie } from '../utilities/types';
export default function PaginationBookmarkedMovies() {
  const { bookmarkedMovies } = useBookmarks();

  if (bookmarkedMovies.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <h1 className="text-2xl text-white-dimmed">
          You have no bookmarked movies
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-5">
      {bookmarkedMovies?.map((movie: Movie, index: number) => {
        let image = movie.poster_path;
        return (
          <Link to={`/movies/${movie.id}`} key={index}>
            <div className="h-auto">
              <img
                alt="movie poster"
                src={`https://image.tmdb.org/t/p/original/${image}`}
              ></img>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useGetNowPlayingMovies } from '../hooks/useGetNowPlayingMovies';
import { useBookmarks } from '../contexts/BookmarkedMoviesContext';
import useGetUpcomingMovies from '../hooks/useGetUpcomingMovies';
import { Movie } from '../utilities/types';
export default function PaginationBookmarkedMovies() {
  const { bookmarkedMovieIds } = useBookmarks();

  const upcomingMovies = useGetUpcomingMovies();
  const nowPlayingMovies = useGetNowPlayingMovies();

  if (upcomingMovies.isLoading || nowPlayingMovies.isLoading) {
    return <p>loading...</p>;
  }
  if (upcomingMovies.isError || nowPlayingMovies.isError) {
    throw new Error('no data found');
  }

  const allMovies = upcomingMovies.data.results.filter(
    (movie: Movie) =>
      !nowPlayingMovies.data.results.some(
        (nowPlayingMovie: Movie) => nowPlayingMovie.id === movie.id
      )
  );

  const bookmarkedMovies = allMovies.filter((movie: Movie) =>
    bookmarkedMovieIds.includes(movie.id)
  );

  console.log(bookmarkedMovies);

  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-5">
      {bookmarkedMovies?.map((movie: Movie, index: number) => {
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

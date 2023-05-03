import { Link } from 'react-router-dom';
import { useEmojieMovies } from '../hooks/useEmojieSorting';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function ListMovies() {
  const { isError, isLoading, movies } = useEmojieMovies();

  if (isError) {
    return <h1>"Couldn't find the movies, sorry"</h1>;
  }
  if (isLoading) {
    return <h1>'wait a sec...'</h1>;
  }
  const twentyMovies = movies!;

  return (
    <div>
      <InfiniteScroll
        className="grid grid-rows-2 grid-cols-2 gap-5"
        dataLength={twentyMovies.length}
        next={() => {
          console.log('Hai new movies');
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {twentyMovies?.map((movie, index) => {
          let image = movie.poster_path;
          return (
            <Link to={`/movies/${movie.id}`} key={index}>
              <div className="h-auto">
                <img src={`https://image.tmdb.org/t/p/original/${image}`}></img>
              </div>
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

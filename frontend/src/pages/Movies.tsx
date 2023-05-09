import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetMovies } from '../hooks/useMovies';
import { Link } from 'react-router-dom';

function Movies() {
  const { isError, isLoading, data, fetchNextPage, hasNextPage } =
    useGetMovies();
  if (isError) {
    return (
      <h1 className="typography-primary text-white">
        Couldn't find the movies, sorry!
      </h1>
    );
  } else if (isLoading) {
    return <h1 className="typography-primary text-white">Loading...</h1>;
  } else
    return (
      <div className="px-5 py-8">
        <InfiniteScroll
          dataLength={data.pages.length}
          next={() => {
            fetchNextPage();
          }}
          hasMore={!!hasNextPage}
          loader={
            <h4 className="typography-primary text-white">wait a sec...</h4>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b className="typography-primary text-white">
                Yay! You have seen it all
              </b>
            </p>
          }
        >
          {data.pages.map((page, index) => {
            return (
              <div className="grid grid-rows-2 grid-cols-2 gap-5" key={index}>
                {page.results.map((movie, index) => {
                  let image = movie.poster_path;
                  if (movie.poster_path === null) {
                    return null;
                  } else {
                    return (
                      <Link to={`/movies/${movie.id}`} key={index}>
                        <div className="h-auto">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${image}`}
                          ></img>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    );
}

export default Movies;

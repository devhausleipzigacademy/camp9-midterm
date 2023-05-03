import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetInfiniteMovies } from '../hooks/useGetInfiniteMovies';

export default function ListMovies() {
  const { isError, isLoading, data, fetchNextPage, hasNextPage } =
    useGetInfiniteMovies();
  console.log(data);
  if (isError) {
    return <h1>"Couldn't find the movies, sorry"</h1>;
  } else if (isLoading) {
    return <h1>'wait a sec...'</h1>;
  } else
    return (
      <div>
        <InfiniteScroll
          dataLength={data.pages.length}
          next={() => {
            fetchNextPage();
          }}
          hasMore={!!hasNextPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.pages.map(page => {
            return (
              <div className="grid grid-rows-2 grid-cols-2 gap-5">
                {page.results.map((movie, index) => {
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
          })}
        </InfiniteScroll>
      </div>
    );
}

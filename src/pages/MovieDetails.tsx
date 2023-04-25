import Button from '../components/Button';
import { Link, useParams } from 'react-router-dom';
import useQuery from '../hook/useQuery';
import { MovieDetailDbResponse } from '../utilities/types';
import MovieDetailHeader from '../components/MovieDetailHeader';
import { minutesToHoursAndMinutes } from '../utilities/minutesToHoursAndMinutes';
import { firstOneOrTwoGenres } from '../utilities/firstOneOrTwoGenres';
import { returnNameOfCrewMember } from '../utilities/returnNameOfCrewMember';

function MovieDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery<MovieDetailDbResponse>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }&language=en-US&append_to_response=credits`
  );

  if (isLoading || !data) {
    return <p>loading...</p>;
  }

  return (
    <article className="py-7 h-screen">
      <MovieDetailHeader children="Movie Detail" goBackTo="/" svg={true} />
      <div className="px-5 pb-7 h-full flex flex-col">
        <img
          className="rounded-md mt-5"
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
          alt={data.title}
        />
        <h2 className="typography-title mt-5">{data.title}</h2>
        <div className="mt-3 flex justify-between">
          <div className="flex gap-3">
            <p className="typography-description text-white">
              {data.release_date.split('-')[0]}
            </p>
            <p className="typography-description">
              {firstOneOrTwoGenres(data)}
            </p>
            <p className="typography-description">
              {minutesToHoursAndMinutes(data)}
            </p>
          </div>
          <div className="flex gap-1">
            <span className="typography-description text-green">
              {data && Math.round(data?.vote_average * 10) + '%'}
            </span>
            <span className="typography-description">Score</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 w-full gap-10">
          <div className="grid grid-cols-2 h-full content-around">
            <div className="typography-secondary font-bold">Director:</div>
            <div className="typography-secondary font-bold whitespace-nowrap text-white">
              {returnNameOfCrewMember('Director', data)}
            </div>
            <div className="typography-description">Writer:</div>
            <div className="typography-description whitespace-nowrap text-white">
              {returnNameOfCrewMember('Screenplay', data)}
            </div>
          </div>
          <Link className="flex-1" to={`/cast/${id}`}>
            <Button variant="secondary" className="">
              Cast & Crew
            </Button>
          </Link>
        </div>
        <hr className="mt-3"></hr>
        <h2 className="typography-title mt-3">Synopsis</h2>
        <p className="typography-body mt-3">{data?.overview}</p>
        <a
          className="typography-body text-orange-500 underline mt-2"
          href={`https://www.imdb.com/title/${data?.imdb_id}`}
        >
          Read more
        </a>
        <div className="flex-auto"></div>
        <Link to="/dates">
          <Button>Get Reservation</Button>
        </Link>
      </div>
    </article>
  );
}

export default MovieDetails;

import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/CreditsPageHeader';
import {
  MovieDbCreditsResponse,
  TMDBCast,
  TMDBCrew,
  CreditsImage,
} from '../utilities/types';
import useQuery from '../hook/useQuery';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CastCrewButton from '../components/CastCrewButton';
import CastCrewListItem from '../components/CastCrewListItem';
import MovieDetailHeader from '../components/MovieDetailHeader';

//
// Image fetching function
//
function getImages(
  cast: TMDBCast[] | TMDBCrew[] | undefined,
  marker: boolean,
  imagesSetter: React.Dispatch<React.SetStateAction<CreditsImage[]>>,
  markerSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (cast && !marker) {
    for (const castMember of cast) {
      let newCastImage = {
        id: castMember.id,
        imgUrl: 'LOADING',
      };
      axios
        .get(
          `https://api.themoviedb.org/3/person/${
            castMember.id
          }/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
        )
        .then(result => {
          try {
            newCastImage.imgUrl = `https://image.tmdb.org/t/p/original${result.data.profiles[0].file_path}`;
          } catch {
            newCastImage.imgUrl = 'NO IMAGE FOUND';
          }
          imagesSetter(oldImages => [...oldImages, newCastImage]);
        })
        .catch(err => {
          console.log(err);
          newCastImage.imgUrl = 'NO IMAGE FOUND';
          imagesSetter(oldImages => [...oldImages, newCastImage]);
        });
    }
    markerSetter(true);
  }
}
//
// Component
//
function Credits({ movieId }: { movieId?: number }) {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery<MovieDbCreditsResponse>(
    `https://api.themoviedb.org/3/movie/${
      movieId ? movieId : id
    }/credits?api_key=b83392e48747a4845ad80c2011eaa33b&language=en-US`
  );
  const [castImages, setCastImages] = useState<CreditsImage[]>([]);
  const [fetchedCastImages, setFetchedCastImages] = useState(false);
  const [crewImages, setCrewImages] = useState<CreditsImage[]>([]);
  const [fetchedCrewImages, setFetchedCrewImages] = useState(false);
  const [crewOrCast, setCrewOrCast] = useState<'cast' | 'crew'>('cast');
  //
  // when credits data is fetched
  // fetch an image url for each cast and crew member and save it to the state
  useEffect(() => {
    if (data) {
      // fetch all the cast images
      getImages(
        data.cast,
        fetchedCastImages,
        setCastImages,
        setFetchedCastImages
      );
      // fetch all the crew images
      getImages(
        data.crew,
        fetchedCrewImages,
        setCrewImages,
        setFetchedCrewImages
      );
    }
    return () => {};
  }, [data]);
  //
  // JSX returns
  //
  //if the credits data is still loading
  if (isLoading)
    return (
      <section className="py-9 px-6 mb-2">
        <PageHeader>Cast & Crew</PageHeader>
        <h4 className="typography-title text-white">LOADING.....</h4>
      </section>
    );
  //
  //if there is an error with fetching credits data
  else if (isError)
    return (
      <section className="py-9 px-6 mb-2">
        <PageHeader>Cast & Crew</PageHeader>
        <div className="my-4">
          <h4 className="typography-body">
            {`Error with fetching credits info for movie id ${
              movieId ? movieId : id
            }.`}
          </h4>
          <h4 className="typography-description">{isError}</h4>
        </div>
      </section>
    );
  //
  //if fetching credits data is successfull
  else
    return (
      <section className="py-9 px-6 mb-2">
        <MovieDetailHeader goBackTo={`/movies/:${id}`}>
          Cast & Crew
        </MovieDetailHeader>
        <div className="text-white flex justify-between my-6 select-none">
          <CastCrewButton
            status={crewOrCast === 'cast' ? 'active' : 'passive'}
            onClick={() => setCrewOrCast('cast')}
          >
            Cast
          </CastCrewButton>
          <CastCrewButton
            status={crewOrCast === 'crew' ? 'active' : 'passive'}
            onClick={() => setCrewOrCast('crew')}
          >
            Crew
          </CastCrewButton>
        </div>
        <ul className="flex flex-col text-white gap-4">
          {crewOrCast === 'cast'
            ? data?.cast.map(castmember => (
                <CastCrewListItem
                  key={`castid:${castmember.id}`}
                  actorName={castmember.name}
                  character={castmember.character}
                  imageUrl={
                    castImages.find(el => el.id == castmember.id)?.imgUrl
                  }
                />
              ))
            : data?.crew.map(castmember => (
                <CastCrewListItem
                  key={`crewid:${castmember.id}${castmember.job}`}
                  actorName={castmember.name}
                  character={castmember.job}
                  imageUrl={
                    castImages.find(el => el.id == castmember.id)?.imgUrl
                  }
                />
              ))}
        </ul>
        {/* the little dark stripe at the bottom */}
        <footer className="w-screen h-10 bg-dark fixed -bottom-2 left-0"></footer>
      </section>
    );
}

export default Credits;

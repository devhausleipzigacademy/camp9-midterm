import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreditsButton from '../components/credits/CreditsButton';
import CreditsListItem from '../components/credits/CreditsListItem';
import HeaderPage from '../components/HeaderPage';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import { useGetMovieDetails } from '../hooks/useMovies';

//
// Component
//
function Credits({ movieId }: { movieId?: number }) {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useGetMovieDetails(
    movieId ? movieId : parseInt(id!)
  );

  const [crewOrCast, setCrewOrCast] = useState<'cast' | 'crew'>('cast');

  //
  // JSX returns
  //
  return (
    <>
      {/* the header and the cast/crew buttons */}
      <HeaderPage>Cast & Crew</HeaderPage>
      <div className="text-white flex justify-between px-5 pt-2 pb-7 bg-dark select-none sticky top-[76px] h-[25px] box-content">
        <CreditsButton
          status={crewOrCast === 'cast' ? 'active' : 'passive'}
          onClick={() => setCrewOrCast('cast')}
        >
          Cast
        </CreditsButton>
        <CreditsButton
          status={crewOrCast === 'crew' ? 'active' : 'passive'}
          onClick={() => setCrewOrCast('crew')}
        >
          Crew
        </CreditsButton>
      </div>
      {/* the section with content */}
      <section className="pt-0 pb-9 px-6 mb-2">
        {isLoading ? (
          // if the credits data is still loading
          <div className="flex gap-2 my-3">
            <UseAnimations animation={loading} strokeColor="#FFF" />
            <h4 className="typography-title text-white">LOADING.....</h4>
          </div>
        ) : isError ? (
          //if there is an error with fetching credits data
          <div className="my-4">
            <h4 className="typography-body">
              {`Error with fetching credits info for movie id ${
                movieId ? movieId : id
              }.`}
            </h4>
            <h4 className="typography-description">{String(error)}</h4>
          </div>
        ) : data ? (
          //if fetching credits data is successfull

          <ul className="flex flex-col text-white gap-4">
            {crewOrCast === 'cast'
              ? data.credits.cast.map(castmember => (
                  <CreditsListItem
                    key={`${castmember.id}-${data.credits.cast.indexOf(
                      castmember
                    )}`}
                    id={castmember.id}
                    actorName={castmember.name}
                    character={castmember.character}
                  />
                ))
              : data.credits.crew.map(castmember => (
                  <CreditsListItem
                    key={`${castmember.id}-${data.credits.crew.indexOf(
                      castmember
                    )}`}
                    id={castmember.id}
                    actorName={castmember.name}
                    character={castmember.job}
                  />
                ))}
          </ul>
        ) : (
          <></>
        )}
        {/* the little dark stripe at the bottom */}
        <footer className="w-screen h-10 bg-dark fixed -bottom-2 left-0"></footer>
      </section>
    </>
  );
}

export default Credits;

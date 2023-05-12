import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CreditsButton from '../components/credits/CreditsButton';
import CreditsListItem from '../components/credits/CreditsListItem';
import HeaderPage from '../components/HeaderPage';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import { useGetMovieDetails } from '../hooks/useMovies';
import InfiniteScroll from 'react-infinite-scroll-component';

//
// Component
//
function Credits() {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useGetMovieDetails(parseInt(id!));
  // starting number and amount to increment the number of displayed cast/crew members
  const visibleCastIncrement = 10;
  // number of cast/crew members to display, starts at the increment and increases by increment by scrolling to the bottom, resets back to the increment on clicking the cast/crew button
  const [visibleCast, setVisibleCast] = useState(visibleCastIncrement);
  // flag to check if the cast or crew list should be rendered
  const [crewOrCast, setCrewOrCast] = useState<'cast' | 'crew'>('cast');
  // header component with the cast/crew buttons
  const pageHeader = (
    <>
      <HeaderPage>Cast & Crew</HeaderPage>
      <div className="text-white flex justify-between px-5 pt-2 pb-7 bg-dark select-none sticky top-[76px] h-[25px] z-10 box-content">
        <CreditsButton
          status={crewOrCast === 'cast' ? 'active' : 'passive'}
          onClick={() => {
            window.scrollTo(0, 0); // instantly scrolls to the top
            setCrewOrCast('cast'); // makes the list items of the cast members render
            setVisibleCast(visibleCastIncrement); // resets the amount of visible cast members to the inital value
          }}
        >
          Cast
        </CreditsButton>
        <CreditsButton
          status={crewOrCast === 'crew' ? 'active' : 'passive'}
          onClick={() => {
            window.scrollTo(0, 0); // instantly scrolls to the top
            setCrewOrCast('crew'); // makes the list items of the cast members render
            setVisibleCast(visibleCastIncrement); // resets the amount of visible cast members to the inital value
          }}
        >
          Crew
        </CreditsButton>
      </div>
    </>
  );
  //footer component, the little dark stripe at the bottom
  const pageFooter = (
    <footer className="w-screen h-10 bg-dark fixed -bottom-2 left-0"></footer>
  );
  //
  // JSX returns
  //
  if (isLoading)
    return (
      <>
        {pageHeader}
        <section className="pt-0 pb-9 px-6 mb-2">
          <div className="flex gap-2 my-3">
            <UseAnimations animation={loading} strokeColor="#FFF" />
            <h4 className="typography-title text-white">LOADING.....</h4>
          </div>
          {pageFooter}
        </section>
      </>
    );
  else if (isError)
    return (
      <>
        {pageHeader}
        <section className="pt-0 pb-9 px-6 mb-2">
          <div className="my-4">
            <h4 className="typography-body">
              {`Error with fetching credits info for movie id ${id}.`}
            </h4>
            <h4 className="typography-description">{String(error)}</h4>
          </div>
          {pageFooter}
        </section>
      </>
    );
  else
    return (
      <>
        {pageHeader}
        <InfiniteScroll
          next={() =>
            setVisibleCast(oldvalue => oldvalue + visibleCastIncrement)
          }
          hasMore={data.credits[crewOrCast].length > visibleCast}
          loader={<h5>Loading...</h5>}
          dataLength={visibleCast}
        >
          <section className="pt-0 pb-9 px-6 mb-2">
            <ul className="flex flex-col text-white gap-4">
              {data.credits[crewOrCast].map((castMember, indexOfCastMember) => {
                if (indexOfCastMember < visibleCast)
                  return (
                    <CreditsListItem
                      key={castMember.credit_id}
                      id={castMember.id}
                      actorName={castMember.name}
                      character={
                        'character' in castMember
                          ? castMember.character
                          : castMember.job
                      }
                    />
                  );
              })}
            </ul>
            {pageFooter}
          </section>
        </InfiniteScroll>
      </>
    );
}

export default Credits;

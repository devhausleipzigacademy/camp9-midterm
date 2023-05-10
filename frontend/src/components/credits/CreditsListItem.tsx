import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useGetPersonImages } from '../../hooks/useMovies';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

type Props = {
  actorName: string;
  character: string;
  id: number;
};

function CreditsListItem({ actorName, character, id }: Props) {
  const { data, isLoading, isError } = useGetPersonImages(id);
  // component with the name and role of the person, goes to the right of the image
  const personInfoComponent = (
    <div className="flex flex-col gap-1 justify-center">
      <h2 className="typography-primary text-white">{actorName}</h2>
      <h3 className="typography-description text-white-dimmed">{character}</h3>
    </div>
  );
  // JSX returns
  if (isLoading)
    return (
      <div className="flex gap-5">
        <UseAnimations
          animation={loading}
          strokeColor="rgba(255, 255, 255, 0.4)"
          size={64}
        />
        {personInfoComponent}
      </div>
    );
  else if (isError)
    return (
      <div className="flex gap-5">
        <UserCircleIcon className="w-16 h-16 text-white-dimmed"></UserCircleIcon>
        {personInfoComponent}
      </div>
    );
  else if (data?.profiles[0]?.file_path)
    return (
      <div className="flex gap-5">
        <img
          src={`https://image.tmdb.org/t/p/original${data.profiles[0].file_path}`}
          alt={actorName}
          className="bg-gray-300 w-16 h-16 object-cover border-none"
        />
        {personInfoComponent}
      </div>
    );
  else
    return (
      <div className="flex gap-5">
        <UserCircleIcon className="w-16 h-16 text-white-dimmed"></UserCircleIcon>

        {personInfoComponent}
      </div>
    );
}

export default CreditsListItem;

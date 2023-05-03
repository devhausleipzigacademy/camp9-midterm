import { ArrowPathIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useGetPersonImages } from '../../hooks/useGetPersonImages';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

type Props = {
  actorName: string;
  character: string;
  id: number;
};

function CreditsListItem({ actorName, character, id }: Props) {
  const { data, isLoading } = useGetPersonImages(id);
  return (
    <div className="flex gap-5">
      {isLoading ? (
        <UseAnimations
          animation={loading}
          strokeColor="rgba(255, 255, 255, 0.4)"
          size={64}
        />
      ) : data?.profiles[0]?.file_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original${data.profiles[0].file_path}`}
          alt={actorName}
          className="bg-gray-300 w-16 h-16 object-cover border-none"
        />
      ) : (
        <UserCircleIcon className="w-16 h-16 text-white-dimmed"></UserCircleIcon>
      )}
      <div className="flex flex-col gap-1 justify-center">
        <h2 className="typography-primary text-white">{actorName}</h2>
        <h3 className="typography-description text-white-dimmed">
          {character}
        </h3>
      </div>
    </div>
  );
}

export default CreditsListItem;

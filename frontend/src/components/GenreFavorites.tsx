import GenreBtn from './GenreBtn';
import { Link } from 'react-router-dom';
import { useGenreContext } from '../contexts/GenreContext';

function GenreFavorites() {
  const { filteredGenreLibrary } = useGenreContext();
  return (
    <div className="bg-[#1C1C27] dark:bg-white">
      <div className="flex justify-between px-5">
        <h2 className="text-white/40 text-[19px] dark:text-dark">Genre</h2>
        <Link
          to={'/genres'}
          className="text-[#FFB43A] dark:text-dark stroke-[#FFB43A] flex"
        >
          See All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
      <div className="w-full px-5 py-4 flex gap-7 justify-center text-center items-baseline bg-[#1C1C27] dark:bg-white">
        {filteredGenreLibrary.slice(0, 4).map(emojie => (
          <GenreBtn
            emojie={emojie.Emojie}
            genre={emojie.Genre}
            id={emojie.id}
            key={emojie.id}
            isSelected={emojie.isSelected}
          />
        ))}
      </div>
    </div>
  );
}
export default GenreFavorites;

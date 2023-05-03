import { useState } from 'react';
import Genreonclick from './Genreonclick';
import { Link } from 'react-router-dom';
import { useEmojieLibrary } from '../../contexts/GenreContext';

function GenreFavorites() {
  const { filteredEmojieLibrary } = useEmojieLibrary();
  return (
    <div className="bg-[#1C1C27]">
      <div className="flex justify-between px-5">
        <h2 className="text-white/40 text-[19px] ">Genre</h2>
        <Link to={'/genres'} className="text-[#FFB43A] stroke-[#FFB43A] flex">
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
      <div className="w-full px-5 py-4 flex gap-7 justify-center text-center items-baseline bg-[#1C1C27]">
        {filteredEmojieLibrary.slice(0, 4).map(emojie => (
          <Genreonclick
            emojie={emojie.Emoji}
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

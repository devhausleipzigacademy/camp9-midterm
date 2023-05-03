import clsx from 'clsx';
import React, { useState } from 'react';
import { useEmojieLibrary } from '../../contexts/GenreContext';

export interface Props {
  emojie: string;
  genre: string;
  id: number;
  isSelected: boolean;
}

function Genreonclick(props: Props) {
  const { toggleEmojie, countingEmojies } = useEmojieLibrary();

  return (
    <div
      key={props.id}
      onClick={() => {
        toggleEmojie(props.id);
        countingEmojies(props.isSelected);
      }}
      className="flex flex-col justify-center items-center gap-2 cursor-pointer"
    >
      <div
        className={clsx(
          'w-[56px] h-[56px] text-[30px] flex justify-center items-center rounded-lg text-center',
          props.isSelected ? 'bg-white/40' : 'bg-[#363740]'
        )}
      >
        {props.emojie}
      </div>
      <p className="text-white/40">{props.genre}</p>
    </div>
  );
}

export default Genreonclick;

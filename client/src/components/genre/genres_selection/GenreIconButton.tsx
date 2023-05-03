import clsx from 'clsx';
import React, { useState } from 'react';
import { useEmojieLibrary } from '../../../contexts/GenreContext';

export interface Emoji {
  emoji: string;
  genre: string;
  id: number;
  isSelected: boolean;
}

function GenreIconButton(props: Emoji) {
  const { toggleEmojie, countingEmojies /*filteredLibrary*/ } =
    useEmojieLibrary();

  return (
    <div
      className="flex flex-col items-center gap-1"
      key={props.id}
      onClick={() => {
        toggleEmojie(props.id);
        countingEmojies(props.isSelected);
        /*filteredLibrary(props.isSelected);*/
      }}
    >
      <div
        className={clsx(
          'rounded-xl w-14 h-14 text-3xl flex flex-col justify-center items-center cursor-pointer',
          props.isSelected ? 'bg-white/40' : 'bg-[#363740]'
        )}
      >
        <span>{props.emoji}</span>
      </div>
      <h3 className="text-xs font-bold text-white/40 font-inter">
        {props.genre}
      </h3>
    </div>
  );
}

export default GenreIconButton;

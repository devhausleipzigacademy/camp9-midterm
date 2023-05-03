import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmojieLibrary } from '../../../contexts/GenreContext';
import Button from '../../Button';
import HeaderPage from '../../HeaderPage';
import GenresSelectorLayout from './GenresSelectorLayout';

function GenresSelectionPage() {
  const { counter } = useEmojieLibrary();
  return (
    <div className="flex flex-col px-5 pt-6 pb-6 gap-10 bg-[#1C1C27] w-full h-full">
      <GenresSelectorLayout></GenresSelectorLayout>
      <div className="flex flex-row gap-1">
        <p className="text-white">{counter}</p>
        <p className="text-white/40">Genres selected</p>
      </div>
      <Link to={'/'} className="w-full rounded-lg bg-yellow text-center py-4">
        Confirm selected Genres
      </Link>
    </div>
  );
}

export default GenresSelectionPage;

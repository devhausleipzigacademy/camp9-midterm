import ListMovies from '../components/ListMovies';
import { useState } from 'react';
import React from 'react';

function Movies() {
  const [state, setState] = useState(1);

  return (
    <>
      <div className="px-5 py-8">
        <ListMovies />
      </div>
    </>
  );
}

export default Movies;

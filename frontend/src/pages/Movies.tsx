import PaginationButtons from '../components/PaginationButtons';
import PaginationMovies from '../components/PaginationMovies';
import { useState } from 'react';

function Movies() {
  const [state, setState] = useState(1);

  return (
    <>
      <div className="px-5 py-8">
        <PaginationMovies state={state} />
        <PaginationButtons state={state} setState={setState} />
      </div>
    </>
  );
}

export default Movies;

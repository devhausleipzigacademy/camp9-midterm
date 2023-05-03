import PaginationBookmarkedMovies from '../components/PaginationBookmarkedMovies';
import { useContext, useState } from 'react';
import PaginationButtons from '../components/PaginationButtons';

export default function BookmarkedMovies() {
  const [state, setState] = useState(1);

  return (
    <>
      <div className="px-5 py-8">
        <PaginationBookmarkedMovies />
        <PaginationButtons state={state} setState={setState} />
      </div>
    </>
  );
}

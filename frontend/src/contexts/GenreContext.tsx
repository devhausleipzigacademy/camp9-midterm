import { createContext, useContext, useState } from 'react';
import { emojieLibrary as genreLibrary } from './EmojieLibrary';
import { GenreLibraryEntry } from '../utilities/types';

interface GenreContext {
  genreLibrary: GenreLibraryEntry[];
  toggleGenre: (id: number) => void;
  filteredGenreLibrary: GenreLibraryEntry[];
  genreIDs: number[];
  genreCounter: number;
}

export const GenreContext = createContext<GenreContext>({
  genreLibrary: genreLibrary,
  toggleGenre: (id: number) => {},
  filteredGenreLibrary: genreLibrary,
  genreIDs: [],
  genreCounter: 0,
});

//this is the hook that is used in the components to access the context!
//example: const { genreIDs } = useGenreContext();;
//the values for the hooke are defined in line 22-29
export const useGenreContext = () => useContext(GenreContext);

function GenreProvider({ children }: { children: any }) {
  const [filteredGenres, setFilteredGenres] = useState(genreLibrary);
  const [genreIDs, setGenreIDs] = useState<number[]>([]);

  function toggleGenre(id: number) {
    //this function toggles the isSelected boolean in the genreLibrary to true or false
    const newGenreLibrary = genreLibrary.map(genre => {
      if (genre.id === id) {
        genre.isSelected = !genre.isSelected;
      }
      return genre;
    });
    setFilteredGenres(newGenreLibrary);

    // this function filters the genreLibrary to only show the selected genres.
    const filteredGenreLibrary = genreLibrary.filter(genre => {
      if (genre.isSelected === true) {
        return genre;
      }
    });

    //this sets the state for the genreIDs to only show the selected genres IDs.
    //this is used to filter the movies by genre.
    const newGenreIDs = filteredGenreLibrary.map(genreID => genreID.GenreId);
    setGenreIDs(newGenreIDs);

    //this sets the state for the filtered genreLibrary (home screen) to only show the selected genres.
    //if the selected genres are less than 4, it will show the not selected genres as well.
    if (filteredGenreLibrary.length <= 4) {
      const notSelectedGenres = newGenreLibrary.filter(genre => {
        return genre.isSelected === false;
      });
      return setFilteredGenres([
        ...filteredGenreLibrary,
        ...notSelectedGenres.slice(0, 4 - filteredGenreLibrary.length),
      ]);
    }
    setFilteredGenres(filteredGenreLibrary);
  }

  return (
    <GenreContext.Provider
      value={{
        genreLibrary: genreLibrary,
        toggleGenre: toggleGenre,
        filteredGenreLibrary: filteredGenres,
        genreIDs: genreIDs,
        genreCounter: genreIDs.length,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
}

export default GenreProvider;

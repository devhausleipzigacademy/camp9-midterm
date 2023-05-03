import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { emojieLibrary } from './EmojieLibrary';
import { Emojie } from '../stories/GenreEmojies.stories';

export interface EmojieLibraryEntry {
  Genre: string;
  Emoji: string;
  id: number;
  GenreId: number;
  isSelected: boolean;
}

interface EmojieLibraryContext {
  emojieLibrary: EmojieLibraryEntry[];
  toggleEmojie: (id: number) => void;
  filteredEmojieLibrary: EmojieLibraryEntry[];
  /*filteredLibrary: (isSelected: boolean) => void;*/
  counter: number;
  countingEmojies: (isSelected: boolean) => void;
}

export const EmojieContext = createContext<EmojieLibraryContext>({
  emojieLibrary: emojieLibrary,
  toggleEmojie: (id: number) => {},
  filteredEmojieLibrary: emojieLibrary,
  /*filteredLibrary: (isSelected: boolean) => {},*/
  counter: 0,
  countingEmojies: (isSelected: boolean) => {},
});

export const useEmojieLibrary = () => useContext(EmojieContext);

function EmojieProvider({ children }: { children: any }) {
  const [emojiesState, setEmojieState] = useState(emojieLibrary);
  const [filteredEmojies, setFilteredEmojie] = useState(emojiesState);
  const [counter, setCounter] = useState(0);

  function toggleEmojie(id: number) {
    ///SelectFunction to display when emojie is selected
    const newEmojieLibrary = emojieLibrary.map(emojie => {
      if (emojie.id === id) {
        emojie.isSelected = !emojie.isSelected;
      }
      return emojie;
    });
    const filteredEmojieLibrary = emojiesState.filter(emojie => {
      if (emojie.isSelected === true) {
        return emojie;
      }
    });
    setEmojieState(newEmojieLibrary);
    if (filteredEmojieLibrary.length <= 4) {
      const notSelectedEmojies = newEmojieLibrary.filter(emojie => {
        return emojie.isSelected === false;
      });
      return setFilteredEmojie([
        ...filteredEmojieLibrary,
        ...notSelectedEmojies.slice(0, 4 - filteredEmojieLibrary.length),
      ]);
    }
    setFilteredEmojie(filteredEmojieLibrary);
  }

  ///FilterFunction --- to show selected emojies in Favorites List
  // function filteredLibrary() {
  //   const filteredEmojieLibrary = emojiesState.filter(emojie => {
  //     if (emojie.isSelected === true) {
  //       return emojie;
  //     }
  //   });
  //   if (filteredEmojieLibrary.length <= 4) {
  //     console.log('filteredEmojieLibrary');
  //   }
  //   console.log(filteredEmojieLibrary.length + 1);
  //   setFilteredEmojie(filteredEmojieLibrary);
  // }

  function countingEmojies(isSelected: boolean) {
    if (isSelected) {
      setCounter(counter - 1);
    } else {
      setCounter(counter + 1);
    }
  }

  return (
    <EmojieContext.Provider
      value={{
        emojieLibrary: emojiesState,
        toggleEmojie,
        filteredEmojieLibrary: filteredEmojies,
        /*filteredLibrary,*/
        counter,
        countingEmojies,
      }}
    >
      {children}
    </EmojieContext.Provider>
  );
}

export default EmojieProvider;

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface BookmarkedMoviesContextValues {
  bookmarkedMovieIds: number[];
  toggleBookmark: (id: number) => void;
}

const BookmarkedMoviesContext = createContext<BookmarkedMoviesContextValues>({
  bookmarkedMovieIds: [],
  toggleBookmark: () => {},
});

const BookmarkedMoviesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bookmarkedMovieIds, setBookmarkedMovies] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    setBookmarkedMovies(prev => {
      if (id) {
        if (prev.includes(id)) {
          return prev.filter(movieId => movieId !== id);
        } else {
          return [...prev, id];
        }
      } else {
        return prev;
      }
    });
  };

  const contextValue: BookmarkedMoviesContextValues = {
    bookmarkedMovieIds,
    toggleBookmark,
  };

  return (
    <BookmarkedMoviesContext.Provider value={contextValue}>
      {children}
    </BookmarkedMoviesContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkedMoviesContext);

export default BookmarkedMoviesProvider;

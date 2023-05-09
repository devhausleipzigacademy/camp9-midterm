import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { Movie } from '../utilities/types';

type BookmarkedMoviesContextValues = {
  bookmarkedMovies: Movie[];
  toggleBookmark: (movie: Movie) => void;
};

const BookmarkedMoviesContext = createContext<BookmarkedMoviesContextValues>({
  bookmarkedMovies: [],
  toggleBookmark: () => {},
});

const BookmarkedMoviesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>(() => {
    // Get bookmarked movies from Local Storage
    try {
      const savedBookmarkedMovies = localStorage.getItem('bookmarkedMovies');
      return savedBookmarkedMovies ? JSON.parse(savedBookmarkedMovies) : [];
    } catch (error) {
      console.error(
        'Error retrieving bookmarked movies from Local Storage ',
        error
      );
      return [];
    }
  });

  // Save bookmarked movies to Local Storage
  useEffect(() => {
    localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies));
  }, [bookmarkedMovies]);

  const toggleBookmark = (movie: Movie) => {
    if (
      bookmarkedMovies.some(bookmarkedMovie => bookmarkedMovie.id === movie.id)
    ) {
      setBookmarkedMovies(
        bookmarkedMovies.filter(
          bookmarkedMovie => bookmarkedMovie.id !== movie.id
        )
      );
    } else {
      setBookmarkedMovies([...bookmarkedMovies, movie]);
    }
  };

  const contextValue: BookmarkedMoviesContextValues = {
    bookmarkedMovies,
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

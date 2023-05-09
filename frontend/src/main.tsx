import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import NavigationLayout from './components/NavigationLayout';
import MovieDetails from './pages/MovieDetails';
import Ticket from './pages/Ticket';
import BookDateAndTime from './pages/BookDateAndTime';
import Home from './pages/Home';
import Genres from './pages/Genres';
import Credits from './pages/Credits';
import LogInPage from './pages/LogInPage';
import Movies from './pages/Movies';
import EmojieProvider from './contexts/GenreContext';
import Account from './pages/Account';

import ChangePassword from './pages/ChangePassword';
import FavoriteGenres from './pages/FavoriteGenres';
import EditProfile from './pages/EditProfile';
import BookmarkedMovies from './pages/BookmarkedMovies';
import BookmarkedMoviesProvider from './contexts/BookmarkedMoviesContext';
import SelectSeats from './pages/SelectSeats';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <NavigationLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/movies',
        element: <Movies />,
      },
      { path: '/bookmarks', element: <BookmarkedMovies /> },
    ],
  },
  {
    path: '/login',
    element: <LogInPage />, // insert your page here
  },
  {
    path: '/genres',
    element: <Genres />, // insert your page here
  },
  {
    path: '/movies/:id',
    element: <MovieDetails />,
  },
  {
    path: '/credits/:id',
    element: <Credits />,
  },
  {
    path: '/dates/:id',
    element: <BookDateAndTime />, // insert your page here
  },
  {
    path: '/seats/:id',
    element: <SelectSeats/>, // insert your page here
  },
  {
    path: '/success',
    element: <h1>BOOKING SUCCESSFULL</h1>, // insert your page here
  },
  {
    path: '/ticket',
    element: <Ticket />,
  },
  {
    path: '/accountpage',
    element: <Account />,
  },
  {
    path: '/editprofile',
    element: <EditProfile />,
  },
  {
    path: '/changepassword',
    element: <ChangePassword />,
  },
  {
    path: '/favoriteGenres',
    element: <FavoriteGenres />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // keeps the fetched data in cache for 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarkedMoviesProvider>
        <EmojieProvider>
          <RouterProvider router={router} />
        </EmojieProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </BookmarkedMoviesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

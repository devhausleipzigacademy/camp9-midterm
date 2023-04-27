import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import WelcomeHeader from './components/WelcomeHeader';
import NavigationLayout from './components/NavigationLayout';
import MovieDetails from './pages/MovieDetails';
import Ticket from './pages/Ticket';
import BookDateAndTime from './pages/BookDateAndTime';
import Home from './pages/Home';
import Genres from './pages/Genres';
import Credits from './pages/Credits';
import LogInPage from './pages/LogInPage';
import Movies from './pages/Movies';
import EmojieProvider from './Context/GenreContext';
import Account from './components/accountpage/Account';
import EditProfil from './components/accountpage/EditProfil';
import ChangePassword from './components/accountpage/ChangePassword';
import FavoriteGenres from './components/accountpage/FavoriteGenres';

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
    element: <h1>SELECT SEATS</h1>, // insert your page here
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
    path: '/editprofil',
    element: <EditProfil />,
  },
  {
    path: '/changepassword',
    element: <ChangePassword />,
  },
  {
    path: '/favoritegenres',
    element: <FavoriteGenres />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <EmojieProvider>
        <RouterProvider router={router} />
      </EmojieProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

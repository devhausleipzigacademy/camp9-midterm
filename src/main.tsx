import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider,  } from '@tanstack/react-query'
import './index.css';
import NavigationLayout from './components/NavigationLayout';
import MovieDetails from './pages/MovieDetails';
import BookDateAndTime from './pages/BookDateAndTime';
import Home from './pages/Home';
import Genres from './pages/Genres';
import Credits from './pages/Credits';
import LogInPage from './pages/LogInPage';
import Movies from './pages/Movies';
import EmojieProvider from './Context/GenreContext';
import SelectSeat from './pages/SelectSeat';

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
    element: <LogInPage />,
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
    path: '/dates',
    element: <BookDateAndTime />,
  },
  {
    path: '/seats',
    element: <SelectSeat />, // insert your page here
  },
  {
    path: '/success',
    element: <h1>BOOKING SUCCESSFULL</h1>, // insert your page here
  },
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <EmojieProvider>
        <RouterProvider router={router} />
      </EmojieProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

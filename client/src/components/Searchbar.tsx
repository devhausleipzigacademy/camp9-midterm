import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useGetNowPlayingMovies } from '../hooks/useGetNowPlayingMovies';
import { useGetMoviesByQuery } from '../hooks/useGetMoviesByQuery';
import { Movie } from '../utilities/types';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');

  const { data: dataMoviesByQuery } = useGetMoviesByQuery(query);

  const {
    isLoading: isLoadingNowPlayingMovies,
    isError: isErrorNowPlayingMovies,
    data: dataNowPlayingMovies,
  } = useGetNowPlayingMovies();

  if (isLoadingNowPlayingMovies) {
    return <span>Loading...</span>;
  }

  if (isErrorNowPlayingMovies) {
    return <span>Error!</span>;
  }

  if (typeof dataNowPlayingMovies == 'string') {
    return <span>Error!</span>;
  }

  const nowPlayingMovies = dataNowPlayingMovies.results;

  const moviesByQuery = dataMoviesByQuery?.results || [];

  const moviesByQueryWithoutDuplicates = moviesByQuery.filter(
    movie =>
      !nowPlayingMovies.some(nowPlayingMovie => nowPlayingMovie.id === movie.id)
  );

  const movies = [...nowPlayingMovies, ...moviesByQueryWithoutDuplicates];

  const filteredMovies =
    query === ''
      ? movies
      : movies.filter(movie =>
          movie.title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  function handleSubmitMovie(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && selected) {
      navigate(`/movies/${selected.id}`);
    }
  }

  return (
    <div>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-full bg-dark-light text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow">
            <div className="pl-6 h-full absolute border-solid flex justify-center items-center">
              <MagnifyingGlassIcon
                className="text-white-dimmed "
                style={{
                  width: '18px',
                }}
              />
            </div>
            <Combobox.Input
              onKeyUp={e => handleSubmitMovie(e)}
              placeholder="Search"
              className="h-12 w-full rounded-full bg-transparent border-none py-2 pl-3 pr-10 text-sm leading-5 text-white-dimmed focus:ring-0 indent-10"
              displayValue={(movie: Movie) => movie && movie.title}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-2 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute w-full mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
              {filteredMovies.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-dark-light">
                  Nothing found.
                </div>
              ) : (
                filteredMovies.map(movie => (
                  <Combobox.Option
                    key={movie.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-yellow text-white' : 'text-gray-900'
                      }`
                    }
                    value={movie}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {movie.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white-dimmed' : 'text-yellow'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

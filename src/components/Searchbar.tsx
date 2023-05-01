import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, CheckIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { Movie } from '../utilities/types';

function SearchBar() {
/* This code is setting up state variables `query` and `movie` using the `useState` hook. The `query`
variable is initialized with an empty string and `movie` is initialized with an empty array of
`Movie` type. */
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState<Movie[]>([]);

/* This code is using the `useEffect` hook to make an API call to the Movie Database API when the
`query` state variable changes. The API call is made using the `axios` library and the URL includes
the `query` value as a parameter. The response data is then used to update the `movie` state
variable using the `setMovie` function. */
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_KEY
        }&language=en-US&query=${query}&include_adult=false`
      )
      .then(res => setMovie(res.data.results))
      .catch();
  }, [query]);

/* This code is creating a new variable `filteredData` that contains an array of `Movie` objects that
match the search query entered by the user. If the search query is an empty string, the
`filteredData` variable is set to the entire `movie` array. If the search query is not empty, the
`filter()` method is used to create a new array that contains only the `Movie` objects whose `title`
property matches the search query. The `toLowerCase()` and `replace()` methods are used to remove
any whitespace and convert both the search query and the `title` property to lowercase for
case-insensitive matching. */
  const filteredData =
    query === ''
      ? movie
      : movie?.filter(movie =>
          movie.title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

/* This code is creating a reference to the input element of the search bar using the `useRef` hook.
The `inputBar` variable is initialized with a value of `null` or `any` type. The `handleClick`
function is used to set focus on the input element when the search bar is clicked. This is achieved
by accessing the `current` property of the `inputBar` reference and calling the `focus()` method on
it. */
  const inputBar: null | any = useRef(null);
  const handleClick = () => {
    inputBar.current.focus();
  };

  return (
    <Combobox value={query} onChange={setQuery}>
      <div className="w-[20.938rem] h-[3rem]">
        <div
          className="sbar bg-[#363740] w-[20.938rem] h-[3rem] rounded-full flex items-center"
          onClick={handleClick}
        >
          <div className="sbar__icon border-solid py-[0.938rem] pl-[1.438rem] pr-[1.188rem]">
            <MagnifyingGlassIcon
              className="icon text-[#86878c] "
              style={{
                width: '18px',
              }}
            />
          </div>
          <Combobox.Input
            className="sbar__input bg-transparent mr-[1.438rem] flex-1 outline-0 text-[#9ca3af]"
            onChange={event => setQuery(event.target.value)}
            placeholder="Search"
            autoFocus
            ref={inputBar}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-[20.938rem] overflow-auto rounded-md bg-[#363740] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredData?.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-[#9ca3af]">
                Nothing found.
              </div>
            ) : (
              filteredData?.map(movie => (
                <Combobox.Option
                  key={movie.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-[#FFB43A] text-[363740]' : 'text-[#9ca3af]'
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
                            active ? 'text-white' : 'text-[#FFB43A]'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5 " aria-hidden="true" />
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
  );
}
export default SearchBar;

import { Outlet, useNavigate } from 'react-router-dom';
import {
  FilmIcon,
  HomeIcon,
  QueueListIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useCheckAuthQuery } from '../hooks/useUser';
import { NavLink } from 'react-router-dom';

function NavigationLayout() {
  const navigate = useNavigate();
  // is user loggedIn ?
  // redirect to /login
  const { isError, isLoading } = useCheckAuthQuery();
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    navigate('/login');
  }
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer className="py-8 px-16 w-full text-white-dimmed fixed bottom-0 bg-dark dark:text-dark dark:bg-white-dimmed">
        <nav>
          <ul className="flex flex-row justify-between max-w-xs m-auto ">
            <li>
              <NavLink to="/">
                <HomeIcon className="w-6 dark:fill-dark-light" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies">
                <FilmIcon className="w-6 dark:fill-dark-light" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookmarks">
                <QueueListIcon className="w-6 dark:fill-dark-light" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/accountpage">
                <UserIcon className="w-6 dark:fill-dark-light" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default NavigationLayout;

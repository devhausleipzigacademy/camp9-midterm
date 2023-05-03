import './NavigationLayout.css';
import { Outlet } from 'react-router-dom';
import {
  FilmIcon,
  HomeIcon,
  QueueListIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';

function NavigationLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer className="py-8 px-16 w-full text-white-dimmed fixed bottom-0">
        <nav>
          <ul className="flex flex-row justify-between max-w-xs m-auto">
            <li>
              <NavLink to="/">
                <HomeIcon className="w-6" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies">
                <FilmIcon className="w-6" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookmarks">
                <QueueListIcon className="w-6" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/accountpage">
                <UserIcon className="w-6" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default NavigationLayout;

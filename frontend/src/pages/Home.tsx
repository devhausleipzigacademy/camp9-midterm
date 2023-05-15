import SearchBar from '../components/Searchbar';
import UpcomingMovies from '../components/UpcomingMovies';
import GenreFavorites from '../components/GenreFavorites';
import avatar from '../assets/Avatar.png';
import { useGetSingleUser } from '../hooks/useUser';
import { Link } from 'react-router-dom';

function Home() {
  const { data } = useGetSingleUser();
  let firstName = 'User';
  if (data) {
    firstName = data.firstName;
  }

  return (
    <section className="mx-5 mt-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-5">
          <h3 className="typography-secondary dark:text-dark">
            Welcome {firstName} 👋
          </h3>
          <p className="typography-primary text-white dark:text-dark">
            Let's relax and watch a movie!
          </p>
        </div>
        <Link to="/accountpage">
          <img alt="avatar" src={avatar}></img>
        </Link>
      </div>
      <div className="mt-7">
        <SearchBar />
      </div>
      <div className="mt-7 -mx-5">
        <GenreFavorites />
      </div>
      <div className="mt-2">
        <UpcomingMovies />
      </div>
    </section>
  );
}

export default Home;

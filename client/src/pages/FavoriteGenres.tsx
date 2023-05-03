import HeaderPage from '../components/HeaderPage';

function FavoriteGenres() {
  return (
    <div>
      <HeaderPage children="Select Your Favorite Genres" />
      <p className="text-white">
        Info for developers. The idea behind this, is to select up to four
        Genres that are shown as default emojie(with the option to be selected)
        in the GenresFavorite component in Home
      </p>
    </div>
  );
}

export default FavoriteGenres;

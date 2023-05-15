import Avatar from '../assets/Avatar.png';
import { Link } from 'react-router-dom';

type WelcomeHeader = Props;

type Props = {
  name?: string;
  image?: string;
};

function WelcomeHeader({ name = 'Dan', image = Avatar, ...props }: Props) {
  
  return (
    <header className="flex justify-between bg-[#1C1C27]">
      <div className="flex flex-col justify-between">
        <h3 className="font-sans font-bold text-xs text-white opacity-40">
          Welcome {name}👋
        </h3>
        <h1 className="text-white font-bold text-sm">
          Let's relax and watch a movie!
        </h1>
      </div>
      <Link to="/settings">
        <img className="h-10 w-10" alt="avatar" src={image}></img>
      </Link>
    </header>
  );
}
export default WelcomeHeader;

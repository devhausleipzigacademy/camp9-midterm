import { ChevronLeftIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: string;
  hasHeartButton?: boolean;
  isLiked?: boolean;
  onHeartButtonClick?: () => void;
};

function HeaderPage(props: Props) {
  // function used to navigate back to the last page when the arrow back is clicked
  const navigation = useNavigate();
  // the return statement with the jsx component
  return (
    <header className="flex justify-between items-center px-5 pb-6 pt-8 sticky top-0 z-10 bg-dark dark:bg-white">
      {/* the little back arrow */}
      <button onClick={() => navigation(-1)}>
        <ChevronLeftIcon className="typography-title w-5 dark:stroke-dark"></ChevronLeftIcon>
      </button>
      {/* the title of the page */}
      <h1 className="typography-title dark:text-dark">{props.children}</h1>
      {/* the heart icon, visible if the hasHeartButton={true} prop is passed, can call the callback function on click if one is passed as the onHeartButtonClick prop */}
      <div className="w-5 h-5">
        {props.hasHeartButton && (
          <button
            onClick={() => {
              props.onHeartButtonClick && props.onHeartButtonClick();
            }}
            className={
              `w-full transition-colors duration-500 ` +
              (props.isLiked ? `text-red` : `stroke-red text-transparent`)
            }
          >
            <HeartIcon></HeartIcon>
          </button>
        )}
      </div>
    </header>
  );
}

export default HeaderPage;

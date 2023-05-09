import clsx from 'clsx';
import { useGenreContext } from '../contexts/GenreContext';

export interface Props {
  emojie: string;
  genre: string;
  id: number;
  isSelected: boolean;
}

function GenreBtn(props: Props) {
  const { toggleGenre } = useGenreContext();

  return (
    <div
      key={props.id}
      onClick={() => {
        toggleGenre(props.id);
      }}
      className="flex flex-col justify-center items-center gap-2 cursor-pointer"
    >
      <div
        className={clsx(
          'w-[56px] h-[56px] text-[30px] flex justify-center items-center rounded-lg text-center',
          props.isSelected
            ? 'bg-white-dimmed dark:bg-dark-light'
            : 'bg-dark-light dark:bg-yellow'
        )}
      >
        {props.emojie}
      </div>
      <p className="text-white-dimmed dark:text-dark">{props.genre}</p>
    </div>
  );
}

export default GenreBtn;

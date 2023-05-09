import clsx from 'clsx';
import { useEmojieLibrary } from '../../contexts/GenreContext';

export interface Props {
  emojie: string;
  genre: string;
  id: number;
  isSelected: boolean;
}

function GenreBtn(props: Props) {
  const { toggleEmojie, countingEmojies } = useEmojieLibrary();

  return (
    <div
      key={props.id}
      onClick={() => {
        toggleEmojie(props.id);
        countingEmojies(props.isSelected);
      }}
      className="flex flex-col justify-center items-center gap-2 cursor-pointer"
    >
      <div
        className={clsx(
          'w-[56px] h-[56px] text-[30px] flex justify-center items-center rounded-lg text-center',
          props.isSelected
            ? 'bg-white/40 dark:bg-dark-light'
            : 'bg-[#363740] dark:bg-yellow'
        )}
      >
        {props.emojie}
      </div>
      <p className="text-white/40 dark:text-dark">{props.genre}</p>
    </div>
  );
}

export default GenreBtn;

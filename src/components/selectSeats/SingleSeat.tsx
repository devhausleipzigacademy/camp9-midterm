import clsx from 'clsx';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends Button {
  isSelected: boolean;
}

function SingleSeat({ isSelected, disabled, ...props }: Props) {
  return (
    <button
      className={clsx(
        'w-7 h-7 rounded-md disabled:bg-white',
        isSelected ? 'bg-yellow' : 'bg-white-dimmed-heavy'
      )}
      disabled={disabled}
      {...props}
    ></button>
  );
}

export default SingleSeat;

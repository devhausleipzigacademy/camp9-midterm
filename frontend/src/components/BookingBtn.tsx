import clsx from 'clsx';
import React from 'react';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends Button {
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isSelected: boolean;
}

function BookingBtn({ isSelected, onClick, children, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'w-20 h-7 rounded-md disabled:text-white-dimmed-heavy dark:disabled:text-slate-300 dark:disabled:bg-white disabled:bg-dark',
        isSelected
          ? ' text-dark-light bg-yellow'
          : 'text-white-dimmed dark:text-dark-light'
      )}
    >
      {children}
    </button>
  );
}

export default BookingBtn;

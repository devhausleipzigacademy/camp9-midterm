import React from 'react';
import clsx from 'clsx';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends Button {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  disabled?: boolean;
}

function Button({ variant = 'primary', size = 'lg', ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'w-full rounded-lg disabled:opacity-50',
        variant === 'primary' ? 'bg-yellow' : 'bg-[#363740] text-white',
        size === 'lg' ? 'py-4' : 'py-3'
      )}
    >
      {props.children}
    </button>
  );
}

export default Button;

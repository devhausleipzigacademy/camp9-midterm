import clsx from 'clsx';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends Button {
  status: 'active' | 'passive';
}

export default function ToggleButton({ status, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'w-[155px] h-[25px] typography-body rounded-lg',
        status === 'passive'
          ? 'text-white-dimmed bg-dark-light dark:text-dark-light dark:bg-slate-300'
          : 'text-white border border-white bg-white-dimmed dark:border-dark-light dark:bg-dark-light dark:text-dark'
      )}
    >
      {props.children}
    </button>
  );
}

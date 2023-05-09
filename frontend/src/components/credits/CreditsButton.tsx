import clsx from 'clsx';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends Button {
  status: 'active' | 'passive';
}

export default function CastCrewButton({ status, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'w-[155px] h-[25px] typography-body rounded-lg',
        status === 'passive'
          ? 'text-white-dimmed bg-dark-light'
          : 'text-white dark:text-dark dark:bg-slate-300 dark:border-dark-light border border-white bg-white-dimmed'
      )}
    >
      {props.children}
    </button>
  );
}

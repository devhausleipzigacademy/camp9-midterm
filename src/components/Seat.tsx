import { useState } from 'react';
import clsx from 'clsx';

type Props = {
  disabled: Boolean;
};
type Seat = 'Available' | 'Reserved' | 'Selected';

export function Seat(props: Props) {
  const [state, setState] = useState<Seat>('Available');

  return (
    <button
      disabled={false}
      className={clsx(
        'rounded-sm h-7 w-7',
        props.disabled === true
          ? 'bg-white'
          : state === 'Selected'
          ? 'bg-[#FFB43A]'
          : 'bg-[#363740]'
      )}
      onClick={e => {
        switch (state) {
          case 'Available':
            setState('Selected');
            break;
          case 'Selected':
            setState('Available');
            break;
        }
      }}
    ></button>
  );
}

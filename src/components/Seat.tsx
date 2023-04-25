import { useState } from 'react';
import clsx from 'clsx';

type Props = {
  disabled: Boolean;
};
type Seat = boolean;

export function Seat(props: Props) {
  const [selected, setSelected] = useState<Seat>(false);

  return (
    <button
      disabled={false}
      className={clsx(
        'rounded-sm h-7 w-7',
        props.disabled === true
          ? 'bg-[#363740]'
          : selected
          ? 'bg-[#FFB43A]'
          : 'bg-white'
      )}
      onClick={e => {
        switch (selected) {
          case false:
            setSelected(true);
            break;
          case true:
            setSelected(false);
            break;
        }
      }}
    ></button>
  );
}

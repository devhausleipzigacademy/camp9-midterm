import { useState } from 'react';
import clsx from 'clsx';
import { useContext } from 'react';
import { SeatsContext } from '../contexts/SeatsContext';

type Props = {
  disabled: Boolean;
  type: SeatSection;
  seatId: string;
};

export type SeatSection = 'front' | 'middle' | 'back';

export function Seat(props: Props) {
  const [selected, setSelected] = useState(false);
  const { seatObject, setSeatObject } = useContext(SeatsContext);

  function handleSeatObject(type: string, n: number, newSeatId: string) {
    let newSeatIds;
    if (n === 1) {
      newSeatIds = [...seatObject.seatIds, newSeatId];
    } else if (n === -1) {
      newSeatIds = seatObject.seatIds.filter(seatId => seatId !== newSeatId);
    }

    let seatSectionCountKeyPair;
    if (type === 'front') {
      seatSectionCountKeyPair = {
        frontSeatsCount: seatObject.frontSeatsCount + n,
      };
    } else if (type === 'middle') {
      seatSectionCountKeyPair = {
        middleSeatsCount: seatObject.middleSeatsCount + n,
      };
    } else if (type === 'back') {
      seatSectionCountKeyPair = {
        backSeatsCount: seatObject.backSeatsCount + n,
      };
    }

    return {
      ...seatObject,
      ...seatSectionCountKeyPair,
      seatIds: newSeatIds,
    };
  }

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
      onClick={() => {
        switch (selected) {
          case false:
            setSelected(true);
            setSeatObject(handleSeatObject(props.type, +1, props.seatId));
            break;
          case true:
            setSelected(false);
            setSeatObject(handleSeatObject(props.type, -1, props.seatId));
            break;
        }
      }}
    ></button>
  );
}

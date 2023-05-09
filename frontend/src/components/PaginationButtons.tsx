import React from 'react';
import clsx from 'clsx';

interface PaginationButtons {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

function PaginationButtons({ setState, state }: PaginationButtons) {
  const paginationNumbers = [1, 2, 3, 4, 5];
  return (
    <div className="w-full flex justify-between mt-5">
      {paginationNumbers.map((value: number, index) => {
        return (
          <button
            key={index}
            onClick={e => {
              setState(value);
            }}
            className={clsx(
              state === value ? 'bg-[#FFB43A]' : 'bg-[#FFFFFF] opacity-40',
              ' w-8 h-8 rounded-sm text-center'
            )}
          >
            <p>{value}</p>
          </button>
        );
      })}
    </div>
  );
}
export default PaginationButtons;

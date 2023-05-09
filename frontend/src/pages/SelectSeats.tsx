import { useState } from 'react';
import Seats from '../components/Seats';
import HeaderPage from '../components/HeaderPage';
import SeatPopover from '../components/SeatPopover';
import { SeatsContext } from '../contexts/SeatsContext';

function SelectSeats() {
  const [seatObject, setSeatObject] = useState({
    frontSeatsCount: 0,
    middleSeatsCount: 0,
    backSeatsCount: 0,
    seatIds: []
  });
  return (
    <SeatsContext.Provider value={{seatObject, setSeatObject}}>
      <div>
        <div className="flex flex-col items-center my-8">
          <HeaderPage children={'Select Seats'} />
          <div className="h-[5px] w-[279px] bg-yellow my-5 "></div>
          <Seats />
          <div className="flex gap-[25px] mt-1 mb-8">
            <div className="flex gap-[6px]">
              <div className="bg-white dark:bg-dark h-4 w-4 rounded-full"></div>
              <p className="typography-description dark:text-dark">Available</p>
            </div>
            <div className="flex gap-[6px]">
              <div className="bg-yellow h-4 w-4 rounded-full"></div>
              <p className="typography-description dark:text-dark">Selected</p>
            </div>
            <div className="flex gap-[6px]">
              <div className="bg-dark-light dark:bg-white h-4 w-4 rounded-full"></div>
              <p className="typography-description dark:text-dark">Reserved</p>
            </div>
            <SeatPopover />
          </div>
        </div>
      </div>
    </SeatsContext.Provider>
  );
}

export default SelectSeats;

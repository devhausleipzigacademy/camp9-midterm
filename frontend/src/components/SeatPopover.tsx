import { Link } from 'react-router-dom';
import Button from './Button';
import { SeatsContext } from '../contexts/SeatsContext';
import { useContext } from 'react';

function SeatPopover() {
  const {seatObject} = useContext(SeatsContext)
  return (
    <>
      <div className="bg-[#494952] rounded-[12px] pt-7 pb-5 px-5 fixed bottom-0 left-0 right-0">
        <div className="grid">
          <div className="flex  justify-between typography-primary">
            <div>
              {seatObject.frontSeatsCount} X
              <span className="typography-title text-sm "> Seat - Front</span>
            </div>
            <div>
              <span className="typography-title text-sm">$12.95</span> / each
            </div>
          </div>
          <div className="flex justify-between typography-primary">
            <div>
              {seatObject.middleSeatsCount} X
              <span className="typography-title text-sm"> Seat - Middle</span>
            </div>
            <div>
              <span className="typography-title text-sm">$14.95</span> / each
            </div>
          </div>
          <div className="flex justify-between typography-primary">
            <div>
              {seatObject.backSeatsCount} X
              <span className="typography-title text-sm"> Seat - Back</span>
            </div>
            <div>
              <span className="typography-title text-sm">$16.95</span> / each
            </div>
          </div>
        </div>
        <hr className="white-dimmed-heavy mt-4 " />
        <div className="flex justify-between items-end mt-7 ">
          <div className="grid typography-title text-2xl">
            <span className="typography-description ">Total Price</span>${' '}
            {Math.round(
              (seatObject.frontSeatsCount * 12.95 +
                seatObject.middleSeatsCount * 14.95 +
                seatObject.backSeatsCount * 16.95) *
                100
            ) / 100}
          </div>
          <Link className="w-[215px]" to={'/success'}>
            <Button className="">Book Ticket</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SeatPopover;

import Seats from '../components/Seats';
import HeaderPage from '../components/HeaderPage';

function SelectSeats() {
  return (
    <div>
      <div className="flex flex-col items-center my-8">
        <HeaderPage children={'Select Seats'} />
        <div className="h-[5px] w-[279px] bg-yellow mt-12 mb-[52px] "></div>
        <Seats />
        <div className="flex gap-[25px] mt-1 mb-8">
          <div className="flex gap-[6px]">
            <div className="bg-white dark:bg-slate-300 h-4 w-4 rounded-full"></div>
            <p className="typography-description dark:text-dark">Available</p>
          </div>
          <div className="flex gap-[6px]">
            <div className="bg-yellow h-4 w-4 rounded-full"></div>
            <p className="typography-description dark:text-dark">Selected</p>
          </div>
          <div className="flex gap-[6px]">
            <div className="bg-dark-light dark:bg-dark-light h-4 w-4 rounded-full"></div>
            <p className="typography-description dark:text-dark">Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectSeats;

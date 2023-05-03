import Seats from '../components/Seats';
import PageHeader from '../components/CreditsPageHeader';

function SelectSeats() {
  return (
    <div>
      <div className="flex flex-col items-center my-8">
        <PageHeader children={'Select Seats'} />
        <div className="h-[5px] w-[279px] bg-yellow mt-12 mb-[52px] "></div>
        <Seats />
        <div className="flex gap-[25px] mt-1 mb-8">
          <div className="flex gap-[6px]">
            <div className="bg-white h-4 w-4 rounded-full"></div>
            <p className="typography-description">Available</p>
          </div>
          <div className="flex gap-[6px]">
            <div className="bg-yellow h-4 w-4 rounded-full"></div>
            <p className="typography-description">Selected</p>
          </div>
          <div className="flex gap-[6px]">
            <div className="bg-dark-light h-4 w-4 rounded-full"></div>
            <p className="typography-description">Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectSeats;

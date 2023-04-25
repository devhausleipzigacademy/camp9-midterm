import { Seat } from '../components/Seat';

function SelectSeat() {
  return (
    <div>
      <Seat disabled={undefined} />
      <Seat />
      <Seat />
      <Seat />
    </div>
  );
}

export default SelectSeat;

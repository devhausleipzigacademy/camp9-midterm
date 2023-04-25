import SingleSeat from '../components/selectSeats/SingleSeat';

interface Props {
  isSelected: boolean;
}

function SelectSeats({ isSelected }: Props) {
  function handleClick() {
    switch (isSelected) {
      case true:
        isSelected = false;
        break;
      case false:
        isSelected = true;
    }
  }

  return (
    <div>
      <SingleSeat isSelected={isSelected} />
      <SingleSeat isSelected={true} />
      <SingleSeat isSelected={false} onClick={handleClick} />
      <SingleSeat isSelected={false} disabled />
    </div>
  );
}

export default SelectSeats;

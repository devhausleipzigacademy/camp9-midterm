import { Seat, SeatSection } from './Seat';

function Seats() {
  const seatsArray = [
    [null, 'A-1', 'A-2', 'A-3', null, 'A-4', 'A-5', 'A-6', null],
    ['B-1', 'B-2', 'B-3', 'B-4', null, 'B-5', 'B-6', 'B-7', 'B-8'],
    ['C-1', 'C-2', 'C-3', 'C-4', null, 'C-5', 'C-6', 'C-7', 'C-8'],
    ['D-1', 'D-2', 'D-3', 'D-4', null, 'D-5', 'D-6', 'D-7', 'D-8'],
    ['E-1', 'E-2', 'E-3', 'E-4', null, 'E-5', 'E-6', 'E-7', 'E-8'],
    [null, 'F-1', 'F-2', 'F-3', null, 'F-4', 'F-5', 'F-6', null],
  ];

  const seatTypes: Record<string, SeatSection> = {
    A: 'front',
    B: 'middle',
    C: 'middle',
    D: 'middle',
    E: 'middle',
    F: 'back',
  };

  return (
    <div className="grid grid-rows-6 grid-cols-9 gap-3 m-5">
      {seatsArray.map(row => {
        //map through 1st array with null
        return row.map((seat, index) => {
          //map through each row and take the seat&index
          if (seat) {
            // if there is a seat and not null...
            const seatType = seatTypes[seat.substring(0, 1)];
            //... create a substring to get the first letter and bind it to seatType
            return (
              <Seat
                seatId={seat}
                disabled={false}
                key={index}
                type={seatType}
              />
            );
          } else {
            return <div key={index}></div>;
          }
        });
      })}
    </div>
  );
}

export default Seats;

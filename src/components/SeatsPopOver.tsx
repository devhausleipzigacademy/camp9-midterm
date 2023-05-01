import { useEffect } from 'react';

interface Props {
  type: string;
}

function SeatsPopOver(props: Props) {
  const seats = props;
  let price = '';

  /* This code is setting the price of the seat based on its type. If the seat type is 'front', the price
  will be set to '12.95'. If the seat type is 'middle', the price will be set to '7.475'. Otherwise,
  the price will be set to '8.475'. The ternary operator is used to determine which price to set based
  on the seat type. The code also updates the seat type to be either 'front' or 'middle' based on the
  same ternary operator. */

  if (seats.type === 'front') {
    price = '12.95';
  } else if (seats.type === 'middle') {
    price = '7.475';
  } else {
    price = '8.475';
  }

  /* The `useEffect` hook is used to perform side effects in a functional component. In this code, it is
  used to update the `seatsSelected` object in the local storage whenever the `seats` object changes.
  The `updateSeatSelecteds` function is called with the `seats.price` and `seats.type` as arguments,
  which are used to update the `seatsSelected` object in the local storage. The `seats` object is
  added as a dependency to the `useEffect` hook, so that the hook is triggered whenever the `seats`
  object changes. */
  useEffect(() => {
    updateSeatSelecteds(price, seats.type);
  }, [price]);

  /**
   * The function updates and stores the `seatsSelected` object in the local storage based on the `price`
   * and `type` parameters passed to it.
   * @param {string} price - a string representing the price of a selected seat
   * @param {string} type - a string representing the type of seat selected (e.g. "standard", "premium",
   * "vip")
   */
  const updateSeatSelecteds = (price: string, type: string) => {
    /* `const seatsSelected` is a variable that is being assigned the value of the `seatsSelected` object
    stored in the local storage. The `localStorage.getItem('seatsSelected')` method retrieves the value
    of the `seatsSelected` object from the local storage, and the `JSON.parse()` method is used to parse
    the retrieved value into a JavaScript object. If the `seatsSelected` object is not found in the
    local storage, an empty object `{}` is used as the default value. */
    const seatsSelected = JSON.parse(
      localStorage.getItem('seatsSelected') || '{}'
    );

    /* This code is updating the `seatsSelected` object stored in the local storage. */
    if (seatsSelected[type]) {
      /* This code is updating the `seatsSelected` object stored in the local storage. It is creating a
      new object with three properties: `id`, `price`, and `quantity`. */
      seatsSelected[type] = {
        id: seatsSelected[type].id + 1,
        price: Math.ceil(
          parseFloat(seatsSelected[type].price) + parseFloat(price)
        ),
        quantity: seatsSelected[type].quantity + 1,
      };
    } else {
      /* This code is creating a new object with two properties: `price` and `quantity`. The `price` property
      is set to the value of the `price` parameter passed to the `updateSeatSelecteds` function, which
      represents the price of a selected seat. The `quantity` property is set to `1`, indicating that one
      seat of this type has been selected. This object is then assigned to the `seatsSelected[type]`
      property, where `type` is the type of seat selected (e.g. "standard", "premium", "vip"). If a seat
      of this type has already been selected, the `seatsSelected[type]` property will already exist, and
      its value will be updated with the new `price` and `quantity` values. */
      seatsSelected[type] = {
        price: Math.ceil(parseFloat(price)),
        quantity: 1,
      };
    }

    /* `localStorage.setItem('seatsSelected', JSON.stringify(seatsSelected));` is storing the
    `seatsSelected` object in the local storage. The `localStorage.setItem()` method is used to set
    the value of the `seatsSelected` object in the local storage, with the key `'seatsSelected'`.
    The `JSON.stringify()` method is used to convert the `seatsSelected` object into a JSON string,
    which can be stored in the local storage. This allows the `seatsSelected` object to persist even
    after the user closes the browser or refreshes the page. */
    localStorage.setItem('seatsSelected', JSON.stringify(seatsSelected));
  };

  /* `const seatsSelected = JSON.parse(localStorage.getItem('seatsSelected') || '{}');` is retrieving
  the value of the `seatsSelected` object from the local storage and parsing it into a JavaScript
  object. If the `seatsSelected` object is not found in the local storage, an empty object `{}` is
  used as the default value. The `localStorage.getItem('seatsSelected')` method retrieves the value
  of the `seatsSelected` object from the local storage, and the `JSON.parse()` method is used to
  parse the retrieved value into a JavaScript object. This allows the `seatsSelected` object to be
  used in the component to display the list of selected seats and calculate the total price of all
  selected seats. */
  const seatsSelected = JSON.parse(
    localStorage.getItem('seatsSelected') || '{}'
  );
  /* `const seatTypes = Object.keys(seatsSelected);` is creating an array of the keys in the
  `seatsSelected` object and assigning it to the `seatTypes` constant. This array will be used to
  iterate over the different types of seats that have been selected and display them in the
  component. */
  const seatTypes = Object.keys(seatsSelected);

  return (
    <div className="bg-[#363740] rounded-[1.5rem] flex-col">
      <div className="font-medium gap-2 text-xs flex flex-col justify-between border-b-[.063rem] border-b-[#5e5f66] mx-[1.25rem] pt-[1.75rem] pb-[1rem]">
        {/* This code is rendering a list of selected seats in the SeatsPopOver component. */}
        {seatTypes.map(type => (
          <div key={type} className="flex justify-between">
            <div className="flex gap-6">
              <div className="text-[#86878c]">
                {seatsSelected[type].quantity}x
              </div>
              <div className="text-white">{type} Seat</div>
            </div>
            <div className="flex gap-1">
              <div className="text-white">${seatsSelected[type].price}</div>
              <div className="text-[#86878c]">/ each</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mr-[1.25rem]">
        <div className="mt-[2.5rem] ml-[1.25rem]">
          <div className="text-[#86878c] text-sm">Total Price</div>
          <div className="text-white font-bold text-xl">
            $
            {/* `{seatTypes.reduce((acc, type) => acc + seatsSelected[type].price, 0)}` is calculating
           the total price of all selected seats. */}
            {seatTypes.reduce(
              (acc, type) => acc + seatsSelected[type].price,
              0
            )}
          </div>
        </div>
        <div>
          <button className="font-bold text-sm rounded-lg bg-[#FFB43A] py-[1rem] pl-[4.214rem] pr-[4.161rem] mt-[2.063rem] mb-[1.5rem]">
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatsPopOver;

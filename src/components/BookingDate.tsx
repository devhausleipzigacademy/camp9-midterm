import { Children } from 'react';
import BookingBtn from './BookingBtn';

export default function BookingDate() {
  const currentDate = new Date();
  //initialising a new Date, 'new' means accessing a fct (otherwise it could be confused with a type)
  const end = new Date();
  const movieDurationInMinutes = 90;
  end.setHours(23, 0, 0, 0);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  function addDays(date: Date, days: number) {
    //build-in types exist! like array, number...
    //type 'Date" has a specific format:
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const monthName = monthNames[month];
    return `${day} ${monthName}`;
  }

  const dateBtns = [];
  // make array with current dates
  for (let i = 0; i < 12; i++) {
    const label = addDays(currentDate, i);
    //label could also be just children
    const bookingBtn = <BookingBtn key={i} children={label} />;
    dateBtns.push(bookingBtn);
  }

  // then select 4 out of dateBtns
  // const days in manuels new code
  function FourDates(dateBtns: JSX.Element[]) {
    const disabledDates: JSX.Element[] = [];
    while (disabledDates.length < 4) {
      const randomIndex = Math.floor(Math.random() * dateBtns.length);
      if (!disabledDates.includes(dateBtns[randomIndex])) {
        disabledDates.push(dateBtns[randomIndex]);
      } //splice returns modified array
      dateBtns.splice(randomIndex, 1);
    }

    const disabledDatesWithId = disabledDates.map(item => {
      return (
        <BookingBtn key={item.key} children={item.props.children} disabled />
      );
    });
    return disabledDatesWithId;
  }

  const finalDisabledDates = FourDates(dateBtns);

  //combine both arrays (8+4) into one (12)
  const allDates = [...dateBtns, ...finalDisabledDates];
  console.log(allDates)
  console.log(allDates.keys);

  return (
    <>
      {/* sort dates by key */}
      {allDates.sort(function (a, b) {
        let x = parseInt(a.key as string);
        let y = parseInt(b.key as string);
        const result = x - y;
        return result;
      })}
    </>
  );
}

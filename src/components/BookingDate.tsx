import BookingBtn from './BookingBtn';
import { eachDayOfInterval, add, format } from 'date-fns';

interface Props {
  onSelect: (date: Date) => void;
  selectedDate: Date | null;
}

export default function BookingDate({ onSelect, selectedDate }: Props) {
  const days = eachDayOfInterval({
    start: new Date(),
    end: add(new Date(), { days: 11 }),
  });

  function onClickHandler(date: Date) {
    onSelect(date);
  }

  // array of 4 random dates
  const generateDisabledDates = (days: Date[]) => {
    const randomDates: Date[] = [];
    while (randomDates.length < 4) {
      const randomIndex = Math.floor(Math.random() * days.length);
      if (
        !randomDates.some(
          date => date.getTime() === days[randomIndex].getTime()
        )
      ) {
        randomDates.push(days[randomIndex]);
      } //splice returns modified array
      days.splice(randomIndex, 1);
    }
    return randomDates;
  };

  const disabledDates = generateDisabledDates(days);

  // subtract 4 random dates from the array of days
  const availableDays = days.filter(
    day => !disabledDates.some(date => date.getTime() === day.getTime())
  );

  // creating buttons for the random dates
  const randomDatesButtons = disabledDates.map(date => (
    <BookingBtn
      key={date.getTime()}
      isSelected={
        selectedDate ? selectedDate.getTime() === date.getTime() : false
      }
      onClick={() => onClickHandler(date)}
      disabled
    >
      {format(date, 'dd MMM')}
    </BookingBtn>
  ));

  // create remaining buttons
  const remainingDatesButtons = availableDays.map(date => (
    <BookingBtn
      key={date.getTime()}
      isSelected={
        selectedDate ? selectedDate.getTime() === date.getTime() : false
      }
      onClick={() => onClickHandler(date)}
    >
      {format(date, 'dd MMM')}
    </BookingBtn>
  ));

  const allDates = [...randomDatesButtons, ...remainingDatesButtons];

  const sortedDates = allDates.sort(function (a, b) {
    const x = parseInt(a.key as string);
    const y = parseInt(b.key as string);
    const result = x - y;
    return result;
  });

  return <>{sortedDates}</>;
}

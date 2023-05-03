import BookingBtn from './BookingBtn';
import { eachMinuteOfInterval, format, setHours, isSameDay } from 'date-fns';

interface Props {
  onSelect: (date: Date) => void;
  selectedTime: Date | null;
}

export default function BookingDate({ onSelect, selectedTime }: Props) {
  const today = new Date();

  // make sure the minutes are rounded to the next 30
  today.setMinutes(today.getMinutes() + 59);

  const day = selectedTime ? new Date(selectedTime) : today;

  day.setMinutes(0);
  const startHour = isSameDay(day, today) ? today.getHours() : 11;

  const intervals = eachMinuteOfInterval({
    start: setHours(day, startHour),
    end: setHours(day, 21),
  }).filter(date => date.getMinutes() === 0 || date.getMinutes() === 30);

  const filteredIntervals = intervals.filter((_, i) => i % 3 == 0);

  function onClickHandler(date: Date) {
    onSelect(date);
  }

  return (
    <>
      {filteredIntervals.map(date => (
        <BookingBtn
          key={date.toISOString()}
          isSelected={
            selectedTime
              ? selectedTime.toISOString() === date.toISOString()
              : false
          }
          onClick={() => onClickHandler(date)}
        >
          {format(new Date(date), 'HH:mm')}
        </BookingBtn>
      ))}
    </>
  );
}

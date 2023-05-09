import { useState } from 'react';
import BookingDate from '../components/BookingDate';
import BookingTime from '../components/BookingTime';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import HeaderPage from '../components/HeaderPage';

export default function BookDateAndTime() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedDateAndTime, setSelectedDateAndTime] = useState<Date | null>();

  const { id } = useParams();

  function handleDataSelected(date: Date) {
    setSelectedDate(prevDate => {
      if (prevDate?.toISOString() === date.toISOString()) {
        return null;
      }
      return date;
    });
    setSelectedTime(date);
  }

  function handleTimeSelected(date: Date) {
    setSelectedTime(prevDate => {
      if (prevDate?.toISOString() === date.toISOString()) {
        return null;
      }
      return date;
    });
    setSelectedDateAndTime(date);
  }

  return (
    <div className="px-5 py-6 h-screen flex flex-col">
      <HeaderPage>Select Date & Time</HeaderPage>
      <div className="py-6 border-b border-white-dimmed dark:border-dark-light">
        <h2 className="text-sm text-white-dimmed dark:text-dark-light font-bold ml-1">
          Date
        </h2>
        <div className="pt-5 grid grid-cols-4 gap-[18px]">
          <BookingDate
            onSelect={handleDataSelected}
            selectedDate={selectedDate}
          />
        </div>
      </div>
      {selectedDate && (
        <div className="py-6 border-opacity-20">
          <h2 className="text-sm text-white-dimmed dark:text-dark-light font-bold ml-1">
            Time
          </h2>
          <div className="pt-5 grid grid-cols-4 gap-[18px]">
            {
              <BookingTime
                onSelect={handleTimeSelected}
                selectedTime={selectedTime}
              />
            }
          </div>
        </div>
      )}{' '}
      <Link
        to={`/seats/${id}?date=${selectedTime
          ?.toISOString()
          .substring(0, 10)}&time=${selectedTime?.getHours()}:${selectedTime
          ?.getMinutes()
          .toString()
          .padStart(2, '0')}`}
        className="mt-auto"
      >
        <Button disabled={!selectedDateAndTime}>Select Seats</Button>
      </Link>
    </div>
  );
}

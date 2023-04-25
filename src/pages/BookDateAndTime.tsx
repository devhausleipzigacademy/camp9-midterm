import { useState } from 'react';
import BookingDate from '../components/BookingDate';
import BookingTime from '../components/BookingTime';
import PageHeader from '../components/CreditsPageHeader';

export default function BookDateAndTime() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  function handleDataSelected(date: Date) {
    setSelectedDate(prevDate => {
      if (prevDate?.toISOString() === date.toISOString()) {
        return null;
      }
      return date;
    });
  }
  return (
    <div className="mx-5 my-6">
      <PageHeader children={'Select Date & Time'} />
      <div className="py-6 border-b border-white-dimmed">
        <h2 className="text-sm text-white-dimmed font-bold ml-1">Date</h2>
        <div className="pt-5 grid grid-cols-4 gap-[18px]">
          <BookingDate
            onSelect={handleDataSelected}
            selectedDate={selectedDate}
          />
        </div>
      </div>
      {selectedDate && (
        <div className="py-6 border-opacity-20">
          <h2 className="text-sm text-white-dimmed font-bold ml-1">Time</h2>
          <div className="pt-5 grid grid-cols-4 gap-[18px]">
            {
              <BookingTime
                onSelect={handleDataSelected}
                selectedDate={selectedDate}
              />
            }
          </div>
        </div>
      )}
    </div>
  );
}

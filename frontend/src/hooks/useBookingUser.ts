import axios, { AxiosError } from 'axios';
import { Booking, BookingResponse } from '../utilities/types';
import { useMutation } from '@tanstack/react-query';

async function bookingsUser(bookings: Booking) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/booking`,
    bookings
  );
  return data;
}

export function useBookingMutation() {
  const mutiation = useMutation<BookingResponse, AxiosError, Booking>({
    mutationFn: bookingUser => bookingsUser(bookingUser),
  });

  return mutiation;
}

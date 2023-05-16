import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getDisabledSeats(movie, date, time) {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/booking`
  );
  return response.data;
}

export default function useGetDisabledSeats(movie, date, time) {
  const query = useQuery({
    queryKey: ['disabledSeats'],
    queryFn: () => getDisabledSeats(movie, date, time),
  });
  return query;
}

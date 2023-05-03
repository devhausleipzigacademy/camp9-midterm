import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PersonImagesRequest } from '../utilities/types';

async function getPersonImages(id: number) {
  const response = await axios.get<PersonImagesRequest>(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  );
  return response.data;
}

export function useGetPersonImages(id: number) {
  const query = useQuery({
    queryKey: ['person', id],
    queryFn: () => getPersonImages(id),
  });

  return { ...query, personImage: query.data };
}

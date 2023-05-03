import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PersonImagesRequest } from '../utilities/types';

async function getPersonImages(personId: number) {
  const response = await axios.get<PersonImagesRequest>(
    `https://api.themoviedb.org/3/person/${personId}/images?api_key=${
      import.meta.env.VITE_TMDB_KEY
    }`
  );
  return response.data;
}

export function useGetPersonImages(personId: number) {
  const query = useQuery({
    queryKey: ['person', personId],
    queryFn: () => getPersonImages(personId),
  });

  return { ...query, personImage: query.data };
}

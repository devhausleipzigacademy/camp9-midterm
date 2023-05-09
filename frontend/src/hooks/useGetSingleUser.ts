import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../utilities/types';

const getSingleUser = async (id: string) => {
  const { data } = await axios.get<User>(
    `${import.meta.env.VITE_BACKEND_URL}/api/1.0/user/${id}`
  );
  return data;
};

export const useGetSingleUser = (id: string) => {
  return useQuery<User>(['user', id], () => getSingleUser(id));
};

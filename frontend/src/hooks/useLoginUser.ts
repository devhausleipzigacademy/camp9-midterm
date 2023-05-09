import axios, { AxiosError } from 'axios';
import { LoginUser } from '../utilities/types';
import { useMutation } from '@tanstack/react-query';

type LoginResponse = { token: string };

async function loginUser(user: LoginUser) {
  const { data } = await axios.post<LoginResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/login`,
    user
  );
  return data;
}

export function useLoginMutation() {
  const mutiation = useMutation<LoginResponse, AxiosError, LoginUser>({
    mutationFn: user => loginUser(user),
  });

  return mutiation;
}

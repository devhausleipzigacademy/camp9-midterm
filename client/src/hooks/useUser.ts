import axios, { AxiosError } from 'axios';
import { SignupUser } from '../utilities/types';
import { useMutation } from '@tanstack/react-query';

async function signupUser(user: SignupUser) {
  const { data } = await axios.post(
    `http://localhost:8000/api/1.0/user/signup`,
    user
  );
  return data;
}

type SignupResponse = {
  token: string;
};

export function useSignupMutation() {
  const mutiation = useMutation<SignupResponse, AxiosError, SignupUser>({
    mutationFn: user => signupUser(user),
  });

  return mutiation;
}

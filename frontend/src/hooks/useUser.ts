import axios, { AxiosError } from 'axios';
import { LoginUser, SignupUser } from '../utilities/types';
import { useMutation, useQuery } from '@tanstack/react-query';
// =====================================================================
// useSignupMutation type, query function and hook
// =====================================================================
type SignupResponse = {
  token: string;
};
async function signupUser(user: SignupUser) {
  const { data } = await axios.post(
    `http://localhost:8000/api/1.0/user/signup`,
    user
  );
  return data;
}

export function useSignupMutation() {
  const mutiation = useMutation<SignupResponse, AxiosError, SignupUser>({
    mutationFn: user => signupUser(user),
  });

  return mutiation;
}
// =====================================================================
// useLoginMutation type, query function and hook
// =====================================================================

type LoginResponse = { token: string };

async function loginUser(user: LoginUser) {
  const { data } = await axios.post<LoginResponse>(
    `http://localhost:8000/api/1.0/user/login`,
    user,
    { withCredentials: true }
  );
  console.log(data);
  return data;
}

export function useLoginMutation() {
  const mutiation = useMutation<LoginResponse, AxiosError, LoginUser>({
    mutationFn: user => loginUser(user),
  });

  return mutiation;
}

async function checkAuth() {
  const { data } = await axios.get(
    `http://localhost:8000/api/1.0/user/checkauth`,
    { withCredentials: true }
  );
  return data;
}

export function useCheckAuthQuery() {
  const query = useQuery({
    queryKey: ['checkAuth'],
    queryFn: checkAuth,
    retry: false,
  });
  return query;
}

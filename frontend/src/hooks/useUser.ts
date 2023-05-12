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
  const mutation = useMutation<SignupResponse, AxiosError, SignupUser>({
    mutationFn: user => signupUser(user),
  });

  return mutation;
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
  return data;
}

export function useLoginMutation() {
  const mutation = useMutation<LoginResponse, AxiosError, LoginUser>({
    mutationFn: user => loginUser(user),
  });

  return mutation;
}

// =====================================================================
// useLogoutMutation query function and hook
// it sends a delete request to the server to delete the cookie
// =====================================================================

async function logoutUser() {
  const { data } = await axios.delete(
    `http://localhost:8000/api/1.0/user/logout`,
    { withCredentials: true }
  );
  console.log(data);
  return data;
}

export function useLogoutMutation() {
  const mutation = useMutation({
    mutationFn: logoutUser,
  });
  return mutation;
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

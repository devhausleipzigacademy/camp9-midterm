import axios, { AxiosError } from 'axios';
import { LoginUser, SignupUser, User } from '../utilities/types';
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

type EditProfileResponse = { token: string };

async function editProfile(user: User) {
  const { data } = await axios.patch<EditProfileResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/editprofile`,
    user,
    { withCredentials: true }
  );
  return data;
}

export function useEditProfileMutation() {
  const mutation = useMutation<EditProfileResponse, AxiosError, User>({
    mutationFn: user => editProfile(user),
  });

  return mutation;
}

const getSingleUser = async () => {
  const { data } = await axios.get<User>(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user`,
    { withCredentials: true }
  );

  return data;
};

export const useGetSingleUser = () => {
  return useQuery<User>(['user'], () => getSingleUser());
};

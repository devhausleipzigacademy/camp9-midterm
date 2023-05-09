import axios, { AxiosError } from 'axios';
import { LoginUser, SignupUser, User } from '../utilities/types';
import { useMutation } from '@tanstack/react-query';
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
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/login`,
    user
  );
  console.log(data);
  return data;
}

export function useLoginMutation() {
  const mutation = useMutation<LoginResponse, AxiosError, LoginUser>({
    mutationFn: user => loginUser(user),
  });

  return mutation;
}

type EditProfileResponse = { token: string };

async function editProfile(user: User) {
  const { data } = await axios.post<EditProfileResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/editprofile`,
    user
  );
  console.log(data);
  return data;
}

export function useEditProfileMutation() {
  const mutation = useMutation<EditProfileResponse, AxiosError, User>({
    mutationFn: user => editProfile(user),
  });

  return mutation;
}

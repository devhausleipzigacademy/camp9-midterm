import React, { useEffect, useState } from 'react';
import SingleInputFieldLogIn from './SingleInputField';
import { LoginUser, loginSchema } from '../utilities/types';
import Button from './Button';
import { useLoginMutation } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type LogInForm = React.FormHTMLAttributes<HTMLFormElement>;

function LogInForm() {
  const { mutate, isLoading, isError, isSuccess } = useLoginMutation();

  const navigate = useNavigate();

  // instead of two way dataBinding use the useForms hook.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: zodResolver(loginSchema),
  });

  if (isSuccess) {
    navigate('/');
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: LoginUser) => {
    mutate(data);
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        <SingleInputFieldLogIn
          error={errors.email}
          svg="email"
          placeholder="E-mail"
          type="text"
          id="email"
          {...register('email')}
        />

        <SingleInputFieldLogIn
          error={errors.password}
          svg="key"
          placeholder="Password"
          type="password"
          id="password"
          {...register('password')}
        />
        <Button type="submit" size="md">
          Log In
        </Button>
      </form>
    </>
  );
}

export default LogInForm;

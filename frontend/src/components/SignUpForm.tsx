import React from 'react';
import SingleInputField from './SingleInputField';
import { useState } from 'react';
import Button from './Button';
import { useLoginMutation, useSignupMutation } from '../hooks/useUser';
import { LoginUser, SignupUser, signUpSchema } from '../utilities/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

type SignUpForm = React.FormHTMLAttributes<HTMLFormElement>;

function SignUpForm() {
  const { mutate, isLoading, isError, isSuccess } = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupUser>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  if (isSuccess) {
    navigate('/');
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: SignupUser) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <SingleInputField
        error={errors.firstName}
        svg="name"
        placeholder="First name"
        type="text"
        id="firstname"
        {...register('firstName')}
      />
      <SingleInputField
        error={errors.lastName}
        placeholder={'Last name'}
        svg={'name'}
        type="text"
        id="lastname"
        {...register('lastName')}
      />
      <SingleInputField
        error={errors.email}
        placeholder={'your@email.com'}
        svg="email"
        type="email"
        id="email"
        {...register('email')}
      />

      <SingleInputField
        error={errors.password}
        placeholder={'Password'}
        svg="key"
        type="password"
        id="password"
        {...register('password')}
      />
      <SingleInputField
        error={errors.confirmPassword}
        placeholder={'Repeat your password'}
        svg="key"
        type="password"
        id="confirmPassword"
        {...register('confirmPassword')}
      />
      <Button type="submit" size="md">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;

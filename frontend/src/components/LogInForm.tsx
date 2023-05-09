import React, { useState } from 'react';
import SingleInputFieldLogIn from './SingleInputField';
import { LoginUser } from '../utilities/types';
import Button from './Button';
import { useLoginMutation } from '../hooks/useUser';

type LogInForm = React.FormHTMLAttributes<HTMLFormElement>;

function LogInForm() {
  const [inputValues, setInputValues] = useState<LoginUser>({
    email: '',
    password: '',
  });

  const { isLoading, isError, data, error, mutate } = useLoginMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(inputValues);
  }

  return (
    <>
      <form
        action=""
        onSubmit={e => handleSubmit(e)}
        noValidate
        className="flex flex-col gap-5"
      >
        <SingleInputFieldLogIn
          svg="email"
          placeholder="email"
          type="text"
          id="email"
          inputValue={inputValues.email}
          setInputValue={e =>
            setInputValues({ ...inputValues, email: e.target.value })
          }
        ></SingleInputFieldLogIn>
        <SingleInputFieldLogIn
          svg="key"
          placeholder="password"
          type="password"
          id="password"
          inputValue={inputValues.password}
          setInputValue={e =>
            setInputValues({ ...inputValues, password: e.target.value })
          }
        ></SingleInputFieldLogIn>
        <Button type="submit" size="md">
          Log In
        </Button>
      </form>
    </>
  );
}

export default LogInForm;

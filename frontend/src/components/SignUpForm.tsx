import React from 'react';
import Checkbox from './Checkbox';
import SingleInputField from './SingleInputField';
import { useState } from 'react';
import Radio from './Radio';
import Button from './Button';
import { useSignupMutation } from '../hooks/useUser';
import { SignupUser } from '../utilities/types';

type SignUpForm = React.FormHTMLAttributes<HTMLFormElement>;

function SignUpForm() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [inputValues, setInputValues] = useState<SignupUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { isLoading, isError, data, error, mutate } = useSignupMutation();
  console.log(data, isLoading, isError, error);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(inputValues);
  }

  return (
    <form onSubmit={e => handleSubmit(e)} noValidate>
      <SingleInputField
        svg="name"
        placeholder="firstname"
        type="text"
        id="firstname"
        inputValue={inputValues.firstName}
        setInputValue={e =>
          setInputValues({ ...inputValues, firstName: e.target.value })
        }
      ></SingleInputField>
      <SingleInputField
        placeholder={'your lastname'}
        svg={'name'}
        type="text"
        id="lastname"
        inputValue={inputValues.lastName}
        setInputValue={e =>
          setInputValues({ ...inputValues, lastName: e.target.value })
        }
      ></SingleInputField>
      <SingleInputField
        placeholder={'your@email.com'}
        svg="email"
        type="email"
        id="email"
        inputValue={inputValues.email}
        setInputValue={e =>
          setInputValues({ ...inputValues, email: e.target.value })
        }
      ></SingleInputField>

      <SingleInputField
        placeholder={'Enter your Password'}
        svg="key"
        type="password"
        id="password"
        inputValue={inputValues.password}
        setInputValue={e =>
          setInputValues({ ...inputValues, password: e.target.value })
        }
      ></SingleInputField>
      <SingleInputField
        placeholder={'Enter your Password'}
        svg="key"
        type="password"
        id="confirmPassword"
        inputValue={inputValues.confirmPassword}
        setInputValue={e =>
          setInputValues({ ...inputValues, confirmPassword: e.target.value })
        }
      ></SingleInputField>
      <div className=" flex flex-row justify-around">
        <div className="flex flex-col">
          <Radio
            name="age"
            label="I'm over 18"
            value="adult"
            checked={selectedOption === 'adult' ? true : false}
            onChange={handleRadioChange}
          ></Radio>
          <Radio
            name="age"
            label="I'm under 18"
            value="child"
            checked={selectedOption === 'child' ? true : false}
            onChange={handleRadioChange}
          ></Radio>
        </div>
        <Checkbox
          label="student"
          name="student"
          checked={isChecked}
          onChange={handleCheckboxChange}
        ></Checkbox>
      </div>
      <Button type="submit" size="md">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;

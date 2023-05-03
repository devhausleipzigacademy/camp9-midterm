import React from 'react';
import Checkbox from './Checkbox';
import SingleInputField from './SingleInputField';
import { useState } from 'react';
import Radio from './Radio';

type SignUpForm = React.FormHTMLAttributes<HTMLFormElement>;

function SignUpForm() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form onSubmit={() => {}}>
      <SingleInputField
        svg={'name'}
        placeholder={'your firstname'}
        type="firstname"
      ></SingleInputField>
      <SingleInputField
        placeholder={'your lastname'}
        svg={'name'}
        type="lastname"
      ></SingleInputField>
      <SingleInputField
        placeholder={'your@email.com'}
        svg={'email'}
        type="email"
      ></SingleInputField>

      <SingleInputField
        placeholder={'Enter your Password'}
        svg={'key'}
        type="password"
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
    </form>
  );
}

export default SignUpForm;

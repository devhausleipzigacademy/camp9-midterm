import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  placeholder: 'your@email.com' | 'Enter your Password';
  svg: 'email' | 'key';
  type: 'email' | 'password';
};

function SingleInputFieldLogIn({ placeholder, svg, type }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  function validateEmail() {
    //to check if the input is in email-format
    const valid = /\S+@\S+\.\S+/;
    const result = valid.test(inputValue);
    if (result === true && type === 'email') {
      setIsEmail(true);
    } else if (result === false && type === 'email') {
      setIsEmail(false);
    }
  }

  return (
    <div className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 mt-5">
      <div className="flex gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white-dimmed "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              svg === 'email'
                ? 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                : 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z'
            }
          />
        </svg>
        <label className="flex">
          <input
            type={type}
            value={inputValue}
            placeholder={placeholder}
            className="bg-dark-light typography-body"
            onChange={e => setInputValue(e.target.value)}
            onInput={validateEmail}
          />
        </label>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={clsx(
          'w-6 h-6 text-green',
          type === 'email' && isEmail === true ? 'block' : 'hidden'
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={clsx(
          'w-6 h-6 text-red',
          type === 'email' && isEmail === false ? 'block' : 'hidden'
        )}
        //if type is email and validate email is false display none, else dsplay block
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
}

export default SingleInputFieldLogIn;

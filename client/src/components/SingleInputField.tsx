import { useState } from 'react';

type Props = {
  placeholder: string;
  svg?: 'email' | 'key' | 'name' | boolean;
  type: 'text' | 'password' | 'email';
  id: string;
  inputValue: string;
  setInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function SingleInputFieldLogIn({
  placeholder,
  svg,
  type,
  id,
  inputValue,
  setInputValue,
}: Props) {
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
                : svg === 'key'
                ? 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z'
                : 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            }
          />
        </svg>
        <label className="flex" htmlFor={id}>
          <input
            id={id}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            className="bg-dark-light typography-body"
            onChange={e => setInputValue(e)}
          />
        </label>
      </div>
    </div>
  );
}

export default SingleInputFieldLogIn;

('M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z');

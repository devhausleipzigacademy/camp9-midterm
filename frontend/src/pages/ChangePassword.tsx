import React from 'react';
import Button from '../components/Button';
import HeaderPage from '../components/HeaderPage';
import SingleInputFieldLogIn from '../components/SingleInputField';

function ChangePassword() {
  return (
    <div>
      <HeaderPage children="Change Password" />
      <div className="flex gap-1 p-2 px-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke=""
          className="w-8 h-8 stroke-white-dimmed"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>

        <h2 className="text-white text-xl ">Passwort</h2>
      </div>
      <hr className="bg-white-dimmed ml-[5%] mr-[5%]" />
      <form className="px-8" action="" onSubmit={() => {}}>
        <h2 className="text-white text-lg pt-4">Passwort</h2>
        <SingleInputFieldLogIn
          placeholder={'Enter your Password'}
          svg={false}
          type="password"
        ></SingleInputFieldLogIn>
        <h2 className="text-white text-lg pt-4 "> New Passwort</h2>
        <SingleInputFieldLogIn
          placeholder={'Enter New Password'}
          svg={false}
          type="password"
        ></SingleInputFieldLogIn>
        <div className="my-8 p-8">
          <Button>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

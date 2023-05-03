import React from 'react';
import SingleInputFieldLogIn from './SingleInputField';

type LogInForm = React.FormHTMLAttributes<HTMLFormElement>;

function LogInForm() {
  return (
    <>
      <form action="" onSubmit={() => {}}>
        <SingleInputFieldLogIn
          placeholder={'your@email.com'}
          svg={'email'}
          type="email"
        ></SingleInputFieldLogIn>

        <SingleInputFieldLogIn
          placeholder={'Enter your Password'}
          svg={'key'}
          type="password"
        ></SingleInputFieldLogIn>
      </form>
    </>
  );
}

export default LogInForm;

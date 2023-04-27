import { useState } from 'react';
import ToggleButton from '../components/ToggleButton';
import LogInForm from '../components/LogInForm';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import SignUpForm from '../components/SignUpForm';

function LogInPage() {
  const [LogInOrSignUp, SetLogInOrSignUp] = useState<'LogIn' | 'SignUp'>(
    'LogIn'
  );

  return (
    <div className="px-5 py-8 h-screen relative flex justify-between flex-col">
      {LogInOrSignUp === 'LogIn' ? (
        <div>
          <h1 className="typography-title">Welcome to Cine-Scape</h1>
          <p className="typography-body pt-3 pb-5">
            You need to log in to be able to make reservations and add movies to
            your watchlist.
          </p>
          <LogInForm></LogInForm>
          <div className="my-10"></div>
          <Link to="/home">
            <Button size="md">Log In</Button>
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="typography-title">Welcome to Cine-Scape</h1>
          <p className="typography-body pt-3 pb-5">
            You need to sign-up to be able to make reservations and add movies
            to your watchlist.
          </p>
          <SignUpForm></SignUpForm>
          <div className="my-10"></div>
          <Button
            type="submit"
            size="md"
            onClick={() => {
              SetLogInOrSignUp('LogIn');
            }}
          >
            Sign Up
          </Button>
        </div>
      )}

      <div className="flex justify-between">
        <ToggleButton
          status={LogInOrSignUp === 'LogIn' ? 'active' : 'passive'}
          onClick={() => {
            SetLogInOrSignUp('LogIn');
          }}
          className="typography-primary"
        >
          Login
        </ToggleButton>
        <ToggleButton
          onClick={() => {
            SetLogInOrSignUp('SignUp');
          }}
          status={LogInOrSignUp === 'SignUp' ? 'active' : 'passive'}
          className="typography-primary"
        >
          Sign Up
        </ToggleButton>
      </div>
    </div>
  );
}

export default LogInPage;

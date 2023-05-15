//  implement that login is not accessible when token exists (user is logged in)

import { Outlet, useNavigate } from 'react-router-dom';
import { useCheckAuthQuery } from '../hooks/useUser';
import { useEffect } from 'react';

export default function LogInLayout() {
  const navigate = useNavigate();
  const { isSuccess, isLoading } = useCheckAuthQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

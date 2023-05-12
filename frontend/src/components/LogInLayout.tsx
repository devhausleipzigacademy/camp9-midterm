//  implement that login is not accessible when token exists (user is logged in)

import { Outlet, useNavigate } from 'react-router-dom';
import { useCheckAuthQuery } from '../hooks/useUser';

export default function LogInLayout() {
  const navigate = useNavigate();
  const { isSuccess, isLoading } = useCheckAuthQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isSuccess) {
    navigate('/');
  }

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

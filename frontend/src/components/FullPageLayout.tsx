import { useCheckAuthQuery } from '../hooks/useUser';
import { Outlet, useNavigate } from 'react-router-dom';

export default function FullPageLayout() {
  // is user loggedIn ?
  // redirect to /login
  const navigate = useNavigate();
  const { isError, isLoading } = useCheckAuthQuery();
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    navigate('/login');
  }

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

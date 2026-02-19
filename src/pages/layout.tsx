import { Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from '@/shared/ui';
import { useEffect } from 'react';
import { getIngredients, useAppDispatch } from '@/app/store';
import { clearAuth } from '@/app/store/slices/user/user.slice';
import { AUTH_SESSION_EXPIRED_EVENT } from '@/shared/api/interceptors';

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    const onSessionExpired = () => {
      dispatch(clearAuth());
      navigate('/login', { replace: true });
    };
    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, onSessionExpired);
    return () =>
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, onSessionExpired);
  }, [dispatch, navigate]);

  return (
    <div className="app">
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default RootLayout;

import type { FC, ReactNode } from 'react';
import { getCookie } from '@/entities/user/auth/utils';
import { Navigate, useLocation } from 'react-router-dom';
import { getItem } from '@/shared/utils';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { AppHeader } from '@/shared/ui';

type TProps = {
  children: ReactNode;
  auth: boolean;
};

const ProtectedLayout: FC<TProps> = ({ children, auth }) => {
  const location = useLocation();

  const accessToken = getCookie(ACCESS_TOKEN_KEY);
  const refreshToken = getItem<string>(REFRESH_TOKEN_KEY);
  const isAuthenticated = Boolean(accessToken || refreshToken);

  if (auth) {
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return (
      <>
        <AppHeader />
        {children}
      </>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedLayout;

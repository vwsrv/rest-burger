import type { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Main } from '@/pages';

const isIngredientDetailsPath = (pathname: string): boolean =>
  /^\/ingredients\/[^/]+$/.test(pathname);

export const MainLayout: FC = () => {
  const location = useLocation();
  const isDirectIngredientPage =
    isIngredientDetailsPath(location.pathname) && !location.state?.backgroundLocation;

  if (isDirectIngredientPage) {
    return <Outlet />;
  }

  return (
    <>
      <Main />
      <Outlet />
    </>
  );
};

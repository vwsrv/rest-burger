import type { FC } from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, wsConnect, wsDisconnect } from '@/app/store';
import { getUrl } from '@/app/store/slices/order-feed';
import { FeedPage } from '@/pages';

const isFeedOrderDetailsPath = (pathname: string): boolean =>
  /^\/feed\/[^/]+$/.test(pathname);

export const FeedLayout: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isDirectOrderPage =
    isFeedOrderDetailsPath(location.pathname) && !location.state?.backgroundLocation;

  useEffect(() => {
    if (isDirectOrderPage) {
      dispatch(wsConnect(getUrl({ type: 'all' })));
      return () => {
        dispatch(wsDisconnect());
      };
    }
  }, [isDirectOrderPage, dispatch]);

  if (isDirectOrderPage) {
    return <Outlet />;
  }

  return (
    <>
      <FeedPage />
      <Outlet />
    </>
  );
};

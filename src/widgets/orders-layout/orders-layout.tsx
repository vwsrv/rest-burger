import type { FC } from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, wsConnect, wsDisconnect } from '@/app/store';
import { getUrl } from '@/app/store/slices/order-feed';
import Orders from '../orders';

const isProfileOrderDetailsPath = (pathname: string): boolean =>
  /^\/profile\/orders\/[^/]+$/.test(pathname);

type TProps = {
  ordersType: 'all' | 'user';
};

export const OrdersLayout: FC<TProps> = ({ ordersType }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isDirectOrderPage =
    isProfileOrderDetailsPath(location.pathname) && !location.state?.backgroundLocation;

  useEffect(() => {
    if (isDirectOrderPage && ordersType === 'user') {
      const url = getUrl({ type: 'user' });
      if (url) {
        dispatch(wsConnect(url));
        return () => {
          dispatch(wsDisconnect());
        };
      }
    }
  }, [isDirectOrderPage, ordersType, dispatch]);

  if (isDirectOrderPage) {
    return <Outlet />;
  }

  return (
    <>
      <Orders ordersType={ordersType} />
      <Outlet />
    </>
  );
};

import type { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LeftSide, RightSide } from '@/widgets';
import { useAppDispatch } from '@/app/store';
import { logoutUserThunk } from '@/app/store/slices/user';
import { REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { getItem } from '@/shared/utils';
import styles from './profile.module.css';
import { ProfileNav } from '@/features';

const isProfileOrderDetailsPath = (pathname: string): boolean =>
  /^\/profile\/orders\/[^/]+$/.test(pathname);

const ProfilePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isDirectOrderPage =
    isProfileOrderDetailsPath(location.pathname) && !location.state?.backgroundLocation;

  const getProfileDescription = (pathname: string): ReactNode | undefined => {
    if (pathname === '/profile') {
      return (
        <>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </>
      );
    }
    if (pathname === '/profile/orders' || pathname.startsWith('/profile/orders/')) {
      return (
        <>
          В этом разделе вы можете
          <br />
          просмотреть свою историю заказов
        </>
      );
    }
    return undefined;
  };

  const description = getProfileDescription(location.pathname);

  const handleLogout = () => {
    const token = getItem<string>(REFRESH_TOKEN_KEY);
    if (!token) return;
    dispatch(logoutUserThunk({ token }))
      .unwrap()
      .then(() => {
        navigate('/login');
      });
  };

  if (isDirectOrderPage) {
    return (
      <main className={styles.profile}>
        <Outlet />
      </main>
    );
  }

  return (
    <main className={styles.profile}>
      <div className={styles.profileLayout}>
        <div className={styles.profileLeftSide}>
          <LeftSide>
            <ProfileNav description={description} onLogout={handleLogout} />
          </LeftSide>
        </div>
        <RightSide>
          <Outlet />
        </RightSide>
      </div>
    </main>
  );
};

export default ProfilePage;

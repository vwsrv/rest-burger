import type { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProfileNav } from '@/features/profile-nav';
import { LeftSide, RightSide } from '@/widgets';
import { useAppDispatch } from '@/app/store';
import { logoutUserThunk } from '@/app/store/slices/user';
import { REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { getItem } from '@/shared/utils';
import styles from './profile.module.css';

const ProfilePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getProfileDescription = (pathname: string): ReactNode | undefined => {
    switch (pathname) {
      case '/profile':
        return (
          <>
            В этом разделе вы можете
            <br />
            изменить свои персональные данные
          </>
        );
      case '/profile/orders':
        return (
          <>
            В этом разделе вы можете
            <br />
            просмотреть свою историю заказов
          </>
        );
      default:
        return undefined;
    }
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

  return (
    <main className={styles.profile}>
      <div className={styles.profileLayout}>
        <LeftSide>
          <ProfileNav description={description} onLogout={handleLogout} />
        </LeftSide>
        <div className={styles.profileRightScroll}>
          <RightSide>
            <Outlet />
          </RightSide>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

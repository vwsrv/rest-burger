import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile-nav.module.css';

type TProfileNavProps = {
  description?: ReactNode;
  onLogout?: () => void;
};

const ProfileNav: FC<TProfileNavProps> = ({ description, onLogout }) => {
  return (
    <>
      <nav className={styles.profileNav}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? 'text_color_active' : 'text_color_inactive'}`
          }
        >
          <p>Профиль</p>
        </NavLink>

        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? 'text_color_active' : 'text_color_inactive'}`
          }
        >
          <p>История заказов</p>
        </NavLink>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `text text_type_main-medium ${isActive ? 'text_color_active' : 'text_color_inactive'}`
          }
          onClick={onLogout}
        >
          <p>Выход</p>
        </NavLink>
      </nav>

      {description != null && (
        <p
          className={`text text_type_main-default text_color_inactive ${styles.profileNavDescription}`}
        >
          {description}
        </p>
      )}
    </>
  );
};

export default ProfileNav;

import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '@krgaa/react-developer-burger-ui-components';
import { UIEmailInput, UIPasswordInput } from '@/shared/ui';
import styles from './profile-form.module.css';

const ProfileForm: FC = () => {
  return (
    <div className={styles.profile}>
      <div>
        <nav className={styles.profileNav}>
          <NavLink
            to="/profile"
            className={`text text_type_main-medium text_color_inactive`}
          >
            <p>Профиль</p>
          </NavLink>

          <NavLink
            to="/orders"
            className={`text text_type_main-medium text_color_inactive `}
          >
            <p>История заказов</p>
          </NavLink>

          <NavLink
            to="/logout"
            className={`text text_type_main-medium text_color_inactive`}
          >
            <p>Выход</p>
          </NavLink>
        </nav>

        <p
          className={`text text_type_main-default text_color_inactive ${styles.profileNavDescription}`}
        >
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </div>

      <div className={styles.profileForm}>
        <Input
          value={''}
          placeholder="Имя"
          onChange={(e) => e.target.value}
          icon="EditIcon"
        />

        <UIEmailInput
          value={''}
          placeholder="Логин"
          onChange={(e) => e.target.value}
          isIcon={true}
        />

        <UIPasswordInput
          value={''}
          placeholder="Пароль"
          onChange={(e) => e.target.value}
          icon="EditIcon"
        />
      </div>
    </div>
  );
};

export default ProfileForm;

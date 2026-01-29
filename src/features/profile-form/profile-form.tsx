import { type FC, type FormEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input } from '@krgaa/react-developer-burger-ui-components';
import { UIButton, UIEmailInput, UIPasswordInput } from '@/shared/ui';
import styles from './profile-form.module.css';
import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  clearError,
  editUserInfoThink,
  getUserInfoThunk,
  logoutUserThunk,
} from '@/app/store/slices/user';
import { REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { getItem, getErrorMessage } from '@/shared/utils';
import type { TUserInfoRequest } from '@/entities/user/profile/models/types';
import { profileSchema } from '@/shared/validation/schemas';
import type { ValidationError } from 'yup';

const ProfileForm: FC = () => {
  const { user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isFormValid = profileSchema.isValidSync(profileForm);

  const [validationError, setValidationError] = useState<string>('');

  const updated = useMemo<TUserInfoRequest>(() => {
    if (!user) return {};

    return {
      ...(profileForm.name !== user.name && { name: profileForm.name }),
      ...(profileForm.email !== user.email && { email: profileForm.email }),
      ...(profileForm.password && { password: profileForm.password }),
    };
  }, [profileForm, user]);

  const isFieldsEdit = Object.keys(updated).length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    profileSchema
      .validate(updated, { abortEarly: false })
      .then(() => {
        setValidationError('');
        dispatch(editUserInfoThink(updated))
          .unwrap()
          .then(() => {
            setProfileForm((prev) => ({
              ...prev,
              password: '',
            }));
          });
      })
      .catch((err: ValidationError) => {
        setValidationError(getErrorMessage(err));
      });
  };

  const handleLogout = () => {
    const token = getItem<string>(REFRESH_TOKEN_KEY);

    if (!token) {
      return;
    }

    dispatch(logoutUserThunk({ token }))
      .unwrap()
      .then(() => {
        navigate('/login');
      });
  };

  const handleCancel = () => {
    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
    setValidationError('');
  };

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUserInfoThunk());

    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <div className={styles.profile}>
      <aside>
        <nav className={styles.profileNav}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text text_type_main-medium ${isActive ? 'text_color_active' : 'text_color_inactive'}`
            }
          >
            <p>Профиль</p>
          </NavLink>

          <NavLink
            to="/orders"
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
            onClick={handleLogout}
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
      </aside>

      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <Input
          value={profileForm.name}
          placeholder="Имя"
          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
          icon="EditIcon"
        />

        <UIEmailInput
          value={profileForm.email}
          placeholder="Логин"
          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
          isIcon={true}
        />

        <UIPasswordInput
          value={profileForm.password}
          placeholder="Пароль"
          onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
          icon="EditIcon"
        />

        {(error || validationError) && (
          <p className="text text_type_main-default text_color_error">
            {validationError || error}
          </p>
        )}

        <div className={styles.buttons}>
          <UIButton
            type="none"
            size="medium"
            htmlType="button"
            onClick={handleCancel}
            disabled={!isFieldsEdit}
            className={`text text_type_main-default text_color_inactive ${styles.cancelButton}`}
          >
            Отмена
          </UIButton>

          <UIButton
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={!isFormValid || loading}
          >
            {loading ? 'Сохраняем...' : 'Сохранить'}
          </UIButton>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

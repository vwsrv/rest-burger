import { type FC, type FormEvent, useLayoutEffect, useMemo, useState } from 'react';
import { Input } from '@krgaa/react-developer-burger-ui-components';
import { UIButton, UIEmailInput, UIPasswordInput } from '@/shared/ui';
import styles from './profile-form.module.css';
import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  clearError,
  editUserInfoThink,
  getUserInfoThunk,
} from '@/app/store/slices/user';
import { getErrorMessage } from '@/shared/utils';
import type { TUserInfoRequest } from '@/entities/user/profile/models/types';
import { profileSchema } from '@/shared/validation/schemas';
import type { ValidationError } from 'yup';

const ProfileForm: FC = () => {
  const { user, saving, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState<string>('');

  const updated = useMemo<TUserInfoRequest>(() => {
    if (!user) return {};

    return {
      ...(profileForm.name !== user.name && { name: profileForm.name }),
      ...(profileForm.email !== user.email && { email: profileForm.email }),
      ...(profileForm.password && { password: profileForm.password }),
    };
  }, [profileForm, user]);

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

  const hasChanges =
    profileForm.name !== user?.name ||
    profileForm.email !== user?.email ||
    profileForm.password !== '';

  const isFormValid = profileSchema.isValidSync(profileForm);

  useLayoutEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user]);

  useLayoutEffect(() => {
    dispatch(getUserInfoThunk());

    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
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

      {hasChanges && (
        <div className={styles.buttons}>
          <UIButton
            type="none"
            size="medium"
            htmlType="button"
            onClick={handleCancel}
            disabled={isFormValid}
            className={`text text_type_main-default text_color_inactive ${styles.cancelButton}`}
          >
            Отмена
          </UIButton>

          <UIButton
            type="primary"
            size="medium"
            htmlType="submit"
            disabled={!hasChanges || saving}
          >
            {saving ? 'Сохраняем...' : 'Сохранить'}
          </UIButton>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;

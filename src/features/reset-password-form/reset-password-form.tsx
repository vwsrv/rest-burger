import { type FC, type FormEvent, useEffect, useState } from 'react';
import { UIButton, UIPasswordInput } from '@/shared/ui';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './reset-password-form.module.css';
import { clearError, resetPasswordThunk } from '@/app/store/slices/user';
import { useAppDispatch, useAppSelector } from '@/app/store';

const ResetPasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);

  const [passwordForm, setPassword] = useState({
    password: '',
    token: '',
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordForm.password || !passwordForm.token) {
      return;
    }

    dispatch(
      resetPasswordThunk({ password: passwordForm.password, token: passwordForm.token })
    ).then((result) => {
      if (resetPasswordThunk.fulfilled.match(result)) {
        navigate('/login');
      }
    });
  };

  return (
    <div className={styles.resetPassword}>
      <form className={styles.resetPasswordForm} onSubmit={handleSubmit} noValidate>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>

        <UIPasswordInput
          value={passwordForm.password}
          onChange={(e) => setPassword({ ...passwordForm, password: e.target.value })}
          icon="ShowIcon"
          placeholder="Введите новый пароль"
        />

        <UIPasswordInput
          value={passwordForm.token}
          onChange={(e) => setPassword({ ...passwordForm, token: e.target.value })}
          icon="ShowIcon"
          placeholder="Введите код из письма"
        />

        {error && (
          <p className="text text_type_main-default text_color_error">{error}</p>
        )}

        <UIButton type="primary" size="medium" htmlType="submit" disabled={loading}>
          {loading ? 'Сохраняем...' : 'Сохранить'}
        </UIButton>
      </form>

      <nav className={styles.resetPasswordLinks}>
        <div className={styles.resetPasswordLink}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <NavLink to="/login" className="text text_type_main-default">
            Войти
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default ResetPasswordForm;

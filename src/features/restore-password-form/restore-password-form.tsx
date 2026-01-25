import { type FC, type FormEvent, useEffect, useState } from 'react';
import { UIButton, UIEmailInput } from '@/shared/ui';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './restore-password-form.module.css';
import { clearError, restorePasswordThunk } from '@/app/store/slices/user';
import { useAppDispatch, useAppSelector } from '@/app/store';

const RestorePasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    dispatch(restorePasswordThunk({ email })).then((result) => {
      if (restorePasswordThunk.fulfilled.match(result)) {
        navigate('/reset-password');
      }
    });
  };

  return (
    <div className={styles.restorePassword}>
      <form className={styles.restorePasswordForm} onSubmit={handleSubmit} noValidate>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>

        <UIEmailInput
          value={email}
          size="default"
          placeholder="Укажите e-mail"
          isIcon={false}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && (
          <p className="text text_type_main-default text_color_error">{error}</p>
        )}

        <UIButton type="primary" size="medium" htmlType="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Восстановить'}
        </UIButton>
      </form>

      <nav className={styles.restorePasswordLinks}>
        <div className={styles.restorePasswordLink}>
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

export default RestorePasswordForm;

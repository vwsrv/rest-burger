import { type FC, useState } from 'react';
import { UIButton, UIEmailInput, UIPasswordInput } from '@/shared/ui';
import { NavLink } from 'react-router-dom';
import styles from './login-form.module.css';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { clearError, loginUserThunk } from '@/app/store/slices/user';

const LoginForm: FC = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (): void => {
    dispatch(loginUserThunk(loginForm))
      .unwrap()
      .then(() => {
        dispatch(clearError());
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <h1 className="text text_type_main-medium">Вход</h1>

        <UIEmailInput
          value={loginForm.email}
          size="default"
          placeholder="E-mail"
          isIcon={false}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        />

        <UIPasswordInput
          value={loginForm.password}
          size="default"
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          placeholder="Пароль"
          icon="ShowIcon"
        />

        {error && (
          <p className="text text_type_main-default text_color_error">
            При попытке входа произошла ошибка
          </p>
        )}

        <UIButton type="primary" size="medium" onClick={handleSubmit} htmlType="submit">
          {loading ? 'Вход...' : 'Войти'}
        </UIButton>
      </div>

      <div className={styles.loginLinks}>
        <div className={styles.loginLink}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <NavLink to="/register" className="text text_type_main-default">
            Зарегистрироваться
          </NavLink>
        </div>

        <div className={styles.loginLink}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <NavLink to="/forgot-password" className="text text_type_main-default">
            Восстановить пароль
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

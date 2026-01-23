import { type FC, type FormEvent, useState } from 'react';
import { UIButton, UIEmailInput, UIPasswordInput } from '@/shared/ui';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './login-form.module.css';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { clearError, loginUserThunk } from '@/app/store/slices/user';
import { loginSchema } from '@/shared/validation/schemas';
import type { ValidationError } from 'yup';

const LoginForm: FC = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const { loading, error } = useAppSelector((state) => state.user);
  const isFormValid = loginSchema.isValidSync(loginForm);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    loginSchema
      .validate(loginForm, { abortEarly: false })
      .then(() => {
        setValidationError('');
        dispatch(loginUserThunk(loginForm))
          .unwrap()
          .then(() => {
            dispatch(clearError());
            navigate('/');
          });
      })
      .catch((err: ValidationError) => {
        const errorMessages = err.inner
          .map((error: ValidationError) => error.message)
          .join(', ');
        setValidationError(errorMessages);
      });
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
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

        {(error || validationError) && (
          <p className="text text_type_main-default text_color_error">
            {validationError || error}
          </p>
        )}

        <UIButton
          type="primary"
          size="medium"
          htmlType="submit"
          disabled={!isFormValid || loading}
        >
          {loading ? 'Вход...' : 'Войти'}
        </UIButton>
      </form>

      <nav className={styles.loginLinks}>
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
      </nav>
    </div>
  );
};

export default LoginForm;

import { type FC, type FormEvent, useState } from 'react';
import { UIButton, UIEmailInput, UIPasswordInput } from '@/shared/ui';
import { Input } from '@krgaa/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './register-form.module.css';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { clearError, registerUserThunk } from '@/app/store/slices/user';
import { registerSchema } from '@/shared/validation/schemas';
import type { ValidationError } from 'yup';

const RegisterForm: FC = () => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const isFormValid = registerSchema.isValidSync(registerForm);

  const { error, loading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    registerSchema.validate(registerForm, { abortEarly: false }).then(() => {
      setValidationError('');
      dispatch(registerUserThunk(registerForm))
        .unwrap()
        .then(() => {
          dispatch(clearError());
          navigate('/');
        })
        .catch((err: ValidationError) => {
          const errorMessages = err.inner
            .map((err: ValidationError) => err.message)
            .join(' ');
          setValidationError(errorMessages);
        });
    });
  };

  return (
    <div className={styles.register}>
      <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
        <h1 className="text text_type_main-medium">Регистрация</h1>

        <Input
          value={registerForm.name}
          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
          size="default"
          placeholder="Имя"
        />

        <UIEmailInput
          value={registerForm.email}
          size="default"
          placeholder="E-mail"
          isIcon={false}
          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
        />

        <UIPasswordInput
          value={registerForm.password}
          size="default"
          onChange={(e) =>
            setRegisterForm({ ...registerForm, password: e.target.value })
          }
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
          disabled={!isFormValid || loading}
          htmlType="submit"
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </UIButton>
      </form>

      <nav className={styles.registerLinks}>
        <div className={styles.registerLink}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <NavLink to="/login" className="text text_type_main-default">
            Войти
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default RegisterForm;

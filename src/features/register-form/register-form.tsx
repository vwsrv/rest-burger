import type { FC } from 'react';
import { UIButton, UIEmailInput, UIPasswordInput } from '@/shared/ui';
import { Input } from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './register-form.module.css';

const RegisterForm: FC = () => {
  return (
    <div className={styles.register}>
      <div className={styles.registerForm}>
        <h1 className="text text_type_main-medium">Регистрация</h1>

        <Input
          value={''}
          onChange={(e) => e.target.value}
          size="default"
          placeholder="Имя"
        />

        <UIEmailInput
          value={''}
          size="default"
          placeholder="E-mail"
          isIcon={false}
          onChange={(e) => e.target.value}
        />

        <UIPasswordInput
          value={''}
          size="default"
          onChange={(e) => e.target.value}
          placeholder="Пароль"
          icon="ShowIcon"
        />

        <UIButton
          type="primary"
          size="medium"
          onClick={() => console.log('register')}
          htmlType="submit"
        >
          Зарегистрироваться
        </UIButton>
      </div>

      <div className={styles.registerLinks}>
        <div className={styles.registerLink}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <NavLink to="/login" className="text text_type_main-default">
            Войти
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

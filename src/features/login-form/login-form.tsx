import type { FC } from 'react';
import { UIButton, UIEmailInput, UIPasswordInput } from '@/shared/ui';
import { NavLink } from 'react-router-dom';
import styles from './login-form.module.css';

const LoginForm: FC = () => {
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <h1 className="text text_type_main-medium">Вход</h1>

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
          onClick={() => console.log('save')}
          htmlType="submit"
        >
          Войти
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

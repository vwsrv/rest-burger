import { type FC, useEffect } from 'react';
import { UIButton, UIEmailInput, UIPasswordInput } from '@/shared/ui';
import { NavLink } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { clearError } from '@/app/store/slices/user';
import { useAppDispatch } from '@/app/store';

type TProps = {
  exists: boolean;
};

const ForgotPasswordForm: FC<TProps> = ({ exists }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <div className={styles.forgotPassword}>
      <form className={styles.forgotPasswordForm}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>

        {exists ? (
          <UIEmailInput
            value={''}
            size="default"
            placeholder="Укажите e-mail"
            isIcon={false}
            onChange={(e) => e.target.value}
          />
        ) : (
          <>
            <UIPasswordInput
              value={''}
              onChange={(e) => e.target.value}
              icon="ShowIcon"
            />
            <UIPasswordInput
              value={''}
              onChange={(e) => e.target.value}
              icon="ShowIcon"
            />
          </>
        )}

        <UIButton
          type="primary"
          size="medium"
          onClick={() => console.log('save')}
          htmlType="submit"
        >
          Сохранить
        </UIButton>
      </form>
      <nav className={styles.forgotPasswordLinks}>
        <div className={styles.forgotPasswordLink}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <NavLink to="/forgot-password" className="text text_type_main-default">
            Войти
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default ForgotPasswordForm;

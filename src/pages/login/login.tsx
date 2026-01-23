import type { FC } from 'react';
import LoginForm from '@/features/login-form/login-form.tsx';
import styles from './login.module.css';

const Login: FC = () => {
  return (
    <main className={styles.login}>
      <LoginForm />
    </main>
  );
};

export default Login;

import type { FC } from 'react';
import styles from './login-page.module.css';
import { LoginForm } from '@/features';

const Login: FC = () => {
  return (
    <main className={styles.login}>
      <LoginForm />
    </main>
  );
};

export default Login;

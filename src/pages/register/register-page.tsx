import type { FC } from 'react';
import styles from './register-page.module.css';
import { RegisterForm } from '@/features';

const Register: FC = () => {
  return (
    <main className={styles.register}>
      <RegisterForm />
    </main>
  );
};

export default Register;

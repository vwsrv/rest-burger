import type { FC } from 'react';
import RegisterForm from '@/features/register-form/register-form.tsx';
import styles from './register.module.css';

const Register: FC = () => {
  return (
    <main className={styles.register}>
      <RegisterForm />
    </main>
  );
};

export default Register;

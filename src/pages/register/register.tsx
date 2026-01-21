import type { FC } from 'react';
import RegisterForm from '@/features/register-form/register-form.tsx';
import styles from './register.module.css';

const Register: FC = () => {
  return (
    <div className={styles.register}>
      <RegisterForm />
    </div>
  );
};

export default Register;

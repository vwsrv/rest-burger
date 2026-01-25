import type { FC } from 'react';
import styles from './forgot-password.module.css';
import RestorePasswordForm from '@/features/restore-password-form';

const ForgotPassword: FC = () => {
  return (
    <main className={styles.forgotPassword}>
      <RestorePasswordForm />
    </main>
  );
};

export default ForgotPassword;

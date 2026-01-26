import type { FC } from 'react';
import ResetPasswordForm from '@/features/reset-password-form';
import styles from './reset-password.module.css';

const ResetPassword: FC = () => {
  return (
    <main className={styles.resetPassword}>
      <ResetPasswordForm />
    </main>
  );
};

export default ResetPassword;

import type { FC } from 'react';
import styles from './forgot-password.module.css';
import ForgotPasswordForm from '@/features/forgot-password-form/forgot-password-form';

const ForgotPassword: FC = () => {
  return (
    <main className={styles.forgotPassword}>
      <ForgotPasswordForm exists={false} />
    </main>
  );
};

export default ForgotPassword;

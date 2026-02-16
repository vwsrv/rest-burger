import type { FC } from 'react';
import styles from './reset-password-page.module.css';
import { ResetPasswordForm } from '@/features';

const ResetPassword: FC = () => {
  return (
    <main className={styles.resetPassword}>
      <ResetPasswordForm />
    </main>
  );
};

export default ResetPassword;

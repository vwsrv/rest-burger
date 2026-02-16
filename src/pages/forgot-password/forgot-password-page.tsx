import type { FC } from 'react';
import styles from './forgot-password-page.module.css';
import { RestorePasswordForm } from '@/features';

const ForgotPassword: FC = () => {
  return (
    <main className={styles.forgotPassword}>
      <RestorePasswordForm />
    </main>
  );
};

export default ForgotPassword;

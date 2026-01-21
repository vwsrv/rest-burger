import type { FC } from 'react';
import styles from './forgot-password.module.css';
import ForgotPasswordForm from '@/features/forgot-password-form/forgot-password-form.tsx';

const ForgotPassword: FC = () => {
  return (
    <div className={styles.forgotPassword}>
      <ForgotPasswordForm exists={false} />
    </div>
  );
};

export default ForgotPassword;

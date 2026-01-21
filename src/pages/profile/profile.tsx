import type { FC } from 'react';
import ProfileForm from '@/features/profile-form/profile-form.tsx';
import styles from './profile.module.css';

const Profile: FC = () => {
  return (
    <div className={styles.profile}>
      <ProfileForm />
    </div>
  );
};

export default Profile;

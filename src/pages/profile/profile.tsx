import type { FC } from 'react';
import ProfileForm from '@/features/profile-form/profile-form.tsx';
import styles from './profile.module.css';

const Profile: FC = () => {
  return (
    <main className={styles.profile}>
      <ProfileForm />
    </main>
  );
};

export default Profile;

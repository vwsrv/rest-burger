import type { FC } from 'react';
import styles from './right-side.module.css';
import { BurgerConstructor, PayOrder } from '@/features';

export const RightSide: FC = () => {
  return (
    <aside className={styles.right__side}>
      <BurgerConstructor />

      <PayOrder />
    </aside>
  );
};

import type { FC } from 'react';
import styles from './right-side.module.css';

import { BurgerConstructor } from '@/features/burger-constructor/burger-constructor.tsx';
import PayOrder from '@/features/pay-order/pay-order.tsx';

export const RightSide: FC = () => {
  return (
    <aside className={styles.right__side}>
      <BurgerConstructor />

      <PayOrder />
    </aside>
  );
};

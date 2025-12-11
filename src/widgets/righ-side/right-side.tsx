import type { FC } from 'react';
import styles from './right-side.module.css';

import { BurgerConstructor } from '@/features/burger-constructor/burger-constructor.tsx';

export const RightSide: FC = () => {
  return (
    <section className={styles.burger_ingredients}>
      <BurgerConstructor />
    </section>
  );
};

import type { FC } from 'react';
import styles from './left-side.module.css';
import { BurgerIngredients } from '@/features';

export const LeftSide: FC = () => {
  return (
    <aside className={styles.left__side}>
      <BurgerIngredients />
    </aside>
  );
};

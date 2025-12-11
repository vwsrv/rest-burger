import type { FC } from 'react';
import styles from './left-side.module.css';
import { BurgerIngredients } from '@/features/burger-ingredients/burger-ingredients.tsx';

export const LeftSide: FC = () => {
  return (
    <section className={styles.burger_constructor}>
      <BurgerIngredients />
    </section>
  );
};

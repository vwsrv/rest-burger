import type { FC } from 'react';
import styles from './ingredients-content.module.css';
import { BurgerIngredients } from '@/features';

const IngredientsContent: FC = () => {
  return (
    <aside className={styles.left__side}>
      <BurgerIngredients />
    </aside>
  );
};

export default IngredientsContent;

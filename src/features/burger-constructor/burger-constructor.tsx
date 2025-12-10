import type { IngredientDTO } from '@/entities/ingridients/models/dto';
import styles from './burger-constructor.module.css';
import type { FC } from 'react';

type TProps = {
  ingredients: IngredientDTO[];
};

export const BurgerConstructor: FC<TProps> = ({ ingredients }) => {
  console.log(ingredients);

  return <section className={styles.burger_constructor}></section>;
};

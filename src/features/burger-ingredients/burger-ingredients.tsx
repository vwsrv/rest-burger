import type { IngredientDTO } from '@/entities/ingridients/models/dto';
import styles from './burger-ingredients.module.css';
import { UITab } from '@/shared/ui/tab';
import type { FC } from 'react';

type TProps = {
  ingredients: IngredientDTO[];
};

export const BurgerIngredients: FC<TProps> = ({ ingredients }) => {
  console.log(ingredients);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <UITab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </UITab>
          <UITab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </UITab>
          <UITab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </UITab>
        </ul>
      </nav>
    </section>
  );
};

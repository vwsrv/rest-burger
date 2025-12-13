import { type FC, useEffect, useState } from 'react';
import BurgerTabs from '@/features/burger-ingredients/ui/tabs/tabs.tsx';
import {
  getIngredientsData,
  tabsTuple,
  type TIngredientGroup,
} from '@/entities/ingridients';
import { UICard } from '@/shared/ui/card';
import { UIBox } from '@/shared/ui/box';
import styles from './burger-ingredients.module.css';
import { groupIngredients } from '@/entities/ingridients/utils/group-ingredients.util.ts';

export const BurgerIngredients: FC = () => {
  const [ingredients, setIngredients] = useState<TIngredientGroup[]>([]);

  useEffect(() => {
    void getIngredientsData().then(groupIngredients).then(setIngredients);
  }, []);

  return (
    <div className={styles.burger_ingredients}>
      <BurgerTabs tabs={tabsTuple} onClick={() => console.log('click')} />

      <UIBox className={styles.cards}>
        {ingredients.map((group) => (
          <div key={group.type}>
            <h2 className={`text text_type_main-large ${styles.ingredients__title}`}>
              {group.label}
            </h2>

            <div className={styles.card__list}>
              {group.items.map((ingredient) => (
                <UICard
                  key={`ingredient_card_${ingredient.id}`}
                  image={ingredient.image}
                  cost={ingredient.price}
                  count={3}
                  title={ingredient.name}
                  currencyTheme="primary"
                />
              ))}
            </div>
          </div>
        ))}
      </UIBox>
    </div>
  );
};

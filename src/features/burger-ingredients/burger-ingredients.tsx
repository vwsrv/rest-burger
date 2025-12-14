import { type FC, useEffect, useMemo, useState } from 'react';
import { BurgerTabs, IngredientsDetailsModal } from './ui';
import {
  getIngredientsData,
  tabsTuple,
  type TIngredientGroup,
} from '@/entities/ingridients';
import styles from './burger-ingredients.module.css';
import { groupIngredients } from '@/entities/ingridients/utils/group-ingredients.util.ts';
import { UIBox, UICard } from '@/shared/ui';

export const BurgerIngredients: FC = () => {
  const [ingredients, setIngredients] = useState<TIngredientGroup[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const selectIngredient = useMemo(() => {
    if (!selected) {
      return null;
    }

    return (
      ingredients.flatMap((group) => group.items).find((item) => item.id === selected) ??
      null
    );
  }, [ingredients, selected]);

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
                  onClick={() => setSelected(ingredient.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </UIBox>

      <IngredientsDetailsModal
        ingredient={selectIngredient}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

import styles from './burger-constructor.module.css';
import { type FC, useEffect, useState } from 'react';
import { getIngredientsData, type TIngredientGroup } from '@/entities/ingridients';
import { groupIngredients } from '@/entities/ingridients/utils/group-ingredients.util.ts';
import { DragIcon } from '@krgaa/react-developer-burger-ui-components';
import { UIBox, UIConstructorElement } from '@/shared/ui';

export const BurgerConstructor: FC = () => {
  const [ingredients, setIngredients] = useState<TIngredientGroup[]>([]);

  useEffect(() => {
    void getIngredientsData().then(groupIngredients).then(setIngredients);
  }, []);

  const bunGroup = ingredients.find((group) => group.type === 'bun');
  const bun = bunGroup?.items[0];
  const fillings = ingredients.filter((group) => group.type !== 'bun');

  return (
    <UIBox className={styles.burger_constructor}>
      {bun && (
        <UIBox className={styles.but__item}>
          <UIConstructorElement
            text={`${bun.name} (верх)`}
            price={Number(bun.price)}
            image={bun.image}
            type="top"
            isLocked
          />
        </UIBox>
      )}

      <UIBox className={styles.fillings__list}>
        {fillings.map((group) =>
          group.items.map((item) => (
            <UIBox className={styles.fillings__item} key={`fillings_item_${item.id}`}>
              <DragIcon type="primary" />

              <UIConstructorElement
                key={item.id}
                text={item.name}
                price={Number(item.price)}
                image={item.image}
                handleClose={() => console.log('remove', item.id)}
              />
            </UIBox>
          ))
        )}
      </UIBox>

      {bun && (
        <UIBox className={styles.but__item}>
          <UIConstructorElement
            text={`${bun.name} (низ)`}
            price={Number(bun.price)}
            image={bun.image}
            type="bottom"
            isLocked
          />
        </UIBox>
      )}
    </UIBox>
  );
};

import styles from './burger-constructor.module.css';
import type { FC } from 'react';
import { useDrop } from 'react-dnd';
import { UIBox, UIConstructorElement } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  addIngredient,
  moveIngredient,
  removeIngredient,
  setBun,
} from '@/app/store/slices/burger-constructor/burger-constructor.slice.ts';
import type { TIngredientItem } from '@/entities/ingridients';
import { ConstructorItem } from './ui/constructor-item';
import { Placeholder } from './ui/placeholder';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const constructorState = useAppSelector((state) => state.burgerConstructor);
  const bun = constructorState.bun;
  const items = constructorState.items;

  const [_, dropRef] = useDrop(
    () => ({
      accept: 'ingredient',
      drop: (item: TIngredientItem) => {
        if (item.type === 'bun') {
          dispatch(setBun(item));
          return;
        }

        dispatch(addIngredient(item));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [dispatch]
  );

  return (
    <UIBox
      ref={(node: HTMLDivElement | null) => {
        dropRef(node);
      }}
      className={styles.burger_constructor}
    >
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
        {!bun ? (
          <Placeholder text="Перетащите булки из левого контейнера" />
        ) : items?.length ? (
          items.map((item, index) => (
            <ConstructorItem
              key={`fillings_item_${item.id}_${index}`}
              item={item}
              index={index}
              onRemove={(idx) => dispatch(removeIngredient(idx))}
              onMove={(from, to) => dispatch(moveIngredient({ from, to }))}
            />
          ))
        ) : (
          <Placeholder text="Перетащите начинку из левого контейнера" />
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

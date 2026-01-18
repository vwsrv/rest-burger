import styles from './burger-constructor.module.css';
import type { FC } from 'react';
import { useDrop } from 'react-dnd';
import { DragIcon } from '@krgaa/react-developer-burger-ui-components';
import { UIBox, UIConstructorElement } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/app/store';
import {
  addIngredient,
  removeIngredient,
  setBun,
} from '@/app/store/slices/constructor/burger-constructor.slice.ts';
import type { TIngredientItem } from '@/entities/ingridients';

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
          <div className={styles.placeholder}>
            <p className="text text_type_main-default text_color_inactive">
              Перетащите булки из левого контейнера
            </p>
          </div>
        ) : items?.length ? (
          items.map((item, index) => (
            <UIBox
              className={styles.fillings__item}
              key={`fillings_item_${item.id}_${index}`}
            >
              <DragIcon type="primary" />
              <UIConstructorElement
                text={item.name}
                price={Number(item.price)}
                image={item.image}
                handleClose={() => dispatch(removeIngredient(index))}
              />
            </UIBox>
          ))
        ) : (
          <div className={styles.placeholder}>
            <p className="text text_type_main-default text_color_inactive">
              Перетащите начинку из левого контейнера
            </p>
          </div>
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

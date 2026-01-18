import type { FC } from 'react';
import type { TIngredientItem } from '@/entities/ingridients';
import { UICard } from '@/shared/ui';
import { useDrag } from 'react-dnd';
import { getIngredientCount, useAppSelector } from '@/app/store';

type TProps = {
  ingredient: TIngredientItem;
  onClick: () => void;
};

const Ingredient: FC<TProps> = ({ ingredient, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const count = useAppSelector(getIngredientCount(ingredient));

  return (
    <div
      ref={(node: HTMLDivElement | null) => {
        dragRef(node);
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <UICard
        image={ingredient.image}
        cost={ingredient.price}
        count={count}
        title={ingredient.name}
        currencyTheme="primary"
        onClick={onClick}
      />
    </div>
  );
};

export default Ingredient;

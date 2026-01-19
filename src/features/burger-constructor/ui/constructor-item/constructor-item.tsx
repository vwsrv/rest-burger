import type { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragIcon } from '@krgaa/react-developer-burger-ui-components';
import { UIBox, UIConstructorElement } from '@/shared/ui';
import type { TIngredientItem } from '@/entities/ingridients';
import styles from './constructor-item.module.css';

type TConstructorItemProps = {
  item: TIngredientItem;
  index: number;
  onRemove: (index: number) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
};

type TDragItem = {
  index: number;
  item: TIngredientItem;
};

export const ConstructorItem: FC<TConstructorItemProps> = ({
  item,
  index,
  onRemove,
  onMove,
}) => {
  const [{ isDragging }, dragRef] = useDrag<TDragItem, unknown, { isDragging: boolean }>(
    {
      type: 'constructor-ingredient',
      item: { index, item },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }
  );

  const [_, dropRef] = useDrop<TDragItem>({
    accept: 'constructor-ingredient',
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        onMove(draggedItem.index, index);
      }
    },
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node: HTMLDivElement | null) => {
        dragRef(node);
        dropRef(node);
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <UIBox className={styles.constructor_item}>
        <DragIcon type="primary" />
        <UIConstructorElement
          text={item.name}
          price={Number(item.price)}
          image={item.image}
          handleClose={() => onRemove(index)}
        />
      </UIBox>
    </div>
  );
};

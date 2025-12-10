import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { IngredientDTO } from '@/entities/ingridients/models/dto';
import type { FC } from 'react';

type TProps = {
  ingredient: IngredientDTO;
  type?: 'top' | 'bottom';
  isLocked?: boolean;
  handleClose?: () => void;
};

const UIConstructorElement: FC<TProps> = ({
  ingredient,
  type,
  isLocked,
  handleClose,
}) => {
  return (
    <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      type={type}
      isLocked={isLocked}
      handleClose={handleClose}
    />
  );
};

export default UIConstructorElement;

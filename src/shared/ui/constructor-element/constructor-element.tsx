import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { FC } from 'react';

type TProps = {
  text: string;
  price: number;
  image: string;
  type?: 'top' | 'bottom';
  isLocked?: boolean;
  handleClose?: () => void;
};

const UIConstructorElement: FC<TProps> = ({
  text,
  price,
  image,
  type,
  isLocked,
  handleClose,
}) => {
  return (
    <ConstructorElement
      text={text}
      price={price}
      thumbnail={image}
      type={type}
      isLocked={isLocked}
      handleClose={handleClose}
    />
  );
};

export default UIConstructorElement;

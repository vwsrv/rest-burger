import { Button } from '@krgaa/react-developer-burger-ui-components';

import type { FC, ReactNode, SyntheticEvent } from 'react';

type TProps = {
  children: ReactNode;
  type: 'secondary' | 'primary' | undefined;
  size: 'small' | 'medium' | 'large' | undefined;
  onClick: (() => void) | ((e: SyntheticEvent<Element, Event>) => void) | undefined;
  className?: string | undefined;
  htmlType: 'button' | 'submit' | 'reset';
};

const UIButton: FC<TProps> = ({
  type,
  size,
  onClick,
  className,
  htmlType,
  children,
}) => {
  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      extraClass={className}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
};

export default UIButton;

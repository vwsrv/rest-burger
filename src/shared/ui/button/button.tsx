import { Button } from '@krgaa/react-developer-burger-ui-components';

import type { FC, ReactNode, SyntheticEvent } from 'react';

type TProps = {
  children: ReactNode;
  type: 'secondary' | 'primary' | undefined;
  size: 'small' | 'medium' | 'large' | undefined;
  onClick: (() => void) | ((e: SyntheticEvent<Element, Event>) => void) | undefined;
  className?: string | undefined;
  htmlType: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const UIButton: FC<TProps> = ({
  type,
  size,
  onClick,
  className,
  htmlType,
  disabled,
  children,
}) => {
  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      extraClass={className}
      htmlType={htmlType}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default UIButton;

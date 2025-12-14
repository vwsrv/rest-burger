import type { FC, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const UIBox: FC<TProps> = ({
  children,
  className = '',
  onClick,
  ...boxProps
}) => {
  return (
    <div className={`${className}`} onClick={onClick} {...boxProps}>
      {children}
    </div>
  );
};

export default UIBox;

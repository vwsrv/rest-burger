import type { FC, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  className?: string;
};

export const UIBox: FC<TProps> = ({ children, className = '', ...boxProps }) => {
  return (
    <div className={`${className}`} {...boxProps}>
      {children}
    </div>
  );
};

export default UIBox;

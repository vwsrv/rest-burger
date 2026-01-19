import { forwardRef, type ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const UIBox = forwardRef<HTMLDivElement, TProps>(
  ({ children, className = '', onClick, ...boxProps }, ref) => {
    return (
      <div ref={ref} className={`${className}`} onClick={onClick} {...boxProps}>
        {children}
      </div>
    );
  }
);

UIBox.displayName = 'UIBox';

export default UIBox;

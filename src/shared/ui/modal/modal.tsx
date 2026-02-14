import { type FC, type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { clsx } from 'clsx';

type TProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

const UIModal: FC<TProps> = ({ open, onClose, children, className }) => {
  const [animation, setAnimation] = useState<boolean>(true);
  const [view, setView] = useState<boolean>(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);

  const animationClassName = animation
    ? styles.content_slide_up
    : styles.content_slide_down;

  useEffect(() => {
    setAnimation(open);

    if (open) {
      setView(true);
    }
  }, [open]);

  if (!view) return null;

  return createPortal(
    <div onClick={() => onClose()} className={styles.overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(styles.content, className, animationClassName)}
        onAnimationEnd={() => {
          if (!animation) {
            setView(false);
          }
        }}
      >
        <button type="button" onClick={() => onClose()} className={styles.close_button}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modals')!
  );
};

export default UIModal;

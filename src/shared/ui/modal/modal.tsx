import { type FC, type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import styles from './modal.module.css';

type TProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const UIModal: FC<TProps> = ({ open, onClose, children }) => {
  const [animation, setAnimation] = useState(true);
  const [view, setView] = useState(false);

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

  useEffect(() => {
    setAnimation(open);

    if (open) {
      setView(true);
    }
  }, [open]);

  if (!view) return null;

  return createPortal(
    <div
      onClick={() => onClose()}
      className={`${styles.overlay} ${animation ? styles.overlay_expand : styles.overlay_collapse}`}
      onAnimationEnd={() => {
        if (!animation) {
          setView(false);
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.content} ${animation ? styles.content_slide_up : styles.content_slide_down}`}
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

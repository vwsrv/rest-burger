import type { FC } from 'react';
import styles from './loader.module.css';

type TLoaderProps = {
  text?: string;
  className?: string;
};

const Loader: FC<TLoaderProps> = ({ text = 'Загрузка...', className }) => (
  <div className={className ? `${styles.loader} ${className}` : styles.loader}>
    <div className={styles.spinner} aria-hidden />
    <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
      {text}
    </p>
  </div>
);

export default Loader;

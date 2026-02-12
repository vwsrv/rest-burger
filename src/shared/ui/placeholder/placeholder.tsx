import type { FC } from 'react';
import styles from './placeholder.module.css';

type TPlaceholderProps = {
  text: string;
};

const Placeholder: FC<TPlaceholderProps> = ({ text }) => (
  <div className={styles.placeholder}>
    <p className="text text_type_main-default text_color_inactive">{text}</p>
  </div>
);

export default Placeholder;

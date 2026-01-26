import { PasswordInput } from '@krgaa/react-developer-burger-ui-components';

import type { ChangeEvent, FC } from 'react';

type TProps = {
  value: string;
  placeholder?: string;
  size?: 'default' | 'small';
  icon?: 'EditIcon' | 'ShowIcon' | 'HideIcon';
  extraClass?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UIPasswordInput: FC<TProps> = ({
  value,
  placeholder,
  size = 'default',
  icon,
  extraClass,
  onChange,
}) => {
  return (
    <PasswordInput
      value={value}
      placeholder={placeholder}
      size={size}
      icon={icon}
      extraClass={extraClass}
      onChange={onChange}
    />
  );
};

export default UIPasswordInput;

import { EmailInput } from '@krgaa/react-developer-burger-ui-components';

import type { ChangeEvent, FC } from 'react';

type TProps = {
  value: string;
  size: 'default' | 'small';
  placeholder: string;
  isIcon: boolean;
  extraClass: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UIEmailInput: FC<TProps> = ({
  value,
  size,
  placeholder,
  isIcon,
  extraClass,
  onChange,
}) => {
  return (
    <EmailInput
      value={value}
      size={size}
      isIcon={isIcon}
      placeholder={placeholder}
      extraClass={extraClass}
      onChange={onChange}
    />
  );
};

export default UIEmailInput;

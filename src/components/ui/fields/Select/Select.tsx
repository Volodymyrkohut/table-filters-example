import React, { ChangeEvent, FC, FocusEvent, ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  isError: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;

  onClick?: (event: any) => void;
  children: ReactNode;
}

const Select: FC<Props> = (props) => {
  const { isError, children, ...rest } = props;
  const classes = classNames('select', { isError });

  return (
    <div className={classes}>
      {/*@ts-ignore*/}
      <select autoComplete="off" {...rest}>
        {children}
      </select>
    </div>
  );
};

export default Select;

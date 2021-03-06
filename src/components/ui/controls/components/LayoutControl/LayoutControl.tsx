import React, { FC, ReactNode } from 'react';
import './LayoutControl.scss';
import classNames from 'classnames';

interface IProps {
  isError?: boolean;
  error?: string;
  label?: string;
  children: ReactNode;
}

const ControlLayout: FC<IProps> = (props) => {
  const { children, label = '', isError, error } = props;
  const classes = classNames('field-control', { isError });

  return (
    <div className={classes}>
      {label && <label>{label}</label>}
      {children}
      <span className="field-control__error">{isError && <span>{error}</span>}</span>
    </div>
  );
};

export default ControlLayout;

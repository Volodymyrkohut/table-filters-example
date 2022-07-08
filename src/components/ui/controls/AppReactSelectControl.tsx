import React, { FC } from 'react';
import { Props } from 'react-select';
import { Field, FieldProps } from 'formik';
import FieldReactSelect from '../fields/FieldReactSelect/FieldReactSelect';
import ControlLayout from './components/LayoutControl/LayoutControl';

interface IProps extends Props {
  options: Array<any> | any;
  name: string;
  label?: string;
  type?: 'async' | 'creatable' | 'default';
}

const AppReactSelectControl: FC<IProps> = (props) => {
  const { name, label, ...rest } = props;

  return (
    <Field name={name}>
      {(propsField: FieldProps) => {
        const { field, meta, form } = propsField;
        const isError = meta.touched && !!meta.error;

        return (
          <ControlLayout isError={isError} error={meta.error} label={label}>
            <FieldReactSelect
              {...rest}
              {...field}
              onBlur={() => form.setFieldTouched(name, true)}
              onChange={(value: any) => form.setFieldValue(name, value)}
            />
          </ControlLayout>
        );
      }}
    </Field>
  );
};

export default AppReactSelectControl;

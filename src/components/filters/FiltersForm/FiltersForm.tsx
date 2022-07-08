import React, { FC } from 'react';
import { FieldArray, FieldArrayRenderProps, Form, Formik, FormikHelpers } from 'formik';
import filterSchema from '../../ui/controls/validations';
import FiltersRow from '../FiltersRow/FiltersRow';
import { FilterTransformedItem, InitialValues } from '../../../types/filter';

interface Props {
  onSubmitFilterForm: (values: InitialValues, helpers: FormikHelpers<InitialValues>) => void;
  onRemoveFilter?: (index: number) => void;
  onAddFilter?: (fieldArrayProps: FieldArrayRenderProps) => void;
  initialValues: InitialValues;
  filtersTypesList: Array<FilterTransformedItem>;
}

const FiltersForm: FC<Props> = (props) => {
  const { onSubmitFilterForm, initialValues, filtersTypesList, onRemoveFilter, onAddFilter } = props;
  return (
    <Formik onSubmit={onSubmitFilterForm} initialValues={initialValues} validationSchema={filterSchema} enableReinitialize>
      <Form>
        <FieldArray name="filters">
          {(fieldArrayProps) => {
            const { form, push, remove } = fieldArrayProps;
            const { filters } = form.values;

            const onRemove = (index: number) => {
              remove(index);

              // for interface
              if (onRemoveFilter) {
                onRemoveFilter(index);
              }
            };

            const addFilter = () => {
              const [firstItem = null] = filtersTypesList;

              push({
                id: firstItem,
                operator: '',
                values: [],
              });

              // for interface
              if (onAddFilter) {
                onAddFilter(fieldArrayProps);
              }
            };

            return (
              <div className="filter-list">
                <ul className="filter-list__items">
                  {filters.map((row: any, index: number) => (
                    <li className="filter-list__item" key={index}>
                      <FiltersRow
                        idOptions={filtersTypesList}
                        operatorOptions={row?.id?.operators}
                        valueOptions={row?.id?.values}
                        onRemove={onRemove}
                        index={index}
                      />
                    </li>
                  ))}
                  <div className="filter-list__button">
                    <button type="button" onClick={addFilter}>
                      add one more filter
                    </button>
                  </div>
                </ul>
              </div>
            );
          }}
        </FieldArray>
        <button type="submit">Застусувати фільтр</button>
      </Form>
    </Formik>
  );
};

export default FiltersForm;

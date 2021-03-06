import React, { FC } from 'react';
import { FieldArray, FieldArrayRenderProps, Form, Formik, FormikHelpers } from 'formik';
import filterSchema from '../../ui/controls/validations';
import FiltersRow from '../FiltersRow/FiltersRow';
import { FilterResponseItem, InitialUILParseData, InitialValues, InitialValuesItem } from '../../../types/filter';
import { fillSavedFilterRowWithExtraData, transformResponseFilters } from '../../../helpers/transforms';

interface Props {
  onSubmitFilterForm: (outputData: InitialUILParseData) => void;
  onRemoveFilter?: (index: number) => void;
  onAddFilter?: (fieldArrayProps: FieldArrayRenderProps) => void;
  initialFilters: InitialUILParseData; //InitialValues;
  filtersTypesList: Array<FilterResponseItem>; //Array<FilterTransformedItem>;
}

const TableFiltersClient: FC<Props> = (props) => {
  const { onSubmitFilterForm, initialFilters, filtersTypesList, onRemoveFilter, onAddFilter } = props;

  // transform server data
  const transformed = transformResponseFilters(filtersTypesList);

  // for each saved filter add extra info {type, values, options }
  const initialValue = fillSavedFilterRowWithExtraData(initialFilters, transformed);

  const submitForm = (values: InitialValues, helpers: FormikHelpers<InitialValues>) => {
    const forSerialization = values.filters.map((item) => {
      const { id, ...rest } = item;

      return {
        ...rest,
        id: {
          label: id.label,
          value: id.value,
        },
      };
    });

    const outputData: InitialUILParseData = {
      filters: forSerialization,
    };

    if (onSubmitFilterForm) {
      onSubmitFilterForm(outputData);
    }
  };

  return (
    <Formik onSubmit={submitForm} initialValues={initialValue} validationSchema={filterSchema} enableReinitialize>
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
              const [firstItem = null] = transformed;

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
                  {filters.map((row: InitialValuesItem, index: number) => {
                    // clear operator's select and values select
                    const onChangeIdSelect = (value: any) => {
                      form.setFieldValue(`filters[${index}].operator`, '');
                      form.setFieldValue(`filters[${index}].values`, null);
                    };

                    return (
                      <li className="filter-list__item" key={index}>
                        <FiltersRow
                          onChangeIdSelect={onChangeIdSelect}
                          idOptions={transformed}
                          operatorOptions={row?.id?.operators}
                          valueOptions={row?.id?.values}
                          onRemove={onRemove}
                          index={index}
                        />
                      </li>
                    );
                  })}
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
        <button type="submit">?????????????????????? ????????????</button>
      </Form>
    </Formik>
  );
};

export default TableFiltersClient;

import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringifyUrl } from './helpers/url';
import { FilterTransformedItem, InitialValues } from './types/filter';
import useFilterData from './hooks/useFilterData';
import FiltersForm from './components/filters/FiltersForm/FiltersForm';
import './App.scss';
import { FormikHelpers } from 'formik';

const FiltersTable = () => {
  const { filters = [], initialValues } = useFilterData();
  const navigate = useNavigate();

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

    const d = {
      filters: forSerialization,
    };

    // ajax here
    // and when initial state

    console.log('object', d);
    console.log('serialize', stringifyUrl(d));

    navigate(`?${stringifyUrl(d)}`);
  };

  return <FiltersForm onSubmitFilterForm={submitForm} initialValues={initialValues} filtersTypesList={filters} />;
};

function Wrapper() {
  return (
    <div className="filters-wrapper">
      <FiltersTable />
      <div className="filter-relative">
        <div className="filters-table">
          <table>
            <tr>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>last</td>
              <td>last</td>
              <td>last</td>
              <td>last</td>
              <td>last</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <b>1,2,3,4</b>
        <button type="button">створити</button>
      </div>
    </div>
  );
}

export default Wrapper;

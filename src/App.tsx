import React from 'react';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { stringifyUrl } from './helpers/url';
import { InitialUILParseData, InitialValues } from './types/filter';
import useFilterData from './hooks/useFilterData';
import FiltersForm from './components/filters/FiltersForm/FiltersForm';
import './App.scss';

const FiltersTable = () => {
  const { filters = [], initialValues } = useFilterData();
  const navigate = useNavigate();

  // const initialValues = {
  //   filters: []
  // }

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

    navigate(`?${stringifyUrl(outputData)}`);
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

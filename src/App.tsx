import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseUrl, stringifyUrl } from './helpers/url';
import { FilterResponseItem, InitialUILParseData } from './types/filter';
import FiltersForm from './components/filters/FiltersForm/FiltersForm';
import './App.scss';

const FiltersTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState<Array<FilterResponseItem>>([]);

  useEffect(() => {
    fetch('https://api.nites.cloud/extranet/hotels/leuschke-plc-hotel-42507/reservations', {
      headers: {
        Authorization:
          'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLm5pdGVzLmNsb3VkXC9leHRyYW5ldFwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NTY0MDc4OTIsImV4cCI6MTY4Nzk0Mzg5MiwibmJmIjoxNjU2NDA3ODkyLCJqdGkiOiJ4YlhudkdkaGlzckI0MW91Iiwic3ViIjoxLCJwcnYiOiI2NDNkOGEwNGY0ZDI2ZjUyNTlmMDI4MjkzNjM4NDk1NzEyNzA0OThmIn0.04MWse5o4LpOjTwQNvIkWdKhiVHJvNvgZF8GjBOZDGs',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFilters(data.meta.filters);
      });
  }, []);

  const initialFilters = parseUrl<InitialUILParseData>(location.search.slice(1));

  const submitForm = (data: InitialUILParseData) => {
    // збереження в строку обєкт з фільтрами
    navigate(`?${stringifyUrl(data)}`);
  };

  return (
    <FiltersForm
      onAddFilter={() => {
        /* do something after new filter has been added */
      }}
      onRemoveFilter={() => {
        /* do something after some filter has been deleted */
      }}
      onSubmitFilterForm={submitForm} /*  after submit */
      initialFilters={initialFilters} /* from url or localstorage */
      filtersTypesList={filters} /* list from server */
    />
  );
};

function Wrapper() {
  return (
    <div className="filters-wrapper">
      <FiltersTable />
      <div className="filter-relative">
        <div className="filters-table">
          <table>
            <thead>
              <tr>
                <th>header</th>
                <th>header</th>
                <th>header</th>
                <th>header</th>
                <th>header</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
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

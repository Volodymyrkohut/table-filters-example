import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { parseUrl } from '../helpers/url';
import {
  FilterResponseItem,
  FilterTransformedItem,
  InitialUILParseData,
  InitialValues,
  InitialValuesItem,
} from '../types/filter';

function useFilterData() {
  const location = useLocation();
  const [filters, setFilters] = useState<Array<FilterTransformedItem>>([]);

  useEffect(() => {
    fetch('https://api.nites.cloud/extranet/hotels/leuschke-plc-hotel-42507/reservations', {
      headers: {
        Authorization:
          'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLm5pdGVzLmNsb3VkXC9leHRyYW5ldFwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NTY0MDc4OTIsImV4cCI6MTY4Nzk0Mzg5MiwibmJmIjoxNjU2NDA3ODkyLCJqdGkiOiJ4YlhudkdkaGlzckI0MW91Iiwic3ViIjoxLCJwcnYiOiI2NDNkOGEwNGY0ZDI2ZjUyNTlmMDI4MjkzNjM4NDk1NzEyNzA0OThmIn0.04MWse5o4LpOjTwQNvIkWdKhiVHJvNvgZF8GjBOZDGs',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // data transformation
        const transformed = data.meta.filters.map((item: FilterResponseItem) => {
          const { caption, id, values, operators, ...rest } = item;

          // якщо існує масив тоді робимо для нього потрібний формат для зручнішої роботи з react-select
          let transformedValue;
          if (Array.isArray(values)) {
            transformedValue = values.map((val) => {
              return {
                label: val.name,
                value: String(val.id),
              };
            });
          } else {
            transformedValue = values;
          }

          // для зручної роботи з select (formik control wrapper)
          const transformedOperators = operators.map((operator: string) => ({ key: operator, value: operator }));

          return {
            label: caption,
            value: String(id),
            values: transformedValue,
            operators: [{ key: 'Виберіть оператор', value: '' }, ...transformedOperators],
            ...rest,
          };
        });

        setFilters(transformed);
      });
  }, []);

  const urlData = parseUrl<InitialUILParseData>(location.search.slice(1));
  console.log('urlData', urlData);

  useEffect(() => {
    // transform data for ajax
    const requestData = urlData.filters?.length
      ? urlData.filters.map((item) => ({
          values: item?.values?.map((im) => im.value),
          id: item.id.value,
          operator: item.operator,
        }))
      : [];

    console.log('requestData', requestData);
  }, [location.search, urlData.filters]);

  // transform data for formik
  const inputFilterItems = urlData.filters?.length
    ? urlData.filters.map((initial) => {
        const row = filters.find((item) => initial.id.value === item.value);

        return {
          values: initial.values, // || [],
          operator: initial.operator,
          id: row as FilterTransformedItem,
        };
      })
    : ([] as unknown as Array<InitialValuesItem>);

  console.log('res', inputFilterItems);

  const initialValues: InitialValues = {
    filters: inputFilterItems,
  };

  return { filters, initialValues };
}

export default useFilterData;

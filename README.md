# table-filters-client

table-filters-client is React.js library for responsive filtering  tables

## Installation

```bash
 yarn install table-filters-client
```

or

```bash
 npm install table-filters-client
```

## Usage


```javascript
import {TableFiltersClient, FilterResponseItem, InitialUILParseData} from 'table-filters-client'

const FiltersTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState<Array<FilterResponseItem>>([]);

  useEffect(() => {
    fetch('/reservation')
      .then((response) => response.json())
      .then((data) => {
        setFilters(data.meta.filters);
      });
  }, []);

  // receive filters from url
  const initialFilters = parseUrl<InitialUILParseData>(location.search.slice(1));

  // save filters to url
  const submitForm = (data: InitialUILParseData) => {
    navigate(`?${stringifyUrl(data)}`);
  };

  return (
    <TableFiltersClient
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
```

## Contributing
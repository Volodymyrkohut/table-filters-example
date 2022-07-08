import React, { FC } from 'react';
import { FilterTransformedItem, Operators } from '../../../types/filter';
import AppReactSelectControl from '../../ui/controls/AppReactSelectControl';
import AppSelectControl from '../../ui/controls/AppSelectControl';

interface IReactSelectOption {
  label: string;
  value: string;
}

interface IFiltersRow {
  idOptions: Array<IReactSelectOption>;
  operatorOptions: Array<{ key: Operators; value: Operators }>;
  valueOptions: Array<IReactSelectOption>;
  onRemove: (index: number) => void;
  onChangeIdSelect?: (value: any) => void;
  index: number;
}

const FiltersRow: FC<IFiltersRow> = (props) => {
  const { idOptions, operatorOptions, valueOptions, onRemove, onChangeIdSelect, index } = props;

  // const onChangeIdSelect = () => {};

  return (
    <div className="filter-row">
      <div className="filter-row__field filter-row__field__id">
        <AppReactSelectControl name={`filters[${index}].id`} options={idOptions} onChange={onChangeIdSelect} />
      </div>
      <div className="filter-row__field filter-row__field__operator">
        <AppSelectControl name={`filters[${index}].operator`} options={operatorOptions} />
      </div>
      <div className="filter-row__field filter-row__field__values">
        <AppReactSelectControl name={`filters[${index}].values`} options={valueOptions} isMulti type="creatable" />
      </div>

      <div className="filter-row__field filter-row__remove">
        <button type="button" onClick={() => onRemove(index)}>
          видалити
        </button>
      </div>
    </div>
  );
};
export default FiltersRow;

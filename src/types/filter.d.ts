import { TYPE_BOOLEAN, TYPE_DATE, TYPE_ENUM, TYPE_NUMBER, TYPE_SOURCE, TYPE_STRING } from '../const/filters-const';

export type FilterType =
  | typeof TYPE_NUMBER
  | typeof TYPE_STRING
  | typeof TYPE_BOOLEAN
  | typeof TYPE_DATE
  | typeof TYPE_ENUM
  | typeof TYPE_SOURCE;

export type Operators = '<' | '<=' | '>' | '>=' | '=' | '!=';
export type ReactSelectOption = { value: string; label: string };

export interface FilterCommonData {
  operators: Array<Operators>;
  type: FilterType;
}

export interface FilterResponseItem extends FilterCommonData {
  caption: string;
  id: number;
  values: null | Array<{ id: number; name: string }>;
}

// transformed for usage with select2
export interface FilterTransformedItem extends FilterCommonData {
  value: string;
  label: string;
  values: null | Array<ReactSelectOption>;
}

// from url
export interface InitialUILParseData {
  filters: Array<{
    id: ReactSelectOption;
    values: Array<ReactSelectOption>;
    operator: Operators;
  }>;
}

// with extra info
export interface InitialValuesItem {
  id: FilterTransformedItem;
  values: Array<ReactSelectOption>;
  operator: Operators;
}

// for formik functionality
export interface InitialValues {
  filters: Array<InitialValuesItem>;
}

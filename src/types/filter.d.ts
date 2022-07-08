export type FilterType =
  | typeof TYPE_NUMBER
  | typeof TYPE_STRING
  | typeof TYPE_BOOLEAN
  | typeof TYPE_DATE
  | typeof TYPE_ENUM
  | typeof TYPE_SOURCE;

export type Operators = '<' | '<=' | '>' | '>=' | '=' | '!=';

export interface FilterCommonData {
  operators: Array<Operators>;
  type: FilterType;
}

export interface FilterResponseItem extends FilterCommonData {
  caption: string;
  id: number;
  values: null | Array<{ id: number; name: string }>;
}

export interface FilterTransformedItem extends FilterCommonData {
  value: string;
  label: string;
  values: null | Array<{ value: string; label: string }>;
}

// from url
export interface InitialUILParseData {
  filters: Array<{
    values: Array<{ label: string; value: string }>;
    operator: Operators;
    id: {
      value: string;
      label: string;
    };
  }>;
}

// for formik functionality
export interface InitialValues {
  filters: Array<{
    values: Array<{ label: string; value: string }>;
    operator: Operators;
    id: FilterTransformedItem;
  }>;
}

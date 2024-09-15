import { ChangeEvent } from 'react';

export type InputType = 'text' | 'longtext' | 'dropdown' | 'number';

export type BaseFormField = {
  type: InputType;
  label?: string;
  default_value?: string | number | boolean;
  value?: string | number | boolean;
  validation?: RegExp;
  min_value?: number;
  max_value?: number;
  options?: (string | number)[];
};

type ID = number;

export type FormData = {
  id: ID;
  value: string;
  isValid: boolean;
  isTouched: boolean;
  errorMessage: string;
};

export type HandleChangeParams<T extends HTMLInputElement | HTMLSelectElement> =
  {
    id: number;
    event: ChangeEvent<T>;
  };

export type ValidateFieldParams = {
  id: ID;
  value?: string;
  BaseFormFields: BaseFormField[];
  formDataList: FormData[];
};

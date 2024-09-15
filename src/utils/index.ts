import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BaseFormField, FormData, ValidateFieldParams } from '../types';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const generateFormDataList = (
  BaseFormFields: BaseFormField[],
): FormData[] => {
  return BaseFormFields.map((field, index) => {
    const { type, default_value: defaultValue } = field;
    const isDropdown = type === 'dropdown';
    const value = isDropdown ? (defaultValue as string) : '';
    const id = index + 1;

    return {
      id,
      value,
      isValid: isDropdown,
      isTouched: isDropdown,
      errorMessage: '',
    };
  });
};

export const validateField = ({
  id,
  value = '',
  BaseFormFields,
  formDataList,
}: ValidateFieldParams): any => {
  const inputIndex = formDataList.findIndex((v) => v.id === id);

  if (inputIndex === -1) return;

  const valueToValidate = value.length ? value : formDataList[inputIndex].value;

  const {
    type,
    validation,
    min_value: minValue,
    max_value: maxValue,
  } = BaseFormFields[inputIndex];

  let errorMessage = '';

  if (type === 'text' && validation) {
    errorMessage = new RegExp(validation).test(valueToValidate)
      ? ''
      : 'Invalid value';
  } else if (type === 'longtext') {
    const MAX_LETTERS_LENGTH = 1000;
    errorMessage =
      valueToValidate.length > MAX_LETTERS_LENGTH
        ? `No more than ${MAX_LETTERS_LENGTH} letters allowed`
        : '';
  } else if (type === 'number') {
    const valueToNumber = parseInt(valueToValidate, 10);
    errorMessage =
      valueToNumber < (minValue || -Infinity) ||
      valueToNumber > (maxValue || Infinity)
        ? `Value must be between ${minValue} and ${maxValue} inclusively`
        : '';
  }

  if (!valueToValidate.length && type !== 'dropdown') {
    errorMessage = 'Field is required';
  }

  return {
    ...formDataList[inputIndex],
    value: valueToValidate,
    isTouched: true,
    errorMessage,
    isValid: errorMessage === '',
  };
};

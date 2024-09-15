import { FC } from "react";
import { BaseFormField, FormData, HandleChangeParams } from "../types";
import { cn } from "../utils";
import { InputListItem } from "./InpuListItem";
import { InputLabel } from "./InputLabel";

type InputListProps = {
  BaseFormFields: BaseFormField[];
  formDataList: FormData[];
  handleChange: (
    params: HandleChangeParams<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  className?: string;
};

export const InputList: FC<InputListProps> = ({
  BaseFormFields,
  formDataList,
  handleChange,
  className,
}) => {
  return (
    <>
      {BaseFormFields.map((field, index) => {
        const id = index + 1;
        const {
          type,
          default_value: defaultValue = "",
          options,
          label: defaultLabel = `Label for input field #${id}`,
        } = field;

        const key = `${type}-id#${id}`;
        const fieldData = formDataList[index];

        return (
          <div key={key} className={cn("relative", className)}>
            <InputLabel htmlFor={`${id}`} title={defaultLabel} />
            <InputListItem
              type={type}
              options={options ?? []}
              value={fieldData.value}
              handleChange={handleChange}
              name={defaultLabel}
              id={`${id}`}
              placeholder={defaultValue as string}
            />

            {fieldData.isTouched && !fieldData.isValid && (
              <p className="absolute -bottom-5 text-xs text-red-500">
                {fieldData.errorMessage}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

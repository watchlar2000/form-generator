import { FC } from "react";
import { HandleChangeParams, InputType } from "../types";
import { cn } from "../utils";

type InputListItemProps = {
  type: InputType;
  value: string;
  id: string;
  name: string;
  handleChange: (
    params: HandleChangeParams<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  options?: (string | number)[];
  placeholder?: string;
  className?: string;
};

const inputStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export const InputListItem: FC<InputListItemProps> = ({
  type,
  value,
  id,
  name,
  handleChange,
  options,
  placeholder,
  className,
}) => {
  if (type === "dropdown") {
    return (
      <select
        value={value}
        onChange={(event) => handleChange({ id: parseInt(id, 10), event })}
        name={name}
        id={id}
        className={cn(inputStyle, className)}
      >
        {options?.map((o, index) => {
          const key = `${o}-id#${index + 1}`;
          return (
            <option key={key} value={o}>
              {o}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <input
      className={cn(inputStyle, className)}
      id={`${id}`}
      type={type}
      placeholder={placeholder}
      onChange={(event) => handleChange({ id: parseInt(id, 10), event })}
      value={value}
    />
  );
};

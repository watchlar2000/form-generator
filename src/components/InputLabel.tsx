import { FC } from "react";
import { cn } from "../utils";

type InputLabelProps = {
  htmlFor: string;
  title: string;
  className?: string;
};

export const InputLabel: FC<InputLabelProps> = ({
  htmlFor,
  title,
  className,
}) => {
  return (
    <label
      className={cn(
        "mb-2 block text-sm font-semibold text-gray-700",
        className,
      )}
      htmlFor={htmlFor}
    >
      {title}
    </label>
  );
};

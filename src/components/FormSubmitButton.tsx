import { FC } from "react";
import { cn } from "../utils";

type FormSubmitButtonProps = {
  title?: string;
  isDisabled?: boolean;
  className?: string;
};

export const FormSubmitButton: FC<FormSubmitButtonProps> = ({
  title = "Submit",
  isDisabled = false,
  className,
}) => {
  return (
    <button
      type="submit"
      className={cn(
        "mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

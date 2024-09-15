import { useEffect, useState } from "react";
import { FormGenerator } from "./components/FormGenerator";
import { BaseFormField } from "./types";

export const App = () => {
  const [BaseFormFields, setBaseFormFields] = useState<BaseFormField[]>([]);

  useEffect(() => {
    const initForm = async () => {
      const response = await fetch("/data.json");
      const data = (await response.json()) as BaseFormField[];

      setBaseFormFields(data);
    };

    initForm();
  }, []);

  return (
    <div className="mx-auto mt-5 max-w-[500px] p-2">
      <FormGenerator BaseFormFields={BaseFormFields} />
    </div>
  );
};

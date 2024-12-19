import { useState } from "react";
import {
  type UseFormRegister,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { convertStringToNumber, separateCents } from "../utils";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  name: string;
};

const initialState = "0.00";

export const ValueInput: React.FC<Props> = ({ register, errors, name }) => {
  const [value, setValue] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    // Remove non-numeric characters
    const userInput = e.target.value.replace(/[^\d]/g, "");
    if (!userInput) {
      setValue(initialState);
      return;
    }

    // Format input to separate dollars and cents
    // const numericValue = parseFloat(userInput) / 100;
    // const formattedValue = numericValue.toLocaleString("en-US");

    const formattedValue = separateCents(convertStringToNumber(userInput));

    setValue(formattedValue);

    const reactHookFormEvent = {
      target: {
        value: formattedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    // Pass the synthetic event to the onChange handler
    onChange(reactHookFormEvent);
  };

  return (
    <div className="grid mb-4">
      <label htmlFor={name}>Value</label>
      <input
        id={name}
        type="text"
        inputMode="numeric"
        value={`${value}`}
        {...register(name, {
          required: "Value is required",
          onChange: (e) => handleChange(e, register(name).onChange), // Pass the value directly to onChange
        })}
      />

      {errors[name] && <span>{errors[name]?.message as string}</span>}
    </div>
  );
};

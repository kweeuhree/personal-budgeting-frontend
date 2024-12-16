import {
  type UseFormRegister,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

import { SAVINGS_BALANCE, CHECKING_BALANCE } from "../utils";

type AccountFieldsetProps = {
  balanceType?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const AccountFieldset: React.FC<AccountFieldsetProps> = ({
  balanceType,
  name,
  register,
  errors,
}) => (
  <fieldset className="bg-bg p-1 border rounded-md">
    <legend className="bg-bg px-4 border rounded-md text-md font-medium">
      Account
    </legend>

    <div className="flex items-center justify-around">
      <div className="flex items-center">
        <input
          id={CHECKING_BALANCE}
          type="radio"
          value={CHECKING_BALANCE}
          checked={balanceType ? balanceType === CHECKING_BALANCE : undefined}
          {...register(name, {
            required: "Select an account type",
          })}
        />
        <label htmlFor={CHECKING_BALANCE}>Checking</label>
      </div>

      <div className="flex items-center">
        <input
          id={SAVINGS_BALANCE}
          type="radio"
          value={SAVINGS_BALANCE}
          checked={balanceType ? balanceType === SAVINGS_BALANCE : undefined}
          {...register(name, {
            required: "Select an account type",
          })}
        />
        <label htmlFor={SAVINGS_BALANCE}>Savings</label>
      </div>
    </div>

    {errors.balanceType && <span>{errors.balanceType.message as string}</span>}
  </fieldset>
);

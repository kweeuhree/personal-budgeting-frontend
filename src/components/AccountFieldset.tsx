import {
  type UseFormRegister,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

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
  <fieldset>
    <legend>Account</legend>

    <input
      id="CheckingBalance"
      type="radio"
      value="CheckingBalance"
      checked={balanceType ? balanceType === "CheckingBalance" : undefined}
      {...register(name, {
        required: "Select an account type",
      })}
    />
    <label htmlFor="CheckingBalance">Checking</label>

    <input
      id="SavingsBalance"
      type="radio"
      value="SavingsBalance"
      checked={balanceType ? balanceType === "SavingsBalance" : undefined}
      {...register(name, {
        required: "Select an account type",
      })}
    />
    <label htmlFor="SavingsBalance">Savings</label>

    {errors.balanceType && <span>{errors.balanceType.message as string}</span>}
  </fieldset>
);

import React from "react";

type AccountFieldsetProps = {
  balanceType?: string;
  register: any;
  errors: any;
};

export const AccountFieldset: React.FC<AccountFieldsetProps> = ({
  balanceType,
  register,
  errors,
}) => (
  <fieldset>
    <legend>Account</legend>

    <input
      id="CheckingBalance"
      type="radio"
      value="CheckingBalance"
      checked={balanceType === "CheckingBalance"}
      {...register("balanceType", {
        required: "Select an account type",
      })}
    />
    <label htmlFor="CheckingBalance">Checking</label>

    <input
      id="SavingsBalance"
      type="radio"
      value="SavingsBalance"
      checked={balanceType === "SavingsBalance"}
      {...register("balanceType", {
        required: "Select an account type",
      })}
    />
    <label htmlFor="SavingsBalance">Savings</label>

    {errors.balanceType && <span>{errors.balanceType.message}</span>}
  </fieldset>
);

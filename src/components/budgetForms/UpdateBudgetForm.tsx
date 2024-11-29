import React, { type Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { type StringInput } from "../../types";
import {
  useAppDispatch,
  useUpdateBudgetMutation,
  budgetUpdate,
  useAppSelector,
  selectBudget,
} from "../../store";
import { convertNumberToCents, convertStringToNumber } from "../../utils";

type Props = {
  balanceType: string;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const UpdateBudgetForm: React.FC<Props> = (props) => {
  const [updateBudget, { isSuccess, error }] = useUpdateBudgetMutation();
  const dispatch = useAppDispatch();
  const { budgetId } = useAppSelector(selectBudget);
  const { balanceType, setEditMode } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StringInput>();

  const onSubmit: SubmitHandler<StringInput> = (budgetData) => {
    console.log("si sire");
    handleUpdateBudget(budgetData);
  };

  const handleUpdateBudget = async (budgetData: StringInput) => {
    console.log("Received new budget data", budgetData);
    const numberValue = convertStringToNumber(budgetData.balanceValue);
    const updateValue = convertNumberToCents(numberValue);
    console.log("Update value:", updateValue);

    try {
      const updatedBudget = await updateBudget({
        budgetId,
        updatedBudget: {
          updateSumInCents: updateValue,
          balanceType,
          updateType: budgetData.update,
        },
      });
      console.log(updatedBudget);
      dispatch(budgetUpdate(updatedBudget.data));
      reset();
      setEditMode(false);
    } catch (error) {
      throw new Error("Failed to update budget");
    }
  };

  const handleCancelUpdate = () => {
    setEditMode(false);
  };

  return (
    <>
      {isSuccess ? "Budget updated" : error && "error"}
      <h1>Update Balance</h1>
      <form id="updateBudgetForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="balanceValue">Value</label>
        <input
          type="number"
          {...register("balanceValue", {
            required: "This field is required",
            min: {
              value: 0,
              message: "0 is the minimum amount to accept this input",
            },
          })}
        />
        <fieldset>
          <legend>Account</legend>

          <input
            id="CheckingBalance"
            type="radio"
            value="Checking"
            checked={balanceType === "CheckingBalance" && true}
            {...register("balanceType", {
              required: "Select an account type",
            })}
          />
          <label htmlFor="CheckingBalance">Checking</label>

          <input
            id="SavingsBalance"
            type="radio"
            value="Savings"
            checked={balanceType === "SavingsBalance" && true}
            {...register("balanceType", {
              required: "Select an account type",
            })}
          />
          <label htmlFor="SavingsBalance">Savings</label>
        </fieldset>
        <br />

        <fieldset>
          <legend>Update</legend>
          <input
            id="add"
            type="radio"
            value="add"
            {...register("update", { required: "Select an update type" })}
          />
          <label htmlFor="add">Add</label>

          <input
            id="subtract"
            type="radio"
            value="subtract"
            {...register("update", { required: "Select an update type" })}
          />
          <label htmlFor="subtract">Subtract</label>
          <br />
          {errors.update && "Select an update type"}
        </fieldset>
        <br />
        <button type="button" onClick={handleCancelUpdate}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </>
  );
};

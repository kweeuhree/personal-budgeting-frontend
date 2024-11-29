import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  budgetCreate,
  useAppDispatch,
  useCreateBudgetMutation,
} from "../../store";
import { convertNumberToCents, convertStringToNumber } from "../../utils";

type BudgetInput = {
  [key: string]: string;
};

const processBudget = (newBudget: BudgetInput) => {
  return Object.fromEntries(
    Object.entries(newBudget).map(([key, value]) => {
      const parsedValue = convertStringToNumber(value);
      const centsValue = convertNumberToCents(parsedValue);
      return [key, centsValue];
    })
  );
};

export const CreateBudgetForm: React.FC = () => {
  const [createBudget, { isSuccess, error }] = useCreateBudgetMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetInput>();

  const onSubmit: SubmitHandler<BudgetInput> = (budgetData) => {
    handleCreateBudget(budgetData);
  };

  const handleCreateBudget = async (newBudget: BudgetInput) => {
    try {
      console.log("Received new budget", newBudget);
      const processedBudget = processBudget(newBudget);
      console.log("Processed new budget", processedBudget);
      const createdBudget = await createBudget(processedBudget).unwrap();
      console.log("Created new budget", createdBudget);
      dispatch(budgetCreate(createdBudget));
      reset();
      navigate("/budget");
    } catch (error) {
      console.log(typeof error);
      throw new Error("Failed to create budget");
    }
  };

  return (
    <>
      {isSuccess ? "Budget created" : error && "error"}
      <form id="createBudgetForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="checkingBalance">
          Create checking account balance:
        </label>
        <input
          id="checkingBalance"
          type="number"
          {...register("checkingBalance", {
            required: "Checking balance is required",
            min: {
              value: 0,
              message: "0 is the minimum value to accept this input.",
            },
          })}
        />
        {errors.checkingBalance && <span>This field is required</span>}
        <br />
        <label htmlFor="savingsBalance">Create savings account balance:</label>
        <input
          id="savingsBalance"
          type="number"
          {...register("savingsBalance", {
            min: {
              value: 0,
              message: "0 is the minimum value to accept this input.",
            },
          })}
        />
        {errors.savingsBalance && (
          <span>{errors.savingsBalance.toString()}</span>
        )}
        <button type="submit">Create</button>
      </form>
    </>
  );
};

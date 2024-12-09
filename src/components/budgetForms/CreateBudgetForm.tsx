import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  budgetCreate,
  PartialBudget,
  useAppDispatch,
  useCreateBudgetMutation,
} from "../../store";
import { convertNumberToCents, convertStringToNumber } from "../../utils";
import { type StringInput } from "../../types";

const processBudget = (newBudget: StringInput): PartialBudget => {
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
  } = useForm<StringInput>();

  const onSubmit: SubmitHandler<StringInput> = (budgetData) => {
    handleCreateBudget(budgetData);
  };

  const handleCreateBudget = async (newBudget: StringInput) => {
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
      throw new Error(
        `Failed to create budget: ${error instanceof Error ? error.message : "Unknown error."}`
      );
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
          min="0"
          {...register("checkingBalance", {
            required: "Checking balance is required",
          })}
        />
        {errors.checkingBalance && <span>This field is required</span>}
        <br />
        <label htmlFor="savingsBalance">Create savings account balance:</label>
        <input
          id="savingsBalance"
          type="number"
          min="0"
          {...register("savingsBalance", {})}
        />
        {errors.savingsBalance && (
          <span>{errors.savingsBalance.toString()}</span>
        )}
        <button type="submit">Create</button>
      </form>
    </>
  );
};

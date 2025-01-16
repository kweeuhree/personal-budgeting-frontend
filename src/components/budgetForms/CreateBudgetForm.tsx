import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  budgetCreate,
  PartialBudget,
  useAppDispatch,
  useCreateBudgetMutation,
} from "../../store";
import {
  convertNumberToCents,
  convertStringToNumber,
  SAVINGS_BALANCE,
  CHECKING_BALANCE,
} from "../../utils";
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
      const processedBudget = processBudget(newBudget);
      const createdBudget = await createBudget(processedBudget).unwrap();
      dispatch(budgetCreate(createdBudget));
      reset();
      navigate("/budget");
    } catch (error) {
      throw new Error(
        `Failed to create budget: ${error instanceof Error ? error.message : "Unknown error."}`
      );
    }
  };

  return (
    <>
      {isSuccess ? "Budget created" : error && "error"}
      <form id="createBudgetForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={CHECKING_BALANCE}>
          Create checking account balance:
        </label>
        <input
          id={CHECKING_BALANCE}
          type="number"
          min="0"
          {...register(CHECKING_BALANCE, {
            required: "Checking balance is required",
          })}
        />
        {errors.checkingBalance && <span>This field is required</span>}
        <br />
        <label htmlFor={SAVINGS_BALANCE}>Create savings account balance:</label>
        <input
          id={SAVINGS_BALANCE}
          type="number"
          min="0"
          {...register(SAVINGS_BALANCE, {})}
        />
        {errors.savingsBalance && (
          <span>{errors.savingsBalance.toString()}</span>
        )}
        <button type="submit">Create</button>
      </form>
    </>
  );
};

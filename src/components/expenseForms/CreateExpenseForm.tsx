import { useForm, SubmitHandler } from "react-hook-form";

import {
  selectCategories,
  useAppSelector,
  useExpenseCreateMutation,
  useCategoryCreateMutation,
  useAppDispatch,
  createExpense,
  createCategory,
  selectBudget,
} from "../../store";
import { useHandleNavigate } from "../../hooks";
import {
  getCategoryId,
  convertStringtoCents,
  separateCents,
  CHECKING_BALANCE,
  SAVINGS_BALANCE,
} from "../../utils";
import { AccountFieldset, Button, CategoriesDropdown, ValueInput } from "..";
import { Expense, type StringInput } from "../../types";
import { responsiveHeader } from "../../styles";
import { useState } from "react";

export const CreateExpenseForm: React.FC = () => {
  const { handleNavigate } = useHandleNavigate();
  const [expenseCreate, { isSuccess, error }] = useExpenseCreateMutation();
  const [categoryCreate] = useCategoryCreateMutation();
  const [insufficientUi, setInsufficientUi] = useState(false);
  const {
    budgetId,
    savingsBalance = 0,
    checkingBalance = 0,
  } = useAppSelector(selectBudget);
  const categories = useAppSelector(selectCategories);
  const categoriesExist = categories.length > 0;

  const dispatch = useAppDispatch();

  const isInsufficient = (amountInCents: number, balanceType: string) => {
    switch (balanceType) {
      case CHECKING_BALANCE:
        return amountInCents > checkingBalance;
      case SAVINGS_BALANCE:
        return amountInCents > savingsBalance;
      default:
        throw new Error(
          `Error. AmountInCents: ${amountInCents}. BalanceType: ${balanceType}`
        );
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StringInput>();

  const onSubmit: SubmitHandler<StringInput> = (expenseData) => {
    handleCreateExpense(expenseData);
  };

  const handleCreateExpense = async (expenseData: StringInput) => {
    const amountInCents = convertStringtoCents(expenseData.value);

    if (isInsufficient(amountInCents, expenseData.expenseType)) {
      setInsufficientUi(true);
    }

    let newExpense: Partial<Expense> = {
      description: expenseData.description,
      expenseType: expenseData.expenseType,
      amountInCents,
    };
    let categoryId;

    try {
      if (categoriesExist) {
        categoryId = getCategoryId(categories, expenseData.category);
      } else {
        const newCategory = await categoryCreate({
          name: expenseData.category,
        }).unwrap();
        categoryId = newCategory.expenseCategoryId;
        dispatch(createCategory(newCategory));
      }
      newExpense = { ...newExpense, categoryId };
      const createdExpense = await expenseCreate(newExpense).unwrap();

      dispatch(createExpense(createdExpense));
      handleNavigate("/budget");
    } catch (error) {
      console.error("Error occurred while creating expense:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const insufficient = insufficientUi && "border-amber bg-sun";

  return !budgetId ? (
    "create a budget to start tracking expenses"
  ) : (
    <>
      <h3 className={responsiveHeader}>Create Expense</h3>
      <form
        id="createExpenseForm"
        className="my-4 sm:my-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid space-y-4">
          <label htmlFor="description">
            Description <span>(optional)</span>
          </label>
          <input
            id="description"
            type="text"
            {...register("description", {})}
          />

          <br />
          <ValueInput name="value" register={register} errors={errors} />

          <br />
          {categoriesExist ? (
            <CategoriesDropdown
              register={register}
              errors={errors}
              categories={categories}
            />
          ) : (
            <>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                {...register("category", {
                  required: "Category is required",
                })}
              />
            </>
          )}
          <AccountFieldset
            register={register}
            errors={errors}
            name={"expenseType"}
          />
        </div>
        <div className="flex items-center justify-around mt-4">
          <Button
            buttonType="button"
            buttonText="Cancel"
            onClick={() => handleNavigate("/expenses")}
          />
          <Button buttonType="submit" buttonText="Create" />
        </div>
      </form>

      <div className="flex space-x-4 bg-bg p-1 min-w-[90%] justify-evenly border border-navy rounded-xl shadow-lg">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Checking:</span>
          <span
            className={`bg-white p-1 border rounded-md ${insufficient ?? "border-pale-steel"}`}
          >
            {checkingBalance && separateCents(checkingBalance)}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-medium">Savings:</span>
          <span
            className={`bg-white p-1 border border-pale-steel rounded-md ${insufficient ?? "border-pale-steel"}`}
          >
            {(savingsBalance && separateCents(savingsBalance)) || "0.00"}
          </span>
        </div>
      </div>
      {isSuccess ? "Expense created" : error && <span>Not enough funds</span>}
    </>
  );
};

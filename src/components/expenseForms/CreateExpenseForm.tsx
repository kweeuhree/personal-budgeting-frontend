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
import { getCategoryId, convertStringtoCents } from "../../utils";
import { AccountFieldset, Button, CategoriesDropdown } from "..";
import { Expense, type StringInput } from "../../types";
import { responsiveHeader } from "../../styles";

export const CreateExpenseForm: React.FC = () => {
  const { handleNavigate } = useHandleNavigate();
  const [expenseCreate, { isSuccess, error }] = useExpenseCreateMutation();
  const [categoryCreate] = useCategoryCreateMutation();
  const { budgetId } = useAppSelector(selectBudget);
  const categories = useAppSelector(selectCategories);
  const categoriesExist = categories.length > 0;

  const dispatch = useAppDispatch();

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

  return !budgetId ? (
    "create a budget to start tracking expenses"
  ) : (
    <>
      {isSuccess ? "Expense created" : error && "error"}
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
          <label htmlFor="value">Value</label>
          <input
            id="value"
            type="number"
            min="0"
            {...register("value", {
              required: "This field is required",
            })}
          />
          {errors.value && <span>{errors.value.toString()}</span>}
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
    </>
  );
};

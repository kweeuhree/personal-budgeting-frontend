import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  selectCategories,
  useAppSelector,
  useExpenseCreateMutation,
  useCategoryCreateMutation,
  useAppDispatch,
  budgetUpdate,
} from "../../store";
import { type StringInput } from "../../types";
import { AccountFieldset, CategoriesDropdown } from "..";
import { getCategoryId, convertStringtoCents } from "../../utils";

export const CreateExpenseForm: React.FC = () => {
  // should send a post request to the database
  // should check whether any category exists,
  // should send a post request to category model before creating
  // the expense
  const [expenseCreate, { isSuccess, error }] = useExpenseCreateMutation();
  const [categoryCreate] = useCategoryCreateMutation();
  const categories = useAppSelector(selectCategories);
  const categoriesExist = categories.length > 0;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    // reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StringInput>();

  const onSubmit: SubmitHandler<StringInput> = (expenseData) => {
    handleCreateExpense(expenseData);
  };

  const handleCreateExpense = async (expenseData: StringInput) => {
    console.log(`Attemting to create expense: ${expenseData}`);
    const amountInCents = convertStringtoCents(expenseData.value);
    const categoryId = getCategoryId(categories, expenseData.category);
    console.log(categoryId);
    try {
      if (categoriesExist) {
        const updatedBudget = await expenseCreate({
          description: expenseData.descripton,
          category: expenseData.category,
          expenseType: expenseData.expenseType,
          amountInCents,
          categoryId,
        }).unwrap();
        console.log("new expense", updatedBudget);
        dispatch(budgetUpdate(updatedBudget));
      } else {
        const newCategory = await categoryCreate({
          name: expenseData.category,
        }).unwrap();
        const newExpense = await expenseCreate(expenseData).unwrap();
        console.log("new expense", newExpense);
        console.log("new category", newCategory);
      }

      handleNavigateToBudget();
    } catch (error) {
      console.error("Error occurred while creating expense:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleNavigateToBudget = () => {
    navigate("/budget");
  };

  return (
    <>
      {isSuccess ? "Expense created" : error && "error"}
      <h1>Create Expense</h1>
      <form id="createExpenseForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="description">Description</label>
        <input id="description" type="text" {...register("description", {})} />
        {errors.description && <span>{errors.description.toString()}</span>}
        <br />
        <label htmlFor="value">Value</label>
        <input
          type="number"
          {...register("value", {
            required: "This field is required",
            min: {
              value: 0,
              message: "0 is the minimum amount to accept this input",
            },
          })}
        />
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
                min: {
                  value: 0,
                  message: "Please include a category",
                },
              })}
            />
          </>
        )}
        <AccountFieldset
          register={register}
          errors={errors}
          name={"expenseType"}
        />
        {/* <fieldset>
          <legend>Account</legend>

          <input
            id="CheckingBalance"
            type="radio"
            value="CheckingBalance"
            {...register("expenseType", {
              required: "Select an account type",
            })}
          />
          <label htmlFor="CheckingBalance">Checking</label>

          <input
            id="SavingsBalance"
            type="radio"
            value="SavingsBalance"
            {...register("expenseType", {
              required: "Select an account type",
            })}
          />
          <label htmlFor="SavingsBalance">Savings</label>

          {errors.balanceType && <span>{errors.balanceType.message}</span>}
        </fieldset> */}
        <button type="button" onClick={handleNavigateToBudget}>
          Cancel
        </button>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

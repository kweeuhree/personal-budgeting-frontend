import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  selectCategories,
  useAppSelector,
  useExpenseCreateMutation,
  useCategoryCreateMutation,
  useAppDispatch,
  createExpense,
} from "../../store";
import { Expense, type StringInput } from "../../types";
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
      }
      newExpense = { ...newExpense, categoryId };
      const createdExpense = await expenseCreate(newExpense).unwrap();

      dispatch(createExpense(createdExpense));
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
        <label htmlFor="description">
          Description <span>(optional)</span>
        </label>
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
        <button type="button" onClick={handleNavigateToBudget}>
          Cancel
        </button>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

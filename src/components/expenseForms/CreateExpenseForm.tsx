import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  selectCategories,
  useAppSelector,
  useCreateExpenseMutation,
  // createExpense,
} from "../../store";
import { type StringInput } from "../../types";
import { AccountFieldset, CategoriesDropdown } from "..";

export const CreateExpenseForm: React.FC = () => {
  // should send a post request to the database
  // should check whether any category exists,
  // should send a post request to category model before creating
  // the expense
  const categories = useAppSelector(selectCategories);
  const categoriesExist = categories.length > 0;
  console.log(`Categories? - ${categoriesExist}`);
  const [createExpense, { isSuccess, error }] = useCreateExpenseMutation();
  const navigate = useNavigate();

  const {
    // reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StringInput>();

  const onSubmit: SubmitHandler<StringInput> = (expenseData) => {
    handleCreateExpense(expenseData);
  };

  const handleCreateExpense = (expenseData: StringInput) => {
    console.log(`Attemting to create expense: ${expenseData}`);
  };

  const handleNavigateToBudget = () => {
    navigate("/budget");
  };

  return (
    <>
      {isSuccess ? "Expense created" : error && "error"}
      <form id="createExpenseForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "Name is required",
            min: {
              value: 0,
              message: "Please include a name",
            },
          })}
        />
        {errors.name && <span>This field is required</span>}
        <br />
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
          <CategoriesDropdown categories={categories} />
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
        <AccountFieldset register={register} errors={errors} />
        <button type="button" onClick={handleNavigateToBudget}>
          Cancel
        </button>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

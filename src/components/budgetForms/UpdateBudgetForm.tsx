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
import { convertStringtoCents } from "../../utils";
import { AccountFieldset } from "../AccountFieldset";

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
    handleUpdateBudget(budgetData);
  };

  const handleUpdateBudget = async (budgetData: StringInput) => {
    const updateValue = convertStringtoCents(budgetData.balanceValue);

    try {
      const updatedBudget = await updateBudget({
        budgetId,
        updatedBudget: {
          updateSumInCents: updateValue,
          balanceType,
          updateType: budgetData.update,
        },
      }).unwrap();

      dispatch(budgetUpdate(updatedBudget));

      reset();
      setEditMode(false);
    } catch (error) {
      throw new Error(
        `Failed to update budget: ${error instanceof Error ? error.message : "Unknown error."}`
      );
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
        <AccountFieldset
          balanceType={balanceType}
          name={"balanceType"}
          register={register}
          errors={errors}
        />
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

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
import { responsiveHeader } from "../../styles";

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
      <h3 className={responsiveHeader}>Update Balance</h3>
      <form id="updateBudgetForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid mx-2 mb-4">
          <label htmlFor="balanceValue">Value</label>
          <input
            type="number"
            min="0"
            {...register("balanceValue", {
              required: "This field is required",
            })}
          />
        </div>
        <AccountFieldset
          balanceType={balanceType}
          name={"balanceType"}
          register={register}
          errors={errors}
        />
        <br />

        <fieldset className="bg-bg p-1 border rounded-md">
          <legend className="bg-bg px-4 border rounded-md text-md font-medium">
            Update
          </legend>
          <div className="flex items-center justify-around">
            <div className="flex items-center">
              <input
                id="add"
                type="radio"
                value="add"
                {...register("update", { required: "Select an update type" })}
              />
              <label htmlFor="add">Add</label>
            </div>
            <div className="flex items-center">
              <input
                id="subtract"
                type="radio"
                value="subtract"
                {...register("update", { required: "Select an update type" })}
              />
              <label htmlFor="subtract">Subtract</label>
            </div>
            {errors.update && "Select an update type"}
          </div>
        </fieldset>

        <div className="flex justify-evenly my-5">
          <button type="button" onClick={handleCancelUpdate}>
            Cancel
          </button>
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
};

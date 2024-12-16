import { useForm, SubmitHandler } from "react-hook-form";

import {
  useCategoryCreateMutation,
  createCategory,
  useAppDispatch,
} from "../../store";
import { useHandleNavigate } from "../../hooks";
import { Button } from "../Button";
import { type StringInput } from "../../types";
import { responsiveHeader } from "../../styles";

export const CreateCategoryForm = () => {
  const { handleNavigate } = useHandleNavigate();
  const [categoryCreate, { isSuccess, error }] = useCategoryCreateMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StringInput>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<StringInput> = (categoryData) => {
    handleCreateCategory(categoryData);
  };

  const handleCreateCategory = async (categoryData: StringInput) => {
    console.log(categoryData);
    try {
      const newCategory = await categoryCreate(categoryData).unwrap();
      dispatch(createCategory(newCategory));
      console.log("Created a category:");
      console.log(newCategory);

      handleNavigate("/categories");
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <>
      {isSuccess ? "Category created" : error && "error"}
      <h3 className={responsiveHeader}>Create Category</h3>
      <form className="my-4 sm:my-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid space-y-4">
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
          {errors.name && <span>{errors.name.toString()}</span>}
          <br />
          <label htmlFor="description">
            Description <span>(optional)</span>
          </label>
          <input
            id="description"
            type="text"
            {...register("description", {})}
          />
          <br />
        </div>
        <div className="flex items-center justify-around">
          <Button
            buttonType="button"
            buttonText="Cancel"
            onClick={() => handleNavigate("/categories")}
          />
          <Button buttonType="submit" buttonText="Create" />
        </div>
      </form>
    </>
  );
};

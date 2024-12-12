import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { type StringInput } from "../../types";
import {
  useCategoryCreateMutation,
  createCategory,
  useAppDispatch,
} from "../../store";

export const CreateCategoryForm = () => {
  const [categoryCreate, { isSuccess, error }] = useCategoryCreateMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StringInput>();

  const navigate = useNavigate();
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

      navigate("/categories");
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleNavigate = () => {
    navigate("/categories");
  };

  return (
    <>
      {isSuccess ? "Category created" : error && "error"}
      <h1>Create Category</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <input id="description" type="text" {...register("description", {})} />
        <br />
        <button type="submit" onClick={handleNavigate}>
          Cancel
        </button>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

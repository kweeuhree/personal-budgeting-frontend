import { useForm, SubmitHandler } from "react-hook-form";
import { type StringInput } from "../../types";

export const CreateCategoryForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StringInput>();

  const onSubmit: SubmitHandler<StringInput> = (categoryData) => {
    handleCreateCategory(categoryData);
  };

  const handleCreateCategory = (categoryData: StringInput) => {
    console.log(categoryData);
  };

  return (
    <>
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
              message: "Please include a category",
            },
          })}
        />
        <label htmlFor="description">
          Description <span>(optional)</span>
        </label>
        <input id="description" type="text" {...register("description", {})} />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

import { type Category } from "../types";
import {
  type UseFormRegister,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

type Props = {
  categories: Category[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export const CategoriesDropdown: React.FC<Props> = ({
  categories,
  register,
  errors,
}) => {
  return (
    <>
      <label htmlFor="dropdown">Categories</label>
      <select
        id="dropdown"
        {...register("category", {
          required: "This field is required",
        })}
      >
        {categories.map((cat) => (
          <option key={cat.expenseCategoryId + cat.name}>{cat.name}</option>
        ))}
      </select>
      {errors.category && <span>{errors.category.message as string}</span>}
    </>
  );
};

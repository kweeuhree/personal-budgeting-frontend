import { useNavigate } from "react-router-dom";

import {
  useAppSelector,
  selectCategories,
  useCategoryDeleteMutation,
  deleteCategory,
  useAppDispatch,
} from "../store";
import { Categories, CreateCategoryForm } from "../components";

export const CategoriesPage = () => {
  const categories = useAppSelector(selectCategories);
  const [categoryDelete] = useCategoryDeleteMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateCategory = () => {
    navigate("/categories/create");
  };

  const handleDelete = async (expenseCategoryId: string) => {
    try {
      await categoryDelete(expenseCategoryId).unwrap();
      dispatch(deleteCategory(expenseCategoryId));
    } catch (error) {
      throw new Error(
        `Failed to delete expense: ${error instanceof Error ? error.message : error}`
      );
    }
  };

  const handleConfirmDelete = (expenseCategoryId: string, name: string) => {
    const found = categories.find(
      (cat) => cat.expenseCategoryId === expenseCategoryId
    );
    const confirmStmt = `Are you sure you want to permanently delete ${name}?`;
    if (found && confirm(confirmStmt)) {
      handleDelete(expenseCategoryId);
    }
  };

  return (
    <>
      <div>CategoriesPage</div>
      <button onClick={handleCreateCategory}>Create Category +</button>
      {categories.length > 0 ? (
        <Categories
          categories={categories}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : (
        <CreateCategoryForm />
      )}
    </>
  );
};

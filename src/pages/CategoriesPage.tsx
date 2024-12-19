import {
  useAppSelector,
  selectCategories,
  useCategoryDeleteMutation,
  deleteCategory,
  useAppDispatch,
} from "../store";
import { useConfirmDialog, useHandleNavigate } from "../hooks";
import { Button, Categories, CreateCategoryForm } from "../components";

const confirmStmt = (name: string) => {
  return `This action cannot be undone. Are you sure you want to permanently delete ${name} and associated expenses?`;
};

export const CategoriesPage = () => {
  const { handleNavigate } = useHandleNavigate();
  const { showConfirm, ConfirmDialog } = useConfirmDialog();
  const categories = useAppSelector(selectCategories);
  const [categoryDelete] = useCategoryDeleteMutation();
  const dispatch = useAppDispatch();

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
    if (found) {
      showConfirm(confirmStmt(name), () => handleDelete(expenseCategoryId));
    }
  };

  return (
    <div className="flex flex-col items-center min-w-full min-h-full">
      <header className="flex items-center justify-between min-w-full px-2">
        <div className="font-medium">Categories</div>
        <Button
          buttonType="button"
          buttonText="Create Category +"
          onClick={() => handleNavigate("/categories/create")}
        />
      </header>

      {categories.length > 0 ? (
        <Categories
          categories={categories}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : (
        <CreateCategoryForm />
      )}
      <ConfirmDialog />
    </div>
  );
};

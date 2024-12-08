import { type Categories as CategoriesType } from "../types";

type Props = {
  categories: CategoriesType;
  handleConfirmDelete: (expenseCategoryId: string, name: string) => void;
};

export const Categories: React.FC<Props> = ({
  categories,
  handleConfirmDelete,
}) => {
  const categoriesJSX = categories.map((cat) => {
    const { expenseCategoryId, name, description, totalSum } = cat;
    return (
      <div key={expenseCategoryId} className="flex justify-between">
        <div>{name}</div>
        <div className={!description ? "invisible" : ""}>{description}</div>
        <div>
          Total spent per category: <span>{totalSum ?? "0"}</span>
        </div>
        {/* Delete button */}
        <button
          onClick={() => handleConfirmDelete(expenseCategoryId, name)}
          className="flex"
        >
          &#9249;&#10062;
        </button>
      </div>
    );
  });

  return <div>{categoriesJSX}</div>;
};

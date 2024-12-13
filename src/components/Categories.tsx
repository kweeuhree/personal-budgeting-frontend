import { separateCents } from "../utils";
import { TableHeads } from ".";
import { type Categories as CategoriesType } from "../types";

type Props = {
  categories: CategoriesType;
  handleConfirmDelete: (expenseCategoryId: string, name: string) => void;
};

const tableHeads = ["Name", "Description", "Total Spent", "Action"];

export const Categories: React.FC<Props> = ({
  categories,
  handleConfirmDelete,
}) => {
  return (
    <table className="mt-4 justify-evenly min-w-full">
      <thead>
        <tr>
          <TableHeads tableHeads={tableHeads} />
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => {
          const { expenseCategoryId, name, description, totalSum } = cat;
          return (
            <tr key={expenseCategoryId}>
              <td>{name}</td>
              <td>{description || <span>N/A</span>}</td>
              <td>{totalSum > 0 ? separateCents(totalSum) : totalSum}</td>
              <td>
                {/* Delete button */}
                <button
                  onClick={() => handleConfirmDelete(expenseCategoryId, name)}
                >
                  &#9249;&#10062;
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

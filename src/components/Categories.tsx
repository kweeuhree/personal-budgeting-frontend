import { type Categories as CategoriesType } from "../types";
import { separateCents } from "../utils";

type Props = {
  categories: CategoriesType;
  handleConfirmDelete: (expenseCategoryId: string, name: string) => void;
};

export const Categories: React.FC<Props> = ({
  categories,
  handleConfirmDelete,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Total Spent</th>
          <th>Actions</th>
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

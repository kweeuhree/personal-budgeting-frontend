import { useAppSelector, selectCategories } from "../store";
import { getCategoryName, separateCents } from "../utils";
import { Expense, type Expenses as ExpensesType } from "../types";

type Props = {
  handleConfirmDelete: (expense: Expense, amountInDollars: string) => void;
  expenses: ExpensesType;
};

export const Expenses: React.FC<Props> = ({
  handleConfirmDelete,
  expenses,
}) => {
  const categories = useAppSelector(selectCategories);

  return (
    <table className="mt-4 justify-evenly min-w-full">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Category</th>
          <th>Account</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => {
          const {
            expenseId,
            categoryId,
            expenseType,
            amountInCents,
            description,
            createdAt,
          } = exp;
          const categoryName = getCategoryName(categories, categoryId);
          const creationTime = new Date(createdAt).toLocaleDateString();
          const amountInDollars = separateCents(amountInCents);
          const account = expenseType.slice(0, expenseType.indexOf("B"));
          return (
            <tr key={expenseId}>
              <td>{amountInDollars}</td>
              <td className={!description ? "invisible" : ""}>{description}</td>
              <td>{categoryName}</td>
              <td>{account}</td>
              <td>{creationTime}</td>
              <td>
                {/* Delete button */}
                <button
                  onClick={() => handleConfirmDelete(exp, amountInDollars)}
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

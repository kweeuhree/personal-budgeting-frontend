import { useAppSelector, selectCategories } from "../store";
import { getCategoryName, separateCents } from "../utils";
import { TableHeads } from ".";
import { Expense, type Expenses as ExpensesType } from "../types";

type Props = {
  handleConfirmDelete: (expense: Expense, amountInDollars: string) => void;
  expenses: ExpensesType;
};

const tableHeads = [
  "Amount",
  "Description",
  "Category",
  "Account",
  "Created At",
  "Action",
];

export const Expenses: React.FC<Props> = ({
  handleConfirmDelete,
  expenses,
}) => {
  const categories = useAppSelector(selectCategories);

  return (
    <table className="flex flex-col mt-4">
      <thead className="red-bd flex min-w-full">
        <tr>
          <TableHeads tableHeads={tableHeads} />
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
              <td
                className={"hidden md:block" + !description ? "invisible" : ""}
              >
                {description}
              </td>
              <td>{categoryName}</td>
              <td className="hidden md:block">{account}</td>
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

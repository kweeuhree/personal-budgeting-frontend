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
  const expensesJSX = expenses.map((exp) => {
    const { expenseId, categoryId, amountInCents, description, createdAt } =
      exp;
    const categoryName = getCategoryName(categories, categoryId);
    const creationTime = new Date(createdAt).toLocaleDateString();
    const amountInDollars = separateCents(amountInCents);
    return (
      <div key={expenseId} className="flex">
        <div>
          Amount: <span>{amountInDollars}</span>
        </div>
        <div className={!description ? "invisible" : ""}>
          Description: <span>{description}</span>
        </div>
        <div>
          Category: <span>{categoryName}</span>
        </div>
        <div>
          Created at: <span>{creationTime}</span>
        </div>
        {/* Delete button */}
        <button
          onClick={() => handleConfirmDelete(exp, amountInDollars)}
          className="flex"
        >
          &#9249;&#10062;
        </button>
      </div>
    );
  });

  return <div>{expensesJSX}</div>;
};

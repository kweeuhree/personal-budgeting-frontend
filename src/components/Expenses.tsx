import { useAppSelector, selectCategories } from "../store";
import { getCategoryName, separateCents } from "../utils";
import { Button, ResponsiveTable, Tooltip } from "./";
import { Expense, type Expenses as ExpensesType } from "../types";
import { useTooltip } from "../hooks";

const tableHeads = [
  "Amount",
  "Description",
  "Category",
  "Account",
  "Created At",
  "Action",
];

type Props = {
  handleConfirmDelete: (expense: Expense, amountInDollars: string) => void;
  expenses: ExpensesType;
};

export const Expenses: React.FC<Props> = ({
  handleConfirmDelete,
  expenses,
}) => {
  const categories = useAppSelector(selectCategories);
  const { isVisible, showTooltip, removeTooltip } = useTooltip({});
  const getTableData = (expenses: ExpensesType) => {
    return expenses.map((exp) => {
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

      return {
        id: expenseId,
        cells: {
          Amount: amountInDollars,
          Description: description || <span>--</span>,
          CategoryName: categoryName,
          Account: account,
          CreationTime: creationTime,
          Button: (
            <div onMouseLeave={() => removeTooltip(expenseId)}>
              <Button
                data-tooltip-target={`tooltip-${expenseId}`}
                buttonText="&#9249;"
                buttonType="submit"
                onMouseEnter={() => showTooltip(expenseId)}
                onClick={() => handleConfirmDelete(exp, amountInDollars)}
              />
              <Tooltip
                id={`tooltip-${expenseId}`}
                text="Delete expense"
                isVisible={isVisible[expenseId]}
              />
            </div>
          ),
        },
      };
    });
  };

  const tableData = getTableData(expenses);

  return <ResponsiveTable tableHeads={tableHeads} tableData={tableData} />;
};

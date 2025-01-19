import { separateCents } from "../utils";
import { useTooltip } from "../hooks";
import { Button, ResponsiveTable, Tooltip } from ".";
import { type Categories as CategoriesType } from "../types";

const tableHeads = ["Name", "Description", "Total Spent", "Action"];

type Props = {
  categories: CategoriesType;
  handleConfirmDelete: (expenseCategoryId: string, name: string) => void;
};

export const Categories: React.FC<Props> = ({
  categories,
  handleConfirmDelete,
}) => {
  const { isVisible, showTooltip, removeTooltip } = useTooltip({});

  const getTableData = (categories: CategoriesType) => {
    return categories.map((cat) => {
      const { expenseCategoryId, name, description, totalSum } = cat;

      return {
        id: expenseCategoryId,
        cells: {
          Name: name,
          Description: description || <span>--</span>,
          TotalSum: totalSum > 0 ? separateCents(totalSum) : totalSum,
          Button: (
            <div
              className="relative"
              onMouseLeave={() => removeTooltip(expenseCategoryId)}
            >
              <Button
                data-tooltip-target={`tooltip-${expenseCategoryId}`}
                buttonText="&#9249;"
                buttonType="submit"
                onMouseEnter={() => showTooltip(expenseCategoryId)}
                onClick={() => handleConfirmDelete(expenseCategoryId, name)}
              />
              <Tooltip
                id={`tooltip-${expenseCategoryId}`}
                text="Delete expense"
                isVisible={isVisible[expenseCategoryId]}
              />
            </div>
          ),
        },
      };
    });
  };

  const tableData = getTableData(categories);

  return <ResponsiveTable tableHeads={tableHeads} tableData={tableData} />;
};

import { separateCents } from "../utils";
import { Button } from ".";
import { type Categories as CategoriesType } from "../types";
import { ResponsiveTable } from "./ResponsiveTable";

const tableHeads = ["Name", "Description", "Total Spent", "Action"];

type Props = {
  categories: CategoriesType;
  handleConfirmDelete: (expenseCategoryId: string, name: string) => void;
};

export const Categories: React.FC<Props> = ({
  categories,
  handleConfirmDelete,
}) => {
  const getTableData = (categories) => {
    return categories.map((cat) => {
      const { expenseCategoryId, name, description, totalSum } = cat;

      return {
        id: expenseCategoryId,
        cells: {
          Name: name,
          Description: description || <span>--</span>,
          TotalSum: totalSum > 0 ? separateCents(totalSum) : totalSum,
          Button: (
            <Button
              buttonText="&#9249;"
              buttonType="submit"
              onClick={() => handleConfirmDelete(expenseCategoryId, name)}
            />
          ),
        },
      };
    });
  };

  const tableData = getTableData(categories);

  return <ResponsiveTable tableHeads={tableHeads} tableData={tableData} />;
};

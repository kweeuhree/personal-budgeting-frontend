import { getHeaderStyle } from "../styles";

type Props = {
  tableHeads: string[];
};

export const TableHeads: React.FC<Props> = ({ tableHeads }) => {
  const tableHeadsJSX = tableHeads.map((header) => {
    return (
      <th key={header} className={getHeaderStyle(header)}>
        {header}
      </th>
    );
  });
  return tableHeadsJSX;
};

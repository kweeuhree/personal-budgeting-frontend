import { useState } from "react";
import { getHeaderStyle, getHeaderVisibility } from "../styles";

interface TableData {
  id: string;
  cells: {
    [key: string]: string | React.ReactNode;
    Button: React.ReactNode;
  };
}

type Props = {
  tableHeads: string[];
  tableData: TableData[];
};

export const ResponsiveTable: React.FC<Props> = ({ tableHeads, tableData }) => {
  const [columnHover, setColumnHover] = useState<number>(-1);
  console.log("Table data:");
  console.log(tableData);

  const handleMouseEnter = (index: number) => {
    setColumnHover(index);
  };

  const handleMouseLeave = () => {
    setColumnHover(-1);
  };

  return (
    <table className="table-auto mx-auto min-w-full group mt-4 bg-white shadow-lg py-3 border border-navy">
      <thead className="table-header-group bg-gradient-to-bl from-steel-haze to-white shadow-lg">
        <tr>
          {tableHeads.map((header, index) => {
            return (
              <th
                key={header}
                className={`${getHeaderStyle(header)} ${columnHover === index ? "bg-sun" : ""}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="table-row-group bg-gradient-to-bl from-steel-haze to-white-opaque-80">
        {tableData.map((row) => (
          <tr
            key={row.id}
            className={`table-row transition ease-in-out hover:bg-bg`}
          >
            {Object.entries(row.cells).map(([header, content], index) => {
              const visibility = getHeaderVisibility(header);
              const bgColor = columnHover === index ? "bg-bg" : "";
              const hover = "transition ease-in-out hover:bg-sun";

              return (
                <td
                  key={header}
                  className={`border ${visibility} ${bgColor} ${hover}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

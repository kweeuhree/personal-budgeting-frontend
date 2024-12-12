import { useRef, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";

import { selectAllExpenses, selectCategories, useAppSelector } from "../store";
import { getChartOptions, SAVINGS_BALANCE, CHECKING_BALANCE } from "../utils";
import { useGroupedExpenses } from "../hooks";

interface RadioInput {
  id: string;
  value: string;
}

type RadioInputs = Record<string, RadioInput>;

const radioInputs: RadioInputs = {
  Checking: {
    id: "checking",
    value: CHECKING_BALANCE,
  },
  Savings: {
    id: "savings",
    value: SAVINGS_BALANCE,
  },
  All: {
    id: "all",
    value: "all",
  },
};

export const CategoriesChart = () => {
  const donutRef = useRef<HTMLDivElement | null>(null);
  const expenses = useAppSelector(selectAllExpenses);
  const categories = useAppSelector(selectCategories);
  const { groupedSavings, groupedChecking } = useGroupedExpenses();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const navigate = useNavigate();

  const totalSums = categories.map((cat) => cat.totalSum);

  const handleNavigate = () => {
    navigate("/expenses/create");
  };

  useEffect(() => {
    if (donutRef.current && categories) {
      const chartOptions = getChartOptions(categories);
      const chart = new ApexCharts(donutRef.current, chartOptions);
      chart.render();

      const updateChart = () => {
        let displayedExpenses: number[] = [];

        switch (selectedAccount) {
          case SAVINGS_BALANCE:
            displayedExpenses = groupedSavings;
            break;
          case CHECKING_BALANCE:
            displayedExpenses = groupedChecking;
            break;
          case "all":
            displayedExpenses = totalSums;
            break;
          default:
            displayedExpenses = totalSums;
            break;
        }

        if (chart) {
          chart.updateSeries(displayedExpenses, true);
        }
      };

      updateChart();

      return () => {
        chart.destroy();
      };
    }
  }, [categories, totalSums, selectedAccount, groupedSavings, groupedChecking]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSelectedAccount((prev) => (prev === value ? null : value));
  };

  return expenses.length ? (
    <div className="w-5/12">
      <div className="flex justify-center space-x-3">
        {Object.entries(radioInputs).map(([label, { id, value }]) => (
          <div key={id + "radio"} className="flex items-center space-x-1">
            <input
              id={id}
              type="radio"
              name="accountType"
              value={value}
              checked={selectedAccount === value}
              onChange={handleChange}
              className="w-4 h-4 border-amber accent-navy checked:bg-sun hover:bg-amber focus:ring-2 focus:ring-amber checked:hover:border-sun"
            />
            <label htmlFor={id + "radio"}>{label}</label>
          </div>
        ))}
      </div>

      <div id="donut" ref={donutRef}></div>
    </div>
  ) : (
    <button onClick={handleNavigate}>Create an expense +</button>
  );
};

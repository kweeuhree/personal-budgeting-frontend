import { useRef, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";

import { selectCategories, useAppSelector } from "../store";
import { getChartOptions, SAVINGS_BALANCE, CHECKING_BALANCE } from "../utils";
import { useGroupedExpenses } from "../hooks";

export const CategoriesChart = () => {
  const donutRef = useRef<HTMLDivElement | null>(null);

  const categories = useAppSelector(selectCategories);
  const { groupedSavings, groupedChecking } = useGroupedExpenses();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const navigate = useNavigate();

  const totalSums = categories.map((cat) => cat.totalSum);

  const handleNavigate = () => {
    navigate("/categories/create");
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

  return categories ? (
    <div className="chart-container">
      <input
        id="checking-radio"
        type="radio"
        name="accountType"
        value={CHECKING_BALANCE}
        checked={selectedAccount === CHECKING_BALANCE}
        onChange={handleChange}
      />
      <label htmlFor="checking-radio">Checking</label>

      <input
        id="savings-radio"
        type="radio"
        name="accountType"
        value={SAVINGS_BALANCE}
        checked={selectedAccount === SAVINGS_BALANCE}
        onChange={handleChange}
      />
      <label htmlFor="savings-radio">Savings</label>

      <input
        id="all-radio"
        type="radio"
        name="accountType"
        value="all"
        checked={selectedAccount === "all"}
        onChange={handleChange}
      />
      <label htmlFor="all-radio">All</label>

      <div id="donut" ref={donutRef}></div>
    </div>
  ) : (
    <button onClick={handleNavigate}>Create a category +</button>
  );
};

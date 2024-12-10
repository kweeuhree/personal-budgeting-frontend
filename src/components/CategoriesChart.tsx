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
  const [selectedAccount, setSelectedAccount] = useState<string[]>([]);

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

        if (
          selectedAccount.includes(SAVINGS_BALANCE) &&
          selectedAccount.includes(CHECKING_BALANCE)
        ) {
          displayedExpenses = totalSums;
        } else if (selectedAccount.includes(SAVINGS_BALANCE)) {
          displayedExpenses = groupedSavings;
        } else if (selectedAccount.includes(CHECKING_BALANCE)) {
          displayedExpenses = groupedChecking;
        } else {
          displayedExpenses = totalSums;
        }

        if (chart) {
          chart.updateSeries(displayedExpenses);
        }
      };

      updateChart();

      return () => {
        if (chart) {
          chart.destroy();
        }
      };
    }
  }, [categories, totalSums, selectedAccount, groupedSavings, groupedChecking]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSelectedAccount((prev) =>
      prev.includes(value)
        ? prev.filter((account) => account !== value)
        : [...prev, value]
    );
  };

  return categories ? (
    <div className="chart-container">
      <input
        id="checking-checkbox"
        type="checkbox"
        name="accountType"
        value={CHECKING_BALANCE}
        checked={selectedAccount.includes(CHECKING_BALANCE)}
        onChange={handleChange}
      />
      <label htmlFor="checking-checkbox">Checking</label>

      <input
        id="savings-checkbox"
        type="checkbox"
        name="accountType"
        value={SAVINGS_BALANCE}
        checked={selectedAccount.includes(SAVINGS_BALANCE)}
        onChange={handleChange}
      />
      <label htmlFor="savings-checkbox">Savings</label>

      <div id="donut" ref={donutRef}></div>
    </div>
  ) : (
    <button onClick={handleNavigate}>Create a category +</button>
  );
};

import { Categories } from "../types";
import { separateCents } from "./conversionUtils";

const colors = [
  "#F94144",
  "#4D908E",
  "#277DA1",
  "#F9C74F",
  "#90BE6D",
  "#577590",
  "#F3722C",
  "#F8961E",
  "#43AA8B",
];

export const getChartOptions = (categories: Categories) => {
  const names = categories.map((cat) => cat.name);
  const totalSums = categories.map((cat) => cat.totalSum);
  return {
    series: totalSums,
    colors,
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value: number) {
                return separateCents(value);
              },
            },
          },
          size: "60%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: names,
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            pie: {
              size: "100%",
            },
          },
          legend: {
            position: "right",
          },
        },
      },
    ],
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return separateCents(value);
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value: number) {
          return separateCents(value);
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
};

import { PartialBudget } from "../store";

export const convertStringToNumber = (value: string): number =>
  typeof value === "string" ? parseFloat(value) : value;

export const convertNumberToCents = (value: number): number =>
  Math.round(value * 100);

export const formatBudget = (budget: PartialBudget) => {
  return Object.fromEntries(
    Object.entries(budget).map(([key, value]) => {
      return [key, separateCents(value)];
    })
  );
};

export const separateCents = (value: number) => {
  const stringValue = value.toString();
  const dollarValue = stringValue.slice(0, -2);
  const centsValue = stringValue.slice(-2);
  const update = parseFloat(`${dollarValue}.${centsValue}`);
  return update.toFixed(2);
};

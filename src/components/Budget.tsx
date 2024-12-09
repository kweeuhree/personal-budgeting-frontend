import { PartialBudget } from "../store";

type Props = {
  handleUpdateBalance: (balanceType: string) => void;
  budget: PartialBudget;
};

export const Budget: React.FC<Props> = ({ handleUpdateBalance, budget }) => {
  const {
    checkingBalance,
    savingsBalance,
    budgetTotal,
    totalSpent,
    budgetRemaining,
  } = budget;

  return (
    <div className="budget-container">
      <div>
        Checking balance: {checkingBalance}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleUpdateBalance("CheckingBalance")}
        >
          (+)
        </span>
      </div>
      <div>
        Savings balance: {savingsBalance}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleUpdateBalance("SavingsBalance")}
        >
          (+)
        </span>
      </div>
      <div>Total budget: {budgetTotal}</div>
      <div>Total spent: {totalSpent}</div>
      <div>Total remaining: {budgetRemaining}</div>
    </div>
  );
};

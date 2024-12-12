import { PartialBudget } from "../store";

import { SAVINGS_BALANCE, CHECKING_BALANCE } from "../utils";

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
    // budgetRemaining,
  } = budget;

  return (
    <div className="w-7/12">
      <div>
        Checking balance: {checkingBalance}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleUpdateBalance(CHECKING_BALANCE)}
        >
          (+)
        </span>
      </div>
      <div>
        Savings balance: {savingsBalance}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleUpdateBalance(SAVINGS_BALANCE)}
        >
          (+)
        </span>
      </div>
      <div>Total budget: {budgetTotal}</div>
      <div>Total spent: {totalSpent}</div>
      {/* <div>Total remaining: {budgetRemaining}</div> */}
    </div>
  );
};

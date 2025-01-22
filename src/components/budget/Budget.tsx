import { PartialBudget } from "../../store";

import { SAVINGS_BALANCE, CHECKING_BALANCE } from "../../utils";
import { Balance } from "./Balance";

import "./budget.css";

type TotalProps = {
  amount?: number;
  text: string;
};

const Total: React.FC<TotalProps> = ({ amount = 0, text }) => {
  return (
    <div className="grid total">
      <span className="font-medium">{amount}</span>
      <span className="text-base">{text}</span>
    </div>
  );
};

type Props = {
  handleUpdateBalance: (balanceType: string) => void;
  budget: PartialBudget;
};

export const Budget: React.FC<Props> = ({ handleUpdateBalance, budget }) => {
  const { checkingBalance, savingsBalance, budgetTotal, totalSpent } = budget;

  return (
    <div className="sm:w-5/12 md:w-7/12 lg:w-7/12 bg-white border rounded-md shadow-md mx-2 px-2 py-6 lg:mx-10 lg:py-10">
      <h3 className="flex indent-8 font-medium shadow-sm">Budget</h3>
      {/* Budget accounts and totals */}
      <div>
        {/* Checking balance */}
        <Balance
          balanceName="checking"
          balanceAmount={checkingBalance}
          handleUpdateBalance={() => handleUpdateBalance(CHECKING_BALANCE)}
        />
        {/* Savings balance */}
        <Balance
          balanceName="savings"
          balanceAmount={savingsBalance}
          handleUpdateBalance={() => handleUpdateBalance(SAVINGS_BALANCE)}
        />
        {/* Totals */}
        <div className="flex justify-evenly content-center px-2 pt-6">
          {/* Total spent */}
          <Total amount={totalSpent} text="Total spent" />
          {/* Budget total */}
          <Total amount={budgetTotal} text="Total available" />
        </div>
      </div>
    </div>
  );
};

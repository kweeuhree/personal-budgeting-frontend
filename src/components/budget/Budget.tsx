import { PartialBudget } from "../../store";

import { SAVINGS_BALANCE, CHECKING_BALANCE } from "../../utils";
import { pencilSquare } from "../../styles";

import "./budget.css";

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
        <div className="flex w-full justify-around py-6">
          <div className="balance w-10/12">
            <div>Checking balance</div>
            <div>{checkingBalance}</div>
          </div>
          <div className="w-1/12 flex content-center justify-center">
            <div
              className="cursor-pointer content-center justify-center"
              onClick={() => handleUpdateBalance(CHECKING_BALANCE)}
            >
              {pencilSquare}
            </div>
          </div>
        </div>
        {/* Savings balance */}
        <div className="flex w-full justify-around">
          <div className="balance w-10/12">
            <div>Savings balance</div>
            <div>{savingsBalance}</div>
          </div>
          <div className="w-1/12 flex content-center justify-center">
            <div
              className="cursor-pointer content-center justify-center"
              onClick={() => handleUpdateBalance(SAVINGS_BALANCE)}
            >
              {pencilSquare}
            </div>
          </div>
        </div>
        {/* Totals */}
        <div className="flex justify-evenly content-center px-2 pt-6">
          <div className="grid total">
            <span className="font-medium">{totalSpent}</span>
            <span className="text-base">Total spent</span>
          </div>
          <div className="grid total">
            <span className="font-medium">{budgetTotal}</span>
            <span className="text-base">Total available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

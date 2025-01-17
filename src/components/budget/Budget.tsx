import { PartialBudget } from "../../store";

import { SAVINGS_BALANCE, CHECKING_BALANCE } from "../../utils";
import { pencilSquare } from "../../styles";

import "./budget.css";
import { Tooltip } from "../Tooltip";
import { useTooltip } from "../../hooks";

type Props = {
  handleUpdateBalance: (balanceType: string) => void;
  budget: PartialBudget;
};

type BalanceProps = {
  balanceName: string;
  balanceAmount?: number;
  constant: string;
};

export const Budget: React.FC<Props> = ({ handleUpdateBalance, budget }) => {
  const { isVisible, showTooltip, removeTooltip } = useTooltip({
    savings: false,
    checking: false,
  });
  const { checkingBalance, savingsBalance, budgetTotal, totalSpent } = budget;

  const Balance: React.FC<BalanceProps> = ({
    balanceName,
    balanceAmount,
    constant,
  }) => {
    const formattedName =
      balanceName.charAt(0).toUpperCase() + balanceName.slice(1);
    return (
      <div className="flex w-full justify-around py-6">
        <div className="balance w-10/12">
          <div>{formattedName} balance</div>
          <div>{balanceAmount}</div>
        </div>
        <div className="w-1/12 flex content-center justify-center">
          <div
            data-tooltip-target={`tooltip-${balanceName}`}
            className="cursor-pointer relative content-center justify-center"
            onMouseLeave={() => removeTooltip(balanceName)}
            onClick={() => handleUpdateBalance(constant)}
          >
            <div onMouseEnter={() => showTooltip(balanceName)}>
              {pencilSquare}
            </div>
            <Tooltip
              id={`tooltip-${balanceName}`}
              text={`Update ${balanceName} balance`}
              isVisible={isVisible[balanceName]}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sm:w-5/12 md:w-7/12 lg:w-7/12 bg-white border rounded-md shadow-md mx-2 px-2 py-6 lg:mx-10 lg:py-10">
      <h3 className="flex indent-8 font-medium shadow-sm">Budget</h3>
      {/* Budget accounts and totals */}
      <div>
        {/* Checking balance */}
        <Balance
          balanceName="checking"
          balanceAmount={checkingBalance}
          constant={CHECKING_BALANCE}
        />
        {/* Savings balance */}
        <Balance
          balanceName="savings"
          balanceAmount={savingsBalance}
          constant={SAVINGS_BALANCE}
        />
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

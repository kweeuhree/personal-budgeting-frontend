import { MouseEventHandler } from "react";
import { useTooltip } from "../../hooks";
import { Tooltip, Button } from "../";
import { pencilSquare } from "../../styles";

type BalanceProps = {
  balanceName: string;
  balanceAmount?: number;
  handleUpdateBalance: MouseEventHandler;
};

export const Balance: React.FC<BalanceProps> = ({
  balanceName,
  balanceAmount,
  handleUpdateBalance,
}) => {
  const { isVisible, showTooltip, removeTooltip } = useTooltip({
    savings: false,
    checking: false,
  });
  const formattedName =
    balanceName.charAt(0).toUpperCase() + balanceName.slice(1);

  return (
    <div className="flex w-full justify-around py-6">
      <div className="balance w-10/12">
        <div>{formattedName} balance</div>
        <div>{balanceAmount}</div>
      </div>
      <div
        onMouseLeave={() => removeTooltip(balanceName)}
        className="relative flex content-center justify-center"
      >
        <Button
          data-tooltip-target={`tooltip-${balanceName}`}
          buttonType="button"
          onMouseEnter={() => showTooltip(balanceName)}
          onClick={handleUpdateBalance}
          buttonText={pencilSquare}
        />

        <Tooltip
          id={`tooltip-${balanceName}`}
          text={`Update ${balanceName} balance`}
          isVisible={isVisible[balanceName]}
        />
      </div>
    </div>
  );
};

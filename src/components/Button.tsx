import { MouseEventHandler } from "react";

type Props = {
  buttonType: "button" | "submit";
  buttonText: string;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  autofocus?: boolean;
};

export const Button: React.FC<Props> = ({
  buttonType,
  buttonText,
  onClick,
  autofocus,
  onMouseEnter,
}) => {
  return (
    <button
      autoFocus={autofocus}
      onClick={onClick}
      type={buttonType}
      onMouseEnter={onMouseEnter}
      className="hover:text-slate-teal"
    >
      {buttonText}
    </button>
  );
};

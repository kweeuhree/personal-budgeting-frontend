import { MouseEventHandler } from "react";

type Props = {
  buttonType: "button" | "submit";
  buttonText: string | React.ReactNode;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  autofocus?: boolean;
};

export const Button: React.FC<Props> = ({
  buttonType,
  buttonText,
  onClick,
  autofocus,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <button
      autoFocus={autofocus}
      onClick={onClick}
      type={buttonType}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="hover:text-slate-teal"
    >
      {buttonText}
    </button>
  );
};

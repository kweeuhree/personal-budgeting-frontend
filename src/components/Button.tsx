import { MouseEventHandler } from "react";

type Props = {
  buttonType: "button" | "submit";
  buttonText: string;
  onClick?: MouseEventHandler;
  autofocus?: boolean;
};

export const Button: React.FC<Props> = ({
  buttonType,
  buttonText,
  onClick,
  autofocus,
}) => {
  return (
    <button
      autoFocus={autofocus}
      onClick={onClick}
      type={buttonType}
      className="hover:text-slate-teal"
    >
      {buttonText}
    </button>
  );
};

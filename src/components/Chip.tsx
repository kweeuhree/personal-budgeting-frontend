import { MouseEventHandler } from "react";

type Props = {
  text: string;
  onClick?: MouseEventHandler;
};

export const Chip: React.FC<Props> = ({ text, onClick }) => {
  return (
    <div
      className="cursor-pointer font-medium text-navy hover:underline"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

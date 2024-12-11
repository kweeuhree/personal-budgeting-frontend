type Props = {
  buttonType: "button" | "submit";
  buttonText: string;
};

export const Button: React.FC<Props> = ({ buttonType, buttonText }) => {
  return (
    <button type={buttonType} className="hover:text-slate-teal">
      {buttonText}
    </button>
  );
};

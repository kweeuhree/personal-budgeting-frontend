type Props = {
  id: string;
  text: string;
  isVisible: boolean;
};

export const Tooltip: React.FC<Props> = ({ id, text, isVisible }) => {
  const visible = isVisible ? "visible opacity-100" : "invisible opacity-0";

  return (
    <div
      id={id}
      role="tooltip"
      className={`absolute z-10 ${visible} inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700`}
    >
      {text}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
};

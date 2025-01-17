import { useState } from "react";

type UseTooltip = {
  [key: string]: boolean;
};

export const useTooltip = (initialState: UseTooltip) => {
  const [isVisible, setIsVisible] = useState<UseTooltip>(initialState);

  const showTooltip = (updateField: string) => {
    setIsVisible((prev) => ({
      ...prev,
      [updateField]: true,
    }));
  };

  const removeTooltip = (updateField: string) => {
    setIsVisible((prev) => ({
      ...prev,
      [updateField]: false,
    }));
  };

  return { isVisible, showTooltip, removeTooltip };
};

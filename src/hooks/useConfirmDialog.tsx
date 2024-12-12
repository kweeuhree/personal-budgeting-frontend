import { useState } from "react";

import { Dialog } from "../components";
import { type ConfirmDialogProps } from "../types";

export const useConfirmDialog = () => {
  const [dialogProps, setDialogProps] = useState<ConfirmDialogProps | null>(
    null
  );

  const showConfirm = (message: string, onConfirm: () => void) => {
    setDialogProps({
      open: true,
      message,
      onConfirm,
      onCancel: () => setDialogProps(null),
    });
  };

  const ConfirmDialog = () =>
    dialogProps?.open ? (
      <Dialog dialogProps={dialogProps} setDialogProps={setDialogProps} />
    ) : null;

  return { showConfirm, ConfirmDialog };
};

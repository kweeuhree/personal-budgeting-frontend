import { Dispatch, SetStateAction } from "react";
import FocusLock from "react-focus-lock";
import { motion } from "framer-motion";

import { Button } from "./Button";
import { type ConfirmDialogProps } from "../types";

type Props = {
  dialogProps: ConfirmDialogProps;
  setDialogProps: Dispatch<SetStateAction<ConfirmDialogProps | null>>;
};

export const Dialog: React.FC<Props> = ({ dialogProps, setDialogProps }) => {
  return (
    <div
      className="fixed pt-4 top-0 left-0 w-full h-full bg-blue-sage flex items-start justify-center z-50"
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <FocusLock>
        <motion.div
          animate={{ y: 10 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 border border-navy">
            <p id="dialog-title" className="mb-4">
              {dialogProps.message}
            </p>
            <div className="flex justify-evenly space-x-4">
              <Button
                autofocus={true}
                onClick={() => dialogProps.onCancel()}
                buttonText="Cancel"
                buttonType="button"
              />
              <Button
                onClick={() => {
                  dialogProps.onConfirm();
                  setDialogProps(null);
                }}
                buttonText="Confirm &#9989;"
                buttonType="button"
              />
            </div>
          </div>
        </motion.div>
      </FocusLock>
    </div>
  );
};

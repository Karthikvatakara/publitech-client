import React, { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const AlertBox = ({
  button,
  ques,
  onConfirm,
  onCancel,
  option,
  placeholder,
}: {
  button: ReactNode;
  ques: string;
  onConfirm: (reason: string) => void;
  onCancel?: () => void;
  option?: boolean;
  placeholder?: string;
}) => {
  const [reason, setReason] = useState<string>("");

  const handleConfirm = () => {
    onConfirm(reason);
    setReason(""); // Reset the reason after confirming
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ques}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
            {option && (
              <div className="flex justify-center border-0 py-1 ">
                <label htmlFor="" className="text-black w-auto font-semibold">Reason :</label>
                <textarea
                  className="w-4/5 ml-3 px-5 items-center border-2"
                  placeholder={placeholder}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertBox;

import React from "react";
import { FieldValues } from "react-hook-form";
import { ErrorForInputsProps } from "@/types/forms";

const ErrorForInputs = <TFieldValues extends FieldValues>({
  fieldName,
  errors,
}: ErrorForInputsProps<TFieldValues>) => {
  return (
    <>
      {errors[fieldName] && (
        <p className="text-red-500 text-sm mt-1 input-error">
          {errors[fieldName]?.message?.toString()}
        </p>
      )}
    </>
  );
};

export default ErrorForInputs;

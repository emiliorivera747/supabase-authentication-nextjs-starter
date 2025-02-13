import React from "react";
import {
    FieldValues,
  } from "react-hook-form";

import { PrimaryInputLabelProps } from "@/types/forms";

const PrimaryInputLabel = <TFieldValues extends FieldValues> ({
  id,
  fieldName,
  placeholder,
  errors,
}: PrimaryInputLabelProps<TFieldValues>) => {
  return (
    <label
      htmlFor={id}
      className={`${
        errors[fieldName] ? "text-red-500" : "text-[#868e96] "
      } absolute text-sm left-4 top-2 peer-focus:top-2 peer-focus:left-4 peer-focus:text-sm pb-4 ${
        errors[fieldName]
          ? "peer-focus:text-red-500"
          : "peer-focus:text-[#868e96]"
      } peer-focus:font-light font-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base ${
        errors[fieldName]
          ? "peer-placeholder-shown:text-red-500"
          : "peer-placeholder-shown:text-[#868e96]"
      } peer-placeholder-shown:font-normal peer-autofill:top-2 peer-autofill:left-4 peer-autofill:text-sm`}
    >
      {placeholder}
    </label>
  );
};

export default PrimaryInputLabel;

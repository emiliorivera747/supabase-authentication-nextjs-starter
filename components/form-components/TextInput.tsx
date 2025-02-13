import React from "react";
import { FieldValues } from "react-hook-form";

//Components
import PrimaryInputLabel from "@/components/form-components/PrimaryInputLabel";
import ErrorForInputs from "@/components/errors/ErrorForInputs";

//Interface
import { TextInputProps } from "@/types/forms";

const TextInput = <TFieldValues extends FieldValues>({
  type,
  id,
  fieldName,
  placeholder,
  errors,
  register,
}: TextInputProps<TFieldValues>) => {
  return (
    <div className="relative my-2">
      <input
        type={type}
        id={id}
        {...register(fieldName)}
        className={`border-box rounded-[12px] align-text-bottom w-full px-[1rem] pt-[1.05882rem]  h-[3.2941176471rem] border leading-[1.23536] ${
          errors[fieldName] ? "border-red-500 bg-[#fff5f5] text-red-500" : "border-tertiary-600"
        } rounded-[12px] focus:outline-none focus:ring-2 ${
          errors[fieldName] ? "focus:ring-red-500" : "focus:ring-primary-500 focus:border-none"
        } peer placeholder-transparent`}
        placeholder={placeholder}
        defaultValue=""
      />

      {/* Placeholder label*/}
      <PrimaryInputLabel
        id={id}
        fieldName={fieldName}
        placeholder={placeholder}
        errors={errors}
      />

      {/* Error message */}
      <ErrorForInputs fieldName={fieldName} errors={errors} />
    </div>
  );
};
export default TextInput;

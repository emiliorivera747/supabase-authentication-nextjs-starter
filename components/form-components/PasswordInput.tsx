import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FieldValues } from "react-hook-form";
import PrimaryInputLabel from "@/components/form-components/PrimaryInputLabel";

//Components
import PasswordTooltip from "@/features/auth/components/tooltips/PasswordTooltip";
import ErrorForInputs from "@/components/errors/ErrorForInputs";


//Types
import { PasswordInputProps } from "@/types/forms";


const PasswordInput = <TFieldValues extends FieldValues>({
  id = `password-input`,
  placeholder = "Password",
  fieldName,
  errors,
  register,
  withPasswordTooltip = false,
}: 
PasswordInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target instanceof Element && !event.target.closest(`#${id}`)) {
      if (setIsFocused) setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative my-1">
      <input
      type={showPassword ? "text" : "password"}
      id={id}
      {...register(fieldName, {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setPassword) setPassword(e.target.value);
        },
      })}
      className={`border-box rounded-[12px] align-text-bottom w-full px-[1rem] pt-[1.05882rem] h-[3.2941176471rem] border leading-[1.23536] ${
        errors[fieldName] ? "border-red-500 bg-[#fff5f5] text-red-500" : "border-tertiary-600"
      } rounded-[12px] focus:outline-none focus:ring-2 ${
        errors[fieldName] ? "focus:ring-red-500" : "focus:ring-primary-500 focus:border-none"
      } peer placeholder-transparent `}
      placeholder={placeholder}
      defaultValue=""
      onFocus={() => {
        if (setIsFocused) setIsFocused(true);
      }}
      />
      {withPasswordTooltip && isFocused && password && <PasswordTooltip password={password} />}

      {/* Password Visibility */}
      <div
      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-[3.2941176471rem]"
      onClick={togglePasswordVisibility}
      >
      {showPassword ? (
        <FaEyeSlash
        className={`${
          errors[fieldName] ? "text-red-500" : "text-[#868e96]"
        }`}
        />
      ) : (
        <FaEye
        className={`${
          errors[fieldName] ? "text-red-500" : "text-[#868e96]"
        }`}
        />
      )}
      </div>

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
export default PasswordInput;

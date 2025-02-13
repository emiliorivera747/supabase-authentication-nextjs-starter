import React from "react";

//Components
import PasswordStrengthChecker from "@/features/auth/components/password-strength-checker/PasswordStrengthChecker";

//Icons
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

const passwordCriteria = [
  { regex: /.{8,}/, label: "At least 8 characters" },
  { regex: /[0-9]/, label: "At least 1 number" },
  { regex: /[a-z]/, label: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, label: "At least 1 uppercase letter" },
  { regex: /[^A-Za-z0-9]/, label: "At least 1 special character" },
];

const PasswordTooltip = ({ password }: { password: string }) => {
  return (
    <div className="relative z-50">
      <div className="absolute bg-tertiary-200 border border-gray-300 shadow-md w-[18rem] p-4 z-50 rounded-[12px]">
        <PasswordStrengthChecker password={password} />
        <div className="text-[0.8rem] mb-1 text-[#343a40] font-semibold mt-1">
          Your password must have:
        </div>
        {passwordCriteria.map((criteria, index) => {
          const isValid = criteria.regex.test(password);
          return (
            <div
              key={index}
              className="flex items-center mb-[0.1rem] text-[0.8rem]"
            >
              {isValid ? (
                <IoIosCheckmarkCircle className="text-green-700 mr-2" />
              ) : (
                <IoIosCloseCircle className="text-[#adb5bd] mr-2" />
              )}
              <span className={isValid ? "text-green-700" : "text-[#adb5bd]"}>
                {criteria.label}
              </span>
            </div>
          );
        })}
        {/* <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-gray-300"></div>
        <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-tertiary-200"></div> */}
      </div>
    </div>
  );
};

export default PasswordTooltip;

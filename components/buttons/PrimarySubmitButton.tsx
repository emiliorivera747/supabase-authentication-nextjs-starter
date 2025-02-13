import React from "react";
import { useFormStatus } from "react-dom";
import DotLoader from "@/components/loading/DotLoader";
interface SubmitButtonProps {
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  withLinearGradient?: boolean;
  bgFrom?: string;
  bgTo?: string;
  hoverBgFrom?: string;
  hoverBgTo?: string;
}

const PrimarySubmitButton = ({
  bgColor = "bg-blue-500",
  textColor = "text-white",
  hoverBgColor = "hover:bg-blue-700",
  text = "Submit",
  withLinearGradient = true,
  bgFrom= "from-primary-700",
  bgTo = "to-primary-800",
  hoverBgFrom = "hover:from-blue-700",
  hoverBgTo = "hover:to-blue-700",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  const buttonClass = withLinearGradient
    ? `flex items-center justify-center w-full bg-gradient-to-r ${bgFrom} ${bgTo} ${textColor} px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] ${hoverBgFrom} ${hoverBgTo} transition duration-300`
    : `flex items-center justify-center w-full ${bgColor} ${textColor} px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] ${hoverBgColor} transition duration-300`;

  return (
    <button
      type="submit"
      className={buttonClass}
      disabled={pending}
    >
      {pending ? (
        <DotLoader
          bgColor="bg-blue-200"
          dotHeight="h-2"
          dotWidth="w-2"
          containerHeight="h-5"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default PrimarySubmitButton;

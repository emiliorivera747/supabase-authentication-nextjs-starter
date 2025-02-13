import React from "react";
import { MdErrorOutline } from "react-icons/md";

interface Props {
  errMsg: string;
}
const PrimaryErrorMessage = ({ errMsg }: Props) => {
  return (
    <div className="primary-error-message w-full font-medium p-4 py-6  rounded-[12px] bg-[#fff5f5] border border-red-500 text-red-500 flex flex-row gap-2 justify-center items-center mb-2 my-4">
      <strong className="text-xl">
        <MdErrorOutline />
      </strong>
      <span className="block text-sm">{errMsg}</span>
    </div>
  );
};

export default PrimaryErrorMessage;

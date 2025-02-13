import React from "react";


const ButtonSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 border-4 border-t-4 border-tertiary-300 border-t-tertiary-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default ButtonSpinner;

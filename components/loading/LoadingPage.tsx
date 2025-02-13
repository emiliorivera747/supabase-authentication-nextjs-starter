import React from "react";
import DotLoader from "@/components/loading/DotLoader";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center ">
      <div className="translate-y-[-50%] flex flex-col items-center justify-center">
        <div className="text-black font-bold text-4xl  mb-2">Trellis Money</div>
        <div className="text-tertiary-800 text-sm mb-4">
          Seeing value where others don’t
        </div>
        <DotLoader bgColor="bg-primary-300" dotWidth="w-3" dotHeight="h-3" />
      </div>
    </div>
  );
};

export default LoadingPage;

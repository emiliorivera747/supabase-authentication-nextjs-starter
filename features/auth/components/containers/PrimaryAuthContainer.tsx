import React from "react";

const PrimaryAuthContainer = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col w-[480px] pt-8 rounded-lg min-h-screen h-auto mb-auto mt-[1%] box-border px-6">
            {children}
        </div>
    );
};

export default PrimaryAuthContainer;

import React from "react";

const BigSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute h-24 w-24 top-0 left-0 rounded-full border-t-8 border-b-8 border-[#d97708] animate-spin"></div>
      </div>
    </div>
  );
};

export default BigSpinner;

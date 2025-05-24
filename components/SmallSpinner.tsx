import React from "react";

const SmallSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="h-10 w-10 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute h-10 w-10 top-0 left-0 rounded-full border-t-8 border-b-8 border-[#d97708] animate-spin"></div>
      </div>
    </div>
  );
};

export default SmallSpinner;

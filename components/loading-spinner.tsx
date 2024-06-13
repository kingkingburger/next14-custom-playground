import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default LoadingSpinner;

import React from 'react';
import {LoadingSpinnerXL} from "@/components/LoadingSpinners";

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoadingSpinnerXL />
    </div>
  );
};

export default LoadingScreen;
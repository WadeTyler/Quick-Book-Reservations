import React from 'react';
import Image from "next/image";
import {ManagedBusiness} from "@/types/business.types";

const ManagedBusinessImagePanel = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {

  return (
    <div className="w-full h-full flex flex-col bg-background-secondary rounded-md shadow-md overflow-hidden">
      <div className="w-full h-48 relative bg-gray-400">
        {managedBusiness.image && (
          <Image src={managedBusiness.image} alt={`${managedBusiness.name} Image`} fill={true} objectFit="cover" objectPosition="center" />
        )}
      </div>

      <div className="w-full p-4 flex flex-col gap-4">
        <h2 className="font-semibold text-xl">Business Image</h2>
        <button className="submit-btn3 mt-auto">Change Image</button>
      </div>
    </div>
  );
};

export default ManagedBusinessImagePanel;
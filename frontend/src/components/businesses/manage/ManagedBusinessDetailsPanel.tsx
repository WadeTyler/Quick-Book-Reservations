import React from 'react';
import {ManagedBusiness} from "@/types/business.types";

const ManagedBusinessDetailsPanel = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {
  return (
    <div className="w-full p-4 flex flex-col gap-4 bg-background-secondary rounded-md shadow-md">
      <h2 className="font-semibold text-xl">Business Details</h2>
      <p>Owner: {managedBusiness.owner?.firstName + " " + managedBusiness.owner?.lastName}</p>
      <p>Created At: {new Date(managedBusiness.createdAt).toLocaleDateString()}</p>
      <p className="wrap-anywhere">Description: {managedBusiness.description}</p>

      <button className="submit-btn3 mt-auto">Change Description</button>
    </div>
  );
};

export default ManagedBusinessDetailsPanel;
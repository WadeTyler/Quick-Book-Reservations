import React from 'react';
import {ManagedBusiness} from "@/types/business.types";
import Link from "next/link";

const ManagedBusinessAdminPanel = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {
  return (
    <div className="w-full p-4 flex flex-col gap-4 bg-background-secondary rounded-md shadow-md">
      <h2 className="font-semibold text-xl">Administrator Options</h2>
      <p className="text-gray-400">This panel is only visible to Administrators and the Business Owner.</p>

      <Link href={`/businesses/manage/${managedBusiness.id}/delete`} className="delete-btn3 mt-auto">Delete Business</Link>

    </div>
  );
};

export default ManagedBusinessAdminPanel;
import React from 'react';
import Link from "next/link";
import {ManagedBusiness} from "@/types/business.types";

const StaffManagementInfo = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {
  return (
    <div className="w-full p-4 flex flex-col gap-4 bg-background-secondary rounded-md shadow-md lg:col-span-2">
      <h2 className="font-semibold text-xl">About Staff Management</h2>

      <div className="flex flex-col gap-2">
        <p>Staff members can:</p>
        <ul className="list-disc list-inside ml-4 text-gray-600">
          <li>View business details</li>
          <li>Manage reservations</li>
          <li>View customer information</li>
        </ul>

        <p className="mt-2">Staff members cannot:</p>
        <ul className="list-disc list-inside ml-4 text-gray-600">
          <li>Add or remove other staff members</li>
          <li>Delete the business</li>
          <li>Change business ownership</li>
        </ul>
      </div>

      <div className="mt-4">
        <Link href={`/businesses/manage/${managedBusiness.id}`}
              className="text-accent underline hover:text-accent-dark">
          Back to Business Management
        </Link>
      </div>
    </div>
  );
};

export default StaffManagementInfo;
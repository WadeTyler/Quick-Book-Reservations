import React from 'react';
import {ManagedBusiness} from "@/types/business.types";
import Link from "next/link";

const ManagedBusinessStaffPanel = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {
  return (
    <div className="w-full p-4 flex flex-col gap-4 bg-background-secondary rounded-md shadow-md">
      <h2 className="font-semibold text-xl">Staff</h2>

      <p>
        <span className="text-accent font-semibold text-3xl">{managedBusiness.staff.length || 0}</span> Staff Members
      </p>
      
      <Link href={`/businesses/manage/${managedBusiness.id}/staff`} className="submit-btn3 mt-auto">Manage Staff</Link>

    </div>
  );
};

export default ManagedBusinessStaffPanel;
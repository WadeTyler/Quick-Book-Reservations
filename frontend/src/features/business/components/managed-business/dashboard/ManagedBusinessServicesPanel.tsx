import React from 'react';
import {ManagedBusiness} from "@/types/business.types";
import Link from "next/link";

const ManagedBusinessServicesPanel = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {
  return (
    <div className="w-full p-4 flex flex-col gap-4 bg-background-secondary rounded-md shadow-md">
      <h2 className="font-semibold text-xl">Services</h2>
      <p>
        <span className="text-accent font-semibold text-3xl">{managedBusiness.serviceOfferings.length}</span> Services
      </p>

      <Link href={`/businesses/manage/${managedBusiness.id}/services`} className="submit-btn3 mt-auto">Manage Services</Link>

    </div>
  );
};

export default ManagedBusinessServicesPanel;
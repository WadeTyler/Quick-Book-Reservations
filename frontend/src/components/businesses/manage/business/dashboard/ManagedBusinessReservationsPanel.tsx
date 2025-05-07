import React from 'react';
import {ManagedBusiness} from "@/types/business.types";
import Link from "next/link";

const ManagedBusinessReservationsPanel = ({managedBusiness}: {
  managedBusiness: ManagedBusiness;
}) => {
  return (
    <div className="w-full p-4 flex flex-col gap-4 bg-background-secondary rounded-md shadow-md">
      <h2 className="font-semibold text-xl">Reservations</h2>
      <p>
        <span className="text-accent font-semibold text-3xl">
          {managedBusiness.upcomingReservationCount || 0}
        </span>
        Upcoming Reservations
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-auto items-center">
        <Link href={`/businesses/manage/${managedBusiness.id}/reservations`} className="submit-btn3">Manage All Reservations</Link>
        <Link href={`/businesses/${managedBusiness.id}/reservations/create`} className="submit-btn3">Create Reservation</Link>
      </div>
    </div>
  );
};

export default ManagedBusinessReservationsPanel;
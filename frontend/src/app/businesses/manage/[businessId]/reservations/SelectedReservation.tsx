import React from 'react';
import {Reservation} from "@/types/reservation.types";
import Overlay from "@/components/Overlay";
import {ClickAwayListener} from "@mui/material";
import {ManagedBusiness} from "@/types/business.types";

type Props = {
  selectedReservation: Reservation;
  closeFn: () => void;
  managedBusiness: ManagedBusiness;
}

const SelectedReservation = ({selectedReservation, managedBusiness, closeFn}: Props) => {

  // Helper function to get service name
  function getServiceName(serviceId: number) {
    return managedBusiness.serviceOfferings.find(s => s.id === serviceId)?.name;
  }

  return (
    <Overlay>
      <ClickAwayListener onClickAway={closeFn}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 className="text-2xl font-semibold mb-4 text-accent">Reservation Details</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Service:</span> {getServiceName(selectedReservation.serviceOfferingId)}</p>
            <p><span className="font-medium">Name:</span> {selectedReservation.firstName} {selectedReservation.lastName}
            </p>
            <p><span className="font-medium">Email:</span> {selectedReservation.email}</p>
            <p><span className="font-medium">Phone:</span> {selectedReservation.phoneNumber}</p>
            <p><span className="font-medium">Date:</span> {selectedReservation.date}</p>
            <p><span className="font-medium">Time:</span> {selectedReservation.time}</p>
          </div>


          <div className="flex items-center justify-end gap-4 mt-auto">
            <div className="delete-btn3">Remove Reservation</div>
          </div>
        </div>
      </ClickAwayListener>
    </Overlay>
  );
};

export default SelectedReservation;
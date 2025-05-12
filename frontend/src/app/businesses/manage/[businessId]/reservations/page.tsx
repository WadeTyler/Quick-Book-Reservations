import React from 'react';
import {Metadata} from "next";
import ManageReservationsContainer
  from "@/features/reservation/components/ManageReservationsContainer";


const metadata: Metadata = {
  title: "Manage Reservations | Quick Book",
  description: "Manage reservations for your business."
}

const ManageReservationsPage = () => {
  return (
    <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col items-center">
      <ManageReservationsContainer />
    </div>
  );
};

export default ManageReservationsPage;
"use client";


import CreateReservationContainer
  from "@/app/(business)/businesses/[businessId]/create-reservation/_components/CreateReservationContainer";
import {ReservationProvider} from "@/features/reservation/ReservationContext";

function CreateReservationPage() {
  return (
    <ReservationProvider>
      <CreateReservationContainer />
    </ReservationProvider>
  )
}

export default CreateReservationPage;

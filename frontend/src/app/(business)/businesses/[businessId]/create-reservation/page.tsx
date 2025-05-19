"use client";


import CreateReservationContainer
  from "@/app/(business)/businesses/[businessId]/create-reservation/_components/CreateReservationContainer";
import {ReservationProvider} from "@/features/reservation/ReservationContext";

function CreateReservationPage() {
  return (
    <ReservationProvider>
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-muted/40 py-16 p-6 pt-32">
      <CreateReservationContainer />
      </div>
    </ReservationProvider>
  )
}

export default CreateReservationPage;

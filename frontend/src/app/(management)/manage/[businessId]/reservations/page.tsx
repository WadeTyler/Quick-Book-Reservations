import ManageReservationsContainer
  from "@/app/(management)/manage/[businessId]/reservations/_components/ManageReservationsContainer";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Manage Reservations | Quick Book",
  description: "Manage your reservations."
}

export default function ManageReservationsPage() {
  return (
    <div className="mt-32">
      <ManageReservationsContainer />
    </div>
  )
}
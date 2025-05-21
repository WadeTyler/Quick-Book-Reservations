import {ReactNode} from "react";
import {ManagedBusinessProvider} from "@/features/business/context/ManagedBusinessContext";
import AuthOnly from "@/features/auth/components/AuthOnly";
import {ManageReservationProvider} from "@/features/reservation/context/ManageReservationContext";

export default function ManagementLayout({children}: { children: ReactNode }) {
  return (
    <AuthOnly redirect={true}>
      <ManagedBusinessProvider>
        <ManageReservationProvider>
          {children}
        </ManageReservationProvider>
      </ManagedBusinessProvider>
    </AuthOnly>
  )
}
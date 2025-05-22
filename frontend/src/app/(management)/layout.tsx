import {ReactNode} from "react";
import {ManagedBusinessProvider} from "@/features/business/context/ManagedBusinessContext";
import AuthOnly from "@/features/auth/components/AuthOnly";
import {ManageReservationProvider} from "@/features/reservation/context/ManageReservationContext";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Quick Book",
  description: "Create and manage reservations for your business within minutes!",
};

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
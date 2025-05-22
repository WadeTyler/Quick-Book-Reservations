import {ReactNode} from "react";
import {BusinessProvider} from "@/features/business/context/BusinessContext";
import {ServiceOfferingProvider} from "@/features/service-offering/context/ServiceOfferingContext";
import {ReservationProvider} from "@/features/reservation/context/ReservationContext";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Quick Book",
  description: "Create and manage reservations for your business within minutes!",
};

export default function ManagementLayout({children}: { children: ReactNode }) {
  return (
    <BusinessProvider>
      <ServiceOfferingProvider>
        <ReservationProvider>
          {children}
        </ReservationProvider>
      </ServiceOfferingProvider>
    </BusinessProvider>
  )
}
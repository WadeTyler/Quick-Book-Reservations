import {ReactNode} from "react";
import {BusinessProvider} from "@/features/business/context/BusinessContext";
import {ServiceOfferingProvider} from "@/features/service-offering/context/ServiceOfferingContext";

export default function ManagementLayout({children}: { children: ReactNode }) {
  return (
    <BusinessProvider>
      <ServiceOfferingProvider>
        {children}
      </ServiceOfferingProvider>
    </BusinessProvider>
  )
}
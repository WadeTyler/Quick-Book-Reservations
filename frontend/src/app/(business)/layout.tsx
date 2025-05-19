import {ReactNode} from "react";
import {BusinessProvider} from "@/features/business/hooks/BusinessContext";
import {ServiceOfferingProvider} from "@/features/service-offering/hooks/ServiceOfferingContext";

export default function ManagementLayout({children}: { children: ReactNode }) {
  return (
    <>
      <BusinessProvider>
        <ServiceOfferingProvider>
          {children}
        </ServiceOfferingProvider>
      </BusinessProvider>
    </>
  )
}
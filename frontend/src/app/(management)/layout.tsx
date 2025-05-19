import {ReactNode} from "react";
import {ManagedBusinessProvider} from "@/features/business/hooks/ManagedBusinessContext";

export default function ManagementLayout({children}: { children: ReactNode }) {
  return (
    <ManagedBusinessProvider>
      {children}
    </ManagedBusinessProvider>
  )
}
import {ReactNode} from "react";
import {ManagedBusinessProvider} from "@/features/business/context/ManagedBusinessContext";
import AuthOnly from "@/features/auth/components/AuthOnly";

export default function ManagementLayout({children}: { children: ReactNode }) {
  return (
    <AuthOnly redirect={true}>
      <ManagedBusinessProvider>
        {children}
      </ManagedBusinessProvider>
    </AuthOnly>
  )
}
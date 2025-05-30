"use client";

import {useEffect} from "react";
import Loader from "@/components/ui/loader";
import ManagedBusinessPanel from "@/app/(management)/dashboard/_components/ManagedBusinessPanel";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";

export default function ManagedBusinessList() {

  const {
    managedBusinesses,
    loadManagedBusinesses,
    isLoadingManagedBusinesses,
    loadManagedBusinessesError
  } = useManagedBusiness();

  useEffect(() => {
    loadManagedBusinesses();
  }, []);

  if (isLoadingManagedBusinesses) return <Loader className="size-24 text-accent mx-auto"/>

  else if (loadManagedBusinessesError) return (
    <p className="text-destructive text-lg text-balance">{loadManagedBusinessesError}</p>
  )

  else if (managedBusinesses) {
   if (managedBusinesses.length > 0) return (
     <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
       {managedBusinesses.map(managedBusinesses => (
         <ManagedBusinessPanel managedBusiness={managedBusinesses} key={managedBusinesses.id} />
       ))}
     </div>
   )
   else return (
     <p className="mx-auto text-center text-balance text-foreground/70">You have not created any businesses.</p>
   )
  }

  return null;
}
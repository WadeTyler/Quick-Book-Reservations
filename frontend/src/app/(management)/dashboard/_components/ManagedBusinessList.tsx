"use client";

import {useBusiness} from "@/features/business/hooks/BusinessContext";
import {useEffect} from "react";
import Loader from "@/components/ui/loader";
import ManagedBusinessPanel from "@/app/(management)/dashboard/_components/ManagedBusinessPanel";

export default function ManagedBusinessList() {

  const {
    managedBusinesses,
    loadManagedBusinesses,
    isLoadingManagedBusinesses,
    loadManagedBusinessesError
  } = useBusiness();

  useEffect(() => {
    loadManagedBusinesses();
  }, []);

  if (isLoadingManagedBusinesses) return <Loader className="size-24 text-accent mx-auto"/>

  else if (loadManagedBusinessesError) return (
    <p className="text-destructive text-lg text-balance">{loadManagedBusinessesError}</p>
  )

  else if (managedBusinesses) return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {managedBusinesses.map(managedBusinesses => (
        <ManagedBusinessPanel managedBusiness={managedBusinesses} key={managedBusinesses.id} />
      ))}
    </div>
  )

  return null;
}
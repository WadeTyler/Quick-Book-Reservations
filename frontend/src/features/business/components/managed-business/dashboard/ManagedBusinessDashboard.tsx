"use client";
import React from 'react';
import {LoadingSpinnerXL} from "@/components/LoadingSpinners";
import Link from "next/link";
import ManagedBusinessDetailsPanel from "@/features/business/components/managed-business/dashboard/ManagedBusinessDetailsPanel";
import ManagedBusinessReservationsPanel from "@/features/business/components/managed-business/dashboard/ManagedBusinessReservationsPanel";
import ManagedBusinessStaffPanel from "@/features/business/components/managed-business/dashboard/ManagedBusinessStaffPanel";
import ManagedBusinessServicesPanel from "@/features/business/components/managed-business/dashboard/ManagedBusinessServicesPanel";
import ManagedBusinessAdminPanel from "@/features/business/components/managed-business/dashboard/ManagedBusinessAdminPanel";
import AuthProvider from "@/features/auth/providers/AuthProvider";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/features/business/lib/manage-business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/features/auth/lib/auth.service";

const ManagedBusinessDashboard = () => {

  const {businessId} = useParams();

  const {
    data: managedBusiness,
    isPending: isLoadingManagedBusiness,
    error: loadManagedBusinessError
  } = useQuery<ManagedBusiness | null>({
    queryKey: ['managedBusiness'],
    queryFn: async () => await fetchManagedBusinessById((businessId as string)),
    retry: 1
  });

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser,
  });

  return (
    <AuthProvider forceAuth={true}>
      {/* Is Loading Business */}
      {isLoadingManagedBusiness && (
        <LoadingSpinnerXL/>
      )}

      {/* No Business Found */}
      {!isLoadingManagedBusiness && loadManagedBusinessError && (
        <>
          <span className="text-xl">{(loadManagedBusinessError as Error).message}</span>
          <Link href="/businesses/manage" className="text-accent underline hover:text-accent-dark">View your Managed
            Businesses</Link>
        </>
      )}

      {/* Business Found */}
      {!isLoadingManagedBusiness && !loadManagedBusinessError && managedBusiness && (
        <div className="flex flex-col w-full gap-8">
          <h1 className="text-accent font-semibold tracking-wide text-3xl">{managedBusiness.name}</h1>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">

            {/* Business Details */}
            <ManagedBusinessDetailsPanel managedBusiness={managedBusiness}/>

            {/* Reservations */}
            <ManagedBusinessReservationsPanel managedBusiness={managedBusiness}/>

            {/* Staff */}
            <ManagedBusinessStaffPanel managedBusiness={managedBusiness}/>

            {/* Services */}
            <ManagedBusinessServicesPanel managedBusiness={managedBusiness}/>

            {/* Administrator */}
            {managedBusiness.owner.id === authUser?.id && (
              <ManagedBusinessAdminPanel managedBusiness={managedBusiness}/>
            )}
          </div>
        </div>
      )}

    </AuthProvider>
  );
};

export default ManagedBusinessDashboard;
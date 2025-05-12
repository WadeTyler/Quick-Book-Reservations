"use client";
import React from 'react';
import AuthProvider from "@/features/auth/providers/AuthProvider";
import ManageReservationsBreadcrumbs
  from "@/features/reservation/components/ManageReservationsBreadcrumbs";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/features/auth/lib/auth.service";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/features/business/lib/manage-business.service";
import {useParams} from "next/navigation";
import LoadingHandler from "@/components/LoadingHandler";
import ReservationsTable from "@/features/reservation/components/ReservationsTable";

const ManageReservationsContainer = () => {

  const {businessId} = useParams();

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser,
  });

  const {data:managedBusiness, isPending: isLoadingManageBusiness, error: loadManagedBusinessError} = useQuery<ManagedBusiness | null>({
    queryKey: ['managedBusiness'],
    queryFn: async () => await fetchManagedBusinessById((businessId as string)),
    retry: 1
  });

  return (
    <AuthProvider forceAuth={true}>
      <ManageReservationsBreadcrumbs />
      <LoadingHandler isLoading={isLoadingManageBusiness} object={managedBusiness} error={loadManagedBusinessError}>

        <div className="w-full flex flex-col items-center justify-center">
          {managedBusiness && (
            <ReservationsTable managedBusiness={managedBusiness} />
          )}
        </div>

      </LoadingHandler>
    </AuthProvider>
  );
};

export default ManageReservationsContainer;
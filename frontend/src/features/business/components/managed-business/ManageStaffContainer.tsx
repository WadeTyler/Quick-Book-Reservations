"use client";
import React from 'react';
import {LoadingSpinnerXL} from "@/components/LoadingSpinners";
import Link from "next/link";
import StaffList from "@/features/business/components/managed-business/StaffList";
import AddStaffMember from "@/features/business/components/managed-business/AddStaffMember";
import AuthProvider from "@/features/auth/providers/AuthProvider";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/features/business/lib/manage-business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/features/auth/lib/auth.service";

const ManageStaffContainer = () => {

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
          <h1 className="text-accent font-semibold tracking-wide text-3xl">{managedBusiness.name} - Staff
            Management</h1>

          {/* Staff List */}
          <StaffList managedBusiness={managedBusiness}/>


          {/* Add Staff Form */}
          {managedBusiness.owner.id === authUser?.id && (
            <AddStaffMember managedBusiness={managedBusiness}/>
          )}


        </div>
      )}
    </AuthProvider>
  );
};

export default ManageStaffContainer;
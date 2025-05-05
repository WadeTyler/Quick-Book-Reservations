'use client';
import React from 'react';
import {useParams} from "next/navigation";
import AuthProvider from "@/providers/AuthProvider";
import {useQuery} from "@tanstack/react-query";
import {fetchManagedBusinessById} from "@/lib/business.service";
import {LoadingSpinnerXL} from "@/components/LoadingSpinners";
import Link from "next/link";
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";
import {ManagedBusiness} from "@/types/business.types";
import ManagedBusinessImagePanel from "@/components/businesses/manage/ManagedBusinessImagePanel";
import ManagedBusinessDetailsPanel from "@/components/businesses/manage/ManagedBusinessDetailsPanel";
import ManagedBusinessReservationsPanel from "@/components/businesses/manage/ManagedBusinessReservationsPanel";
import ManagedBusinessStaffPanel from "@/components/businesses/manage/ManagedBusinessStaffPanel";
import ManagedBusinessServicesPanel from "@/components/businesses/manage/ManagedBusinessServicesPanel";
import ManagedBusinessAdminPanel from "@/components/businesses/manage/ManagedBusinessAdminPanel";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";

const ManageBusinessPage = () => {

  const {businessId} = useParams();

  const {data:managedBusiness, isPending: isLoadingManagedBusiness, error:loadManagedBusinessError } = useQuery<ManagedBusiness | null>({
    queryKey: ['managedBusiness'],
    queryFn: async () => await fetchManagedBusinessById((businessId as string)),
    retry: 1
  });

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
    {name: `${managedBusiness ? managedBusiness.name : "Manage Business"}`, href: `/businesses/manage/${businessId}`}
  ]

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser,
  });

  return (
    <AuthProvider forceAuth={true}>
      <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col gap-4 items-center">
        <Breadcrumbs breadcrumbs={breadcrumbs}/>

        {/* Is Loading Business */}
        {isLoadingManagedBusiness && (
          <LoadingSpinnerXL />
        )}

        {/* No Business Found */}
        {!isLoadingManagedBusiness && loadManagedBusinessError && (
          <>
            <span className="text-xl">{(loadManagedBusinessError as Error).message}</span>
            <Link href="/businesses/manage" className="text-accent underline hover:text-accent-dark">View your Managed Businesses</Link>
          </>
        )}

        {/* Business Found */}
        {!isLoadingManagedBusiness && !loadManagedBusinessError && managedBusiness && (
          <div className="flex flex-col w-full gap-8">
            <h1 className="text-accent font-semibold tracking-wide text-3xl">{managedBusiness.name}</h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">

              {/* Reservations */}
              <ManagedBusinessReservationsPanel managedBusiness={managedBusiness} />

              {/* Staff */}
              <ManagedBusinessStaffPanel managedBusiness={managedBusiness} />

              {/* Services */}
              <ManagedBusinessServicesPanel managedBusiness={managedBusiness} />

              {/* Business Image */}
              <ManagedBusinessImagePanel managedBusiness={managedBusiness} />

              {/* Business Details */}
              <ManagedBusinessDetailsPanel managedBusiness={managedBusiness} />

              {/* Administrator */}
              {managedBusiness.owner.id === authUser?.id && (
                <ManagedBusinessAdminPanel managedBusiness={managedBusiness} />
              )}


            </div>


          </div>
        )}

      </div>
    </AuthProvider>
  );

};

export default ManageBusinessPage;
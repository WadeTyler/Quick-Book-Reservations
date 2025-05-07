'use client';
import React from 'react';
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/lib/business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";
import {LoadingSpinnerXL} from "@/components/LoadingSpinners";
import Link from "next/link";
import AuthProvider from '@/providers/AuthProvider';
import AddStaffMember from "@/components/businesses/manage/staff/AddStaffMember";
import StaffList from "@/components/businesses/manage/staff/StaffList";
import StaffManagementInfo from "@/components/businesses/manage/staff/StaffManagementInfo";

const ManageStaffPage = () => {

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

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
    {name: `${managedBusiness ? managedBusiness.name : "Manage Business"}`, href: `/businesses/manage/${businessId}`},
    {name: "Staff", href: `/businesses/manage/${businessId}/staff`}
  ]

  return (
    <AuthProvider forceAuth={true}>
      <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col gap-4 items-center">
        <Breadcrumbs breadcrumbs={breadcrumbs}/>

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

            {/* Staff Management Info */}
            <StaffManagementInfo managedBusiness={managedBusiness} />
          </div>
        )}

      </div>
    </AuthProvider>
  );
};

export default ManageStaffPage;

"use client";
import React from 'react';
import ManagedServicePanel from "@/components/businesses/manage/business/services/ManagedServicePanel";
import CreateServicePanel from "@/components/businesses/manage/business/services/CreateServicePanel";
import LoadingHandler from "@/components/util/LoadingHandler";
import AuthProvider from "@/providers/AuthProvider";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/lib/manage-business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";

const ServicesList = () => {

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
      <LoadingHandler isLoading={isLoadingManagedBusiness} object={managedBusiness} error={loadManagedBusinessError} errorBackLink={`/businesses/manage/${businessId}`} errorBackLinkText={"Back to Manage Business"}>
        <div className="w-full max-w-[55rem] flex flex-col items-center justify-center gap-4">

          {/* List Services */}
          {managedBusiness?.serviceOfferings.map((serviceOffering) => (
            <ManagedServicePanel key={serviceOffering.id} businessId={managedBusiness.id} serviceOffering={serviceOffering}/>
          ))}

          {managedBusiness && managedBusiness?.owner.id === authUser?.id && (
            <CreateServicePanel businessId={managedBusiness.id}/>
          )}

        </div>
      </LoadingHandler>
    </AuthProvider>
  );
};

export default ServicesList;
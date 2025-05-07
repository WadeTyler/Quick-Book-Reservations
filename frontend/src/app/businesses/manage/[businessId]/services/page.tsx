'use client';
import React from 'react';
import AuthProvider from "@/providers/AuthProvider";
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";
import {useQuery} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/lib/business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";
import {useParams} from "next/navigation";
import ManagedServicePanel from "@/components/businesses/manage/services/ManagedServicePanel";
import CreateServicePanel from "@/components/businesses/manage/services/CreateServicePanel";
import LoadingHandler from "@/components/util/LoadingHandler";

const ManageServicesPage = () => {

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
    {name: 'Manage Services', href: `/businesses/manage/${businessId}/services`}
  ]

  return (
    <AuthProvider forceAuth={true}>
      <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col items-center">
        <Breadcrumbs breadcrumbs={breadcrumbs}/>

       <LoadingHandler isLoading={isLoadingManagedBusiness} object={managedBusiness} error={loadManagedBusinessError} errorBackLink={`/businesses/manage/${businessId}`} errorBackLinkText={"Back to Manage Business"}>
          <div className="w-full max-w-[55rem] flex flex-col items-center justify-center gap-4">
            <h1>Manage Services</h1>
            <p>Manage and Create Services for your business!</p>

            {/* List Services */}
            {managedBusiness?.services.map((service) => (
              <ManagedServicePanel key={service.id} businessId={managedBusiness.id} service={service}/>
            ))}

            {managedBusiness && managedBusiness?.owner.id === authUser?.id && (
              <CreateServicePanel businessId={managedBusiness.id}/>
            )}

          </div>
       </LoadingHandler>


      </div>
    </AuthProvider>
  );
};

export default ManageServicesPage;
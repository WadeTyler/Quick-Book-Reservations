'use client';
import React, {useEffect, useState} from 'react';
import AuthProvider from "@/providers/AuthProvider";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/lib/business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";
import LoadingHandler from "@/components/util/LoadingHandler";
import ImageContainer from "@/components/businesses/ImageContainer";
import Link from "next/link";
import Overlay from "@/components/util/Overlay";
import ChangeServiceDetails from "@/components/businesses/manage/services/service/ChangeServiceDetails";

const ManageServicePage = () => {


  const {businessId, serviceId} = useParams();
  const queryClient = useQueryClient();

  const [isChangingDetails, setIsChangingDetails] = useState<boolean>(false);

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

  const {data: targetService, isPending: isLoadingService, error: loadServiceError} = useQuery({
    queryKey: ['targetService'],
    queryFn: () => {
      if (!managedBusiness) {
        throw new Error("Managed business not found.");
      }

      const service = managedBusiness.services.find(s => s.id === parseInt(serviceId as string));

      if (!service) throw new Error("Service not found.");
      return service;
    }
  });

  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['targetService']});
  }, [managedBusiness]);

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
    {name: `${managedBusiness ? managedBusiness.name : "Manage Business"}`, href: `/businesses/manage/${businessId}`},
    {name: 'Manage Services', href: `/businesses/manage/${businessId}/services`},
    {
      name: `${targetService ? targetService.name : 'Manage Service'}`,
      href: `/businesses/manage/${businessId}/services/${serviceId}`
    }
  ];

  return (
    <AuthProvider forceAuth={true}>
      <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col items-center gap-4">
        <Breadcrumbs breadcrumbs={breadcrumbs}/>

        {/* Handle Load Managed Business */}
        <LoadingHandler isLoading={isLoadingManagedBusiness} object={managedBusiness} error={loadManagedBusinessError}
                        errorBackLink={`/businesses/manage/${businessId}/services`}>
          {/* Handle Load Service */}
          <LoadingHandler isLoading={isLoadingService} object={targetService} error={loadServiceError}>
            <main className="flex flex-col max-w-[55rem] w-full bg-background-secondary rounded-md overflow-hidden">
              {managedBusiness && authUser && targetService && (
                <>
                  <ImageContainer image={targetService.image} alt={`${targetService.name}'s Image`}/>

                  <div className="w-full flex flex-col gap-4 p-4">
                    <h1>{targetService.name}</h1>
                    <p>Created At: {new Date(targetService.createdAt).toLocaleDateString()}</p>
                    <p>Type: {targetService.type}</p>
                    <p>{targetService.description}</p>

                    {/* Action Buttons */}
                    <div className=" w-full mt-auto flex gap-4">
                      {/* Owner Actions */}
                      {managedBusiness.owner.id === authUser.id && (
                        <>
                          <button className="submit-btn3" onClick={() => setIsChangingDetails(true)}>Change Details
                          </button>
                          <Link href={`/businesses/manage/${businessId}/services/${serviceId}/delete`}
                                className="delete-btn3">Delete Service</Link>
                        </>
                      )}
                    </div>
                  </div>

                  {isChangingDetails && (
                    <Overlay>
                      <ChangeServiceDetails service={targetService} closeFn={() => setIsChangingDetails(false)}/>
                    </Overlay>
                  )}

                </>
              )}


            </main>
          </LoadingHandler>
        </LoadingHandler>

      </div>
    </AuthProvider>
  );
};

export default ManageServicePage;
"use client";
import React, {FormEvent, useEffect, useState} from 'react';
import LoadingHandler from "@/components/LoadingHandler";
import Link from "next/link";
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";
import AuthProvider from "@/features/auth/providers/AuthProvider";
import {useParams, useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/features/business/lib/manage-business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/features/auth/lib/auth.service";
import {findServiceOfferingInManagedBusiness} from "@/features/service-offering/util/service-offering.util";
import {deleteService} from "@/features/service-offering/lib/service-offering.service";

const DeleteServiceForm = () => {

  const {businessId, serviceId} = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

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
    queryFn: () => findServiceOfferingInManagedBusiness(managedBusiness, serviceId)
  });

  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['targetService']});
  }, [managedBusiness]);

  const [confirmText, setConfirmText] = useState<string>('');

  const {mutate: handleDeleteService, isPending: isDeleting, error: deleteError} = useMutation({
    mutationFn: deleteService,
    onSuccess: (updatedManagedBusiness: ManagedBusiness) => {
      queryClient.setQueryData(['managedBusiness'], updatedManagedBusiness);
      router.push(`/businesses/manage/${updatedManagedBusiness.id}/services`);
    }
  });

  const isDisabled: boolean = !managedBusiness || !targetService || !authUser || confirmText !== targetService.name;

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (isDisabled || !managedBusiness || !targetService || !authUser) return;

    handleDeleteService({
      businessId: managedBusiness.id,
      serviceId: targetService.id
    });
  }



  return (
    <AuthProvider forceAuth={true}>
      <LoadingHandler isLoading={isLoadingManagedBusiness} object={managedBusiness} error={loadManagedBusinessError}>

        <LoadingHandler isLoading={isLoadingService} object={targetService} error={loadServiceError}>
          {targetService && managedBusiness && authUser && (
            <>

              {managedBusiness.owner.id !== authUser.id ? (
                <div className="flex flex-col gap-4 items-center">
                  <h1>You are not authorized to perform this action.</h1>
                  <Link href={`/businesses/manage/${businessId}/services/${serviceId}`} className="link-1">Go Back
                    to Service</Link>
                </div>
              ) : (
                <form className="max-w-96 bg-background-secondary p-4 rounded-md shadow-md flex flex-col gap-4"
                      onSubmit={handleFormSubmit}>
                  <div className="flex flex-col gap-4">
                    <h1>Delete Business</h1>
                    <p>You are attempting to delete a service &#39;{targetService.name}&#39;. This action is
                      irreversible
                      and
                      cannot be undone. You and staff will lose access to all reservations, and data related to this
                      service. <span className="text-red-600">It is your responsibility to notify clients that the service has been removed.</span></p>
                  </div>

                  <fieldset className="input-container">
                    <label htmlFor="name-confirmation" className="input-label">Please
                      enter &#39;{targetService.name}&#39; to
                      delete*:</label>
                    <input type="text" className="input-bar" id="name-confirmation" name="name-confirmation"
                           contentEditable={!isDeleting}
                           placeholder={`Please enter '${targetService.name}' to delete`} value={confirmText}
                           onChange={(e) => setConfirmText(e.target.value)}/>
                  </fieldset>

                  {deleteError && (
                    <p className="error-msg">{(deleteError as Error).message}</p>
                  )}

                  <div className="w-full flex items-center justify-center">
                    <button
                      className={`delete-btn3 w-full! ${isDisabled && 'delete-btn3-disabled'}`}
                      disabled={isDisabled} type="submit">
                      {!isDeleting ? (
                        <span>Confirm Delete</span>
                      ) : (
                        <LoadingSpinnerSM/>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </>
          )}
        </LoadingHandler>

      </LoadingHandler>
    </AuthProvider>
  );
};

export default DeleteServiceForm;
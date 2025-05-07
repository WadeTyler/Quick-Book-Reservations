'use client';
import React, {FormEvent, useState} from 'react';
import AuthProvider from "@/providers/AuthProvider";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";
import {ManagedBusiness} from "@/types/business.types";
import {deleteBusiness, fetchManagedBusinessById} from "@/lib/business.service";
import {LoadingSpinnerLG, LoadingSpinnerSM} from "@/components/LoadingSpinners";
import {useParams, useRouter} from "next/navigation";
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";

const DeleteBusinessPage = () => {

  const router = useRouter();
  const {businessId} = useParams();

  const [confirmText, setConfirmText] = useState<string>('');

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

  const {mutate: handleDelete, isPending: isDeleting, error: deleteError} = useMutation({
    mutationFn: deleteBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['managedBusiness']});
      queryClient.invalidateQueries({queryKey: ['managedBusinesses']});
      router.push("/businesses/manage");
    }
  })

  const isDisabled: boolean = !managedBusiness || confirmText !== managedBusiness.name || !authUser || authUser.id !== managedBusiness.owner.id;

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    if (isDisabled || !managedBusiness) return;

    handleDelete({businessId: managedBusiness.id});
  }

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
    {name: `${managedBusiness ? managedBusiness.name : "Manage Business"}`, href: `/businesses/manage/${businessId}`},
    {name: "Delete Business", href: `/businesses/manage/${businessId}/delete`}
  ]

  return (
    <AuthProvider forceAuth={true}>
      <div className="w-full page-padding-with-breadcrumbs min-h-screen flex flex-col items-center">


        {/* Loading */}
        {isLoadingManagedBusiness && (
          <LoadingSpinnerLG/>
        )}

        {/* Load Error */}
        {!isLoadingManagedBusiness && loadManagedBusinessError && (
          <>
            <h1 className="text-accent font-semibold tracking-wide md:text-3xl text-xl">Something went Wrong</h1>
            <p className="error-msg">{(loadManagedBusinessError as Error).message}</p>
          </>
        )}

        {/* Loaded */}
        {!isLoadingManagedBusiness && !loadManagedBusinessError && managedBusiness && authUser && (
          managedBusiness.owner.id === authUser.id ? (
            <>
              <Breadcrumbs breadcrumbs={breadcrumbs}/>
              <form className="max-w-96 bg-background-secondary p-4 rounded-md shadow-md flex flex-col gap-4"
                    onSubmit={handleFormSubmit}>
                <div className="flex flex-col gap-4">
                  <h1>Delete Business</h1>
                  <p>You are attempting to delete your business &#39;{managedBusiness.name}&#39;. This action is irreversible
                    and
                    cannot be undone. You and staff will lose access to all reservations, services, and data related to this
                    business.</p>

                  <fieldset className="input-container">
                    <label htmlFor="name-confirmation" className="input-label">Please enter &#39;{managedBusiness.name}&#39; to
                      delete*:</label>
                    <input type="text" className="input-bar" id="name-confirmation" name="name-confirmation"
                           contentEditable={!isDeleting}
                           placeholder={`Please enter '${managedBusiness.name}' to delete`} value={confirmText}
                           onChange={(e) => setConfirmText(e.target.value)}/>
                  </fieldset>
                </div>

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
            </>
          ) : (
            // Unauthorized
            <>
              <h1>You are not authorized to delete this business.</h1>
            </>
          )
        )}


      </div>
    </AuthProvider>
  );
};

export default DeleteBusinessPage;
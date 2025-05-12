'use client';
import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {LoadingSpinnerSM} from "@/components/LoadingSpinners";
import AuthProvider from "@/features/auth/providers/AuthProvider";
import {useRouter} from "next/navigation";
import {Business, CreateBusinessRequest} from "@/types/business.types";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createBusiness, fetchAllManagedBusinesses} from "@/features/business/lib/manage-business.service";
import appProperties from "@/constants/app.properties";

const CreateBusinessForm = () => {

  const router = useRouter();

  const [createBusinessRequest, setCreateBusinessRequest] = useState<CreateBusinessRequest>({
    name: '',
    description: '',
    image: null
  });


  const {mutate: handleCreateBusiness, isPending: isCreatingBusiness, error: createBusinessError} = useMutation({
    mutationFn: createBusiness,
    onSuccess: async (newBusiness) => {
      router.push(`/businesses/manage/${newBusiness.id}`);
    }
  });

  const {data: managedBusinesses, isPending: isLoadingManagedBusinesses} = useQuery<Business[] | null>({
    queryKey: ['managedBusinesses'],
    queryFn: fetchAllManagedBusinesses
  });

  const hasMaxBusinesses = !isLoadingManagedBusinesses && managedBusinesses != null && managedBusinesses && managedBusinesses.length >= appProperties.maxUserBusinesses;

  const isSubmitDisabled = isCreatingBusiness || !createBusinessRequest.name || !createBusinessRequest.description || hasMaxBusinesses;

  return (
    <AuthProvider forceAuth={true}>
      {hasMaxBusinesses && (
        <div className="text-center flex flex-col gap-2 items-center justify-center">
          <h1 className="text-3xl">You have reached max amount of businesses.</h1>
          <p>To create more businesses please delete one of your existing ones.</p>
          <Link href="/businesses/manage" className="submit-btn2">Manage Businesses</Link>
        </div>
      )}

      {!hasMaxBusinesses && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isSubmitDisabled) return;

            handleCreateBusiness(createBusinessRequest);
          }}
          className="min-w-96 h-fit bg-background-secondary flex flex-col items-center justify-center md:p-8 p-4 rounded-md shadow-md gap-4">
          <header className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl text-accent font-semibold tracking-wide">Create Business</h1>
            <p className="text-center">Let&#39;s go ahead and create your next business!</p>
          </header>

          <hr className="text-accent w-full"/>

          {/* Business Name */}
          <fieldset className="input-container">
            <label htmlFor="name" className="input-label">Business Name*:</label>
            <input type="text" className="input-bar" id="name" placeholder="Enter a name for your business" required
                   minLength={3} maxLength={100} value={createBusinessRequest.name}
                   onChange={(e) => setCreateBusinessRequest(prev => ({
                     ...prev,
                     name: e.target.value
                   }))}/>
          </fieldset>

          {/* Business Description */}
          <fieldset className="input-container">
            <label htmlFor="description" className="input-label">Description*:</label>
            <textarea name="description" id="description" className="input-bar resize-none" rows={10}
                      placeholder="Enter a description for your business" required minLength={20} maxLength={500}
                      value={createBusinessRequest.description} onChange={(e) => setCreateBusinessRequest(prev => ({
              ...prev,
              description: e.target.value
            }))}></textarea>
          </fieldset>

          {/* Business Image */}
          <fieldset className="input-container">


            {/* Preview Image */}
            {createBusinessRequest.image && (
              <div className="w-full aspect-video relative overflow-hidden">
                <Image src={URL.createObjectURL(createBusinessRequest.image)} alt={"Selected Image"} fill={true}
                       objectFit="cover"
                       objectPosition="center" className="rounded-md"/>
              </div>
            )}

            <div className="flex gap-2 items-center justify-center">
              <label htmlFor="image" className="submit-btn3">Upload Image (Optional)</label>
              <input type="file" id="image" name="image" accept="image/*" hidden
                     onChange={(e) => {
                       setCreateBusinessRequest(prev => {
                         const file = e.target.files ? e.target.files[0] : null;

                         if (file) {
                           return {
                             ...prev,
                             image: file
                           }
                         } else {
                           return prev;
                         }
                       })
                     }}/>
              {createBusinessRequest.image && (
                <button className="submit-btn3" type="button" onClick={() =>
                  setCreateBusinessRequest(prev => ({
                    ...prev,
                    image: null
                  }))
                }>
                  Reset Image
                </button>
              )}
            </div>


          </fieldset>

          {createBusinessError && (
            <p className="error-msg">{(createBusinessError as Error).message}</p>
          )}

          <button className="submit-btn" type="submit" disabled={isSubmitDisabled}>
            {!isCreatingBusiness ? (
              <>Create Business</>
            ) : (
              <LoadingSpinnerSM/>
            )}
          </button>
        </form>
      )}
    </AuthProvider>
  );
};

export default CreateBusinessForm;
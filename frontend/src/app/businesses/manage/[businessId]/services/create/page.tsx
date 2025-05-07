'use client';
import React, {FormEvent, useState} from 'react';
import {useParams, useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CreateServiceRequest, ManagedBusiness} from "@/types/business.types";
import {createService, fetchManagedBusinessById} from "@/lib/business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";
import {LoadingSpinnerSM, LoadingSpinnerXL} from "@/components/LoadingSpinners";
import AuthProvider from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

const CreateServicePage = () => {

  const {businessId} = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>();
  const [formFields, setFormFields] = useState<CreateServiceRequest>({
    name: '',
    type: '',
    description: '',
    image: null
  });

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

  const {mutate: handleCreateService, isPending: isCreating, error: createError} = useMutation({
    mutationFn: createService,
    onSuccess: (updatedManagedBusiness: ManagedBusiness) => {
      queryClient.setQueryData(['managedBusiness'], updatedManagedBusiness);
      router.push(`/businesses/manage/${businessId}/services`);
    }
  });

  const isDisabled: boolean = !managedBusiness || !authUser || managedBusiness.owner.id !== authUser.id || !formFields.type || !formFields.description || !formFields.name || isLoadingManagedBusiness || isCreating || !businessId || formFields.name.length < 3 || formFields.type.length < 3 || formFields.description.length < 20;

    function handleSubmit(e: FormEvent) {
      e.preventDefault();

      if (isDisabled || !managedBusiness) return;

      handleCreateService({
        businessId: managedBusiness.id,
        createServiceRequest: formFields
      });
    }

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
    {name: `${managedBusiness ? managedBusiness.name : "Manage Business"}`, href: `/businesses/manage/${businessId}`},
    {name: 'Manage Services', href: `/businesses/manage/${businessId}/services`},
    {name: 'Create Service', href: `/businesses/manage/${businessId}/services/create`}
  ]

  return (
    <AuthProvider forceAuth={true}>
      <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col items-center">
        <Breadcrumbs breadcrumbs={breadcrumbs}/>

        {/* Loading */}
        {isLoadingManagedBusiness && (
          <LoadingSpinnerXL/>
        )}

        {/* Failed to load */}
        {!isLoadingManagedBusiness && loadManagedBusinessError && (
          <>
            <h1>Something went wrong</h1>
            <p className="error-msg">{(loadManagedBusinessError as Error).message}</p>
          </>
        )}

        {/* Loaded but not owner */}
        {!isLoadingManagedBusiness && !loadManagedBusinessError && managedBusiness && authUser?.id !== managedBusiness.owner.id && (
          <>
            <h1>You are not authorized to create new services</h1>
            <Link href={`/businesses/manage/${businessId}/services`}>
              Back to Services
            </Link>
          </>
        )}

        {/* Loaded */}
        {!isLoadingManagedBusiness && !loadManagedBusinessError && managedBusiness && (
          <form
            onSubmit={handleSubmit}
            className="max-w-96 w-full bg-background-secondary flex flex-col items-center gap-4 p-4 rounded-md shadow-md"
          >
            <h1>Create Service</h1>
            <p>Create a new Service for your business!</p>

            {/* Name */}
            <fieldset className="input-container">
              <label htmlFor="name" className="input-label">Name*:</label>
              <input type="text"
                     id="name"
                     className="input-bar"
                     placeholder="Enter a service name"
                     required
                     minLength={3}
                     maxLength={100}
                     onChange={(e) => setFormFields(prev => ({
                       ...prev,
                       name: e.target.value
                     }))}
              />
            </fieldset>

            {/* Type */}
            <fieldset className="input-container">
              <label htmlFor="type" className="input-label">Type*:</label>
              <input type="text"
                     className="input-bar"
                     id="type"
                     placeholder="Enter a type for your service: Ex: 'Appointment'"
                     required
                     minLength={3}
                     maxLength={100}
                     onChange={(e) => setFormFields(prev => ({
                       ...prev,
                       type: e.target.value
                     }))}
              />
            </fieldset>

            {/* Description */}
            <fieldset className="input-container">
              <label htmlFor="description" className="input-label">Description*:</label>
              <textarea
                     id="description"
                     className="input-bar resize-none"
                     rows={5}
                     placeholder="Enter a description for your service"
                     required
                     minLength={20}
                     maxLength={500}
                     onChange={(e) => setFormFields(prev => ({
                       ...prev,
                       description: e.target.value
                     }))}
              />
            </fieldset>

            {/* Image */}
            <fieldset className="input-container">
              {/* Preview */}
              {imagePreview && (
                <div className="overflow-hidden w-full rounded-md aspect-video relative">
                  <Image src={imagePreview} alt="Image preview" fill={true} objectFit="cover" objectPosition="center"/>
                </div>
              )}
              {/* Input (hidden) */}
              <input type="file"
                     id="image"
                     accept="image/**"
                     hidden
                     onChange={(e) => {
                       const file = e.target.files ? e.target.files[0] : null;
                       if (file) {
                         setFormFields(prev => ({
                           ...prev,
                           image: file
                         }));
                         setImagePreview(URL.createObjectURL(file));
                       } else {
                         setFormFields(prev => ({
                           ...prev,
                           image: null
                         }));
                         setImagePreview(null);
                       }
                     }}
              />
              <div className="flex items-center gap-4">
                {/* Choose Image Button */}
                <label htmlFor="image" className="submit-btn3">
                  Choose Image (Optional)
                </label>
                {/* Remove Image Button */}
                {formFields.image && (
                  <button className="delete-btn3" type="button" onClick={() => {
                    setFormFields(prev => ({
                      ...prev,
                      image: null
                    }));
                    setImagePreview(null);
                  }}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </fieldset>

            {createError && (
              <p className="error-msg">{(createError as Error).message}</p>
            )}

            <button className={`submit-btn ${isDisabled && 'submit-btn-disabled'}`} disabled={isDisabled} type="submit">
              {!isCreating ? (
                <span>Create Service</span>
              ) : (
                <LoadingSpinnerSM/>
              )}
            </button>

          </form>
        )}

      </div>
    </AuthProvider>
  );
};

export default CreateServicePage;
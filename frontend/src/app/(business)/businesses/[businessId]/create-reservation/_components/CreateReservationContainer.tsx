"use client";
import React, {useEffect} from 'react';
import {useParams, useSearchParams} from "next/navigation";
import {useBusiness} from "@/features/business/context/BusinessContext";
import {useServiceOffering} from "@/features/service-offering/context/ServiceOfferingContext";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import CreateReservationForm
  from "@/app/(business)/businesses/[businessId]/create-reservation/_components/CreateReservationForm";

function CreateReservationContainer() {
  const params = useParams<{ businessId: string }>();
  const businessId = params.businessId;

  const {currentBusiness, loadCurrentBusiness, isLoadingCurrentBusiness, loadCurrentBusinessError} = useBusiness();
  const {
    serviceOfferings,
    loadServiceOfferings,
    isLoadingServiceOfferings,
    loadServiceOfferingsError
  } = useServiceOffering();

  useEffect(() => {
    loadCurrentBusiness(businessId);
    loadServiceOfferings(businessId);
  }, [businessId]);

  if (isLoadingCurrentBusiness || isLoadingServiceOfferings) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="size-16 text-accent"/>
      </div>
    )
  } else if (!isLoadingCurrentBusiness && loadCurrentBusinessError) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
        <p>{loadCurrentBusinessError}</p>
      </div>
    )
  } else if (!isLoadingServiceOfferings && loadServiceOfferingsError) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
        <p>{loadServiceOfferingsError}</p>
      </div>
    )
  } else if (!currentBusiness || !serviceOfferings) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
        <p>Please try again later.</p>
        <Link href={`/businesses/${businessId}`} className="link-1">Back to Business</Link>
      </div>
    )
  }

  if (currentBusiness && serviceOfferings) return (
    <CreateReservationForm currentBusiness={currentBusiness} serviceOfferings={serviceOfferings}/>
  );

  return null;
}

export default CreateReservationContainer;
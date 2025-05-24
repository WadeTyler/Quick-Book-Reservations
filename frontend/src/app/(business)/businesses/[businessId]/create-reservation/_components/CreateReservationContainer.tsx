"use client";
import React, {useEffect} from 'react';
import {useParams} from "next/navigation";
import {useBusiness} from "@/features/business/context/BusinessContext";
import {useServiceOffering} from "@/features/service-offering/context/ServiceOfferingContext";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import CreateReservationForm
  from "@/app/(business)/businesses/[businessId]/create-reservation/_components/CreateReservationForm";
import {ArrowLeft} from "lucide-react";

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
      <div className="max-w-xl flex flex-col gap-4">
        <Link href={`/businesses/${businessId}`} className="link-1 font-semibold inline-flex gap-1 items-center">
          <ArrowLeft />
          Back to business
        </Link>
        <CreateReservationForm currentBusiness={currentBusiness} serviceOfferings={serviceOfferings}/>
      </div>
  );

  return null;
}

export default CreateReservationContainer;
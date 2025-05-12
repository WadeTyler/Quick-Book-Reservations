"use client";
import React from 'react';
import {useParams, useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchBusinessById} from "@/lib/business.service";
import {fetchServiceOfferingById} from "@/lib/service-offering.service";
import LoadingHandler from "@/components/util/LoadingHandler";
import AuthProvider from "@/providers/AuthProvider";
import Image from "next/image";
import CreateReservationForm from "@/components/businesses/business/reservations/create/CreateReservationForm";
import Link from "next/link";

const CreateReservationsContainer = () => {

  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const {businessId} = useParams();
  const isSuccess = searchParams.get("success") !== null && searchParams.get("success") === 'true';

  const {data: business, isPending: isLoadingBusiness, error: loadBusinessError} = useQuery({
    queryKey: ['business'],
    queryFn: () => fetchBusinessById(businessId as string)
  });

  const {data: serviceOffering, isPending: isLoadingServiceOffering, error: loadServiceOfferingError} = useQuery({
    queryKey: ['serviceOffering'],
    queryFn: () => fetchServiceOfferingById({
      businessId: businessId as string,
      serviceId: parseInt(serviceId as string)
    })
  });


  return (
    <AuthProvider>
      <LoadingHandler isLoading={isLoadingBusiness} object={business} error={loadBusinessError}>
        <LoadingHandler isLoading={isLoadingServiceOffering} object={serviceOffering}
                        error={loadServiceOfferingError}>
          {business && serviceOffering && (
            <div className="w-full h-full flex justify-between items-center">
              {!isSuccess ? (
                <CreateReservationForm />
              ) : (
                <div className="max-w-[55rem] w-full h-full bg-background-secondary flex flex-col items-center justify-center shadow-xl z-20 gap-4 section-padding">
                  <h1 className="text-center">Your reservation has been placed!</h1>
                  <p className="text-center">You will receive a confirmation email within 24 hours. If you do not receive a confirmation email within 24 hours please contact {business.name} using the provided contact information.</p>
                  <Link href={`/businesses/${businessId}`} className="link-1">Back to business</Link>
                </div>
              )}

              <div className="relative w-full h-full hidden md:flex flex-col items-start justify-end section-padding overflow-hidden">
                {serviceOffering.image && (
                  <div className="absolute top-0 left-0 w-full h-full z-0">
                    <Image src={serviceOffering.image} alt={`${serviceOffering.name}'s Image`} fill={true}
                           objectFit="cover" objectPosition="center" className="brightness-50"/>
                  </div>
                )}

                <span className="text-xl md:text-4xl font-semibold tracking-wide text-white z-20">{business.name}</span>
                <span className="text-lg md:text-2xl font-semibold text-white z-20">{serviceOffering.name}</span>
                <span className="text-white z-20 wrap-anywhere">{serviceOffering.description}</span>
              </div>

            </div>
          )}
        </LoadingHandler>
      </LoadingHandler>
    </AuthProvider>
  );
};

export default CreateReservationsContainer;
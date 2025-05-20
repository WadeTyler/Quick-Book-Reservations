"use client";

/**
 * React component that displays detailed information about a business,
 * including its image, name, description, and a list of its services.
 *
 * This component fetches the business data using the `useBusiness` hook
 * and handles loading and error states. It also uses Next.js's `useParams`
 * to retrieve the `businessId` from the URL.
 */
import {useParams} from "next/navigation";
import {useBusiness} from "@/features/business/hooks/BusinessContext";
import React, {useEffect} from "react";
import Loader from "@/components/ui/loader";
import Image from "next/image";
import ServiceOfferingList from "@/app/(business)/businesses/[businessId]/_components/ServiceOfferingList";

function BusinessContainer() {

  // Retrieve the businessId from the URL parameters
  const params = useParams<{ businessId: string }>();
  const businessId = params.businessId;

  // Destructure the business context to access state and actions
  const {currentBusiness, isLoadingCurrentBusiness, loadCurrentBusiness, loadCurrentBusinessError} = useBusiness();

  // Load the current business data when the businessId changes
  useEffect(() => {
    loadCurrentBusiness(businessId);
  }, [businessId]);

  // Render a loading state while the business data is being fetched
  if (isLoadingCurrentBusiness) {
    return (
      <div className="container flex items-center justify-center w-full h-screen">
        <Loader className="size-24 text-accent"/>
      </div>
    )
  }

  // Render an error state if the business data fails to load
  if (!isLoadingCurrentBusiness && (loadCurrentBusinessError || !currentBusiness)) {
    return (
      <div className="container flex flex-col gap-4 items-center justify-center w-full h-screen">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Something went wrong</h1>
        <p>{loadCurrentBusinessError}</p>
      </div>
    );
  }

  // Render the business details and its services
  return (
    <div className="flex flex-col items-center w-full min-h-screen">

      {/* Business image and description */}
      <section className="relative w-full min-h-[40rem] flex items-center justify-center">

        <Image
          src={currentBusiness?.image || "/default-image.jpg"}
          alt={`${currentBusiness?.name}'s Image`}
          fill={true}
          objectFit="cover"
          objectPosition="center"
          className="brightness-40"
        />

        <div className="flex flex-col container items-center justify-center w-full h-full text-white py-6 z-10 text-center text-balance">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight">
            {currentBusiness?.name}
          </h1>
          <p className="text-lg lg:text-2xl tracking-wide leading-loose text-white/80">
            {currentBusiness?.description}
          </p>
        </div>
      </section>

      {/* Business services */}
      <section id="services" className="relative w-full flex flex-col items-center">

        <div className="container w-full py-6 lg:py-16">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-center text-balance mb-4">
            {currentBusiness?.name}&#39;s Services
          </h2>
          <ServiceOfferingList />
        </div>
      </section>

    </div>
  );
}

export default BusinessContainer;
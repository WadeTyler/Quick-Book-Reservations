"use client";
import React from 'react';
import {Business} from "@/types/business.types";
import {ServiceOffering} from "@/types/service-offering.types";
import ImageContainer from "@/components/util/ImageContainer";
import {useQuery} from "@tanstack/react-query";
import {fetchAllServiceOfferings} from "@/lib/service-offering.service";
import LoadingHandler from "@/components/util/LoadingHandler";
import Link from "next/link";

const ServiceOfferingList = ({business}: {
  business: Business;
}) => {

  const {data:serviceOfferings, isPending: isLoadingServices, error:loadServicesError} = useQuery({
    queryKey: ['serviceOfferings'],
    queryFn: () => fetchAllServiceOfferings({businessId: business.id})
  });

  return (
    <div className="w-full flex flex-col gap-8">

      <h2 className="text-accent font-semibold tracking-wide text-center text-3xl">{business.name}&#39;s Services</h2>
      <LoadingHandler isLoading={isLoadingServices} object={serviceOfferings} error={loadServicesError}>
        {serviceOfferings && (
          <div className="flex flex-col gap-4">
            {serviceOfferings.map((service) => (
              <ServiceOfferingCard serviceOffering={service} key={service.id} />
            ))}
          </div>
        )}
      </LoadingHandler>
      
    </div>
  );
};

export default ServiceOfferingList;

const ServiceOfferingCard = ({serviceOffering}: {
  serviceOffering: ServiceOffering;
}) => {
  return (
    <div className="bg-background-secondary w-full rounded-md flex md:flex-row flex-col-reverse overflow-hidden">

      {/* Info */}
      <div className="flex flex-col p-4 gap-4 w-full wrap-break-word overflow-hidden">
        <h3 className="text-accent text-xl font-semibold">{serviceOffering.name}</h3>
        <p><strong>Type: </strong>{serviceOffering.type}</p>
        <p>{serviceOffering.description}</p>

        <Link href={`/businesses/${serviceOffering.businessId}/reservations/create?serviceId=${serviceOffering.id}`} className="submit-btn3 mt-auto">Make Reservation</Link>
      </div>

      {serviceOffering.image && (
        <ImageContainer image={serviceOffering.image} alt={`Image for ${serviceOffering.name}`} />
      )}
    </div>
  )
}
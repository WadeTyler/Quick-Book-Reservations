"use client";
import React, {useEffect} from 'react';
import {useServiceOffering} from "@/features/service-offering/hooks/ServiceOfferingContext";
import {useParams} from "next/navigation";
import Loader from "@/components/ui/loader";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";

function ServiceOfferingList() {

  const params = useParams<{ businessId: string }>();
  const businessId = params.businessId;

  const {
    serviceOfferings,
    isLoadingServiceOfferings,
    loadServiceOfferingsError,
    loadServiceOfferings
  } = useServiceOffering();

  useEffect(() => {
    loadServiceOfferings(businessId);
  }, [businessId]);

  if (isLoadingServiceOfferings) return (
    <Loader/>
  )

  else if (!isLoadingServiceOfferings && loadServiceOfferingsError) {
    return (
      <div className="text-center text-balance">
        <h3 className="text-lg md:text-2xl font-semibold tracking-tight">
          Something went wrong
        </h3>
        <p className="text-lg md:text-xl xl:text-2xl">{loadServiceOfferingsError}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center container">

      {serviceOfferings?.length === 0 && (
        <p className="text-muted-foreground">
          No services found
        </p>
      )}

      {serviceOfferings?.map(service => (
        <Card key={service.id} className="w-full overflow-hidden p-0! flex flex-col-reverse lg:flex-row">

          <div className="w-full h-full wrap-anywhere p-4">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              {service.name}
            </h3>
            <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded">
              {service.type}
            </span>
            <p className="sm:text-lg mb-4">
              {service.description}
            </p>

            <Link href={`/businesses/${businessId}/create-reservation?serviceId=${service.id}`}>
              <Button className="mt-auto">
                Book Reservation
              </Button>
            </Link>
          </div>

          {service.image && (
            <div className="relative w-full min-h-48">
              <Image src={service.image} alt={`${service.name}'s Image`} fill objectFit="cover"
                     objectPosition="center"/>
            </div>
          )}


        </Card>
      ))}

    </div>
  );
}

export default ServiceOfferingList;
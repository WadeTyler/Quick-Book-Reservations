import React from 'react';
import ImageContainer from "@/components/util/ImageContainer";
import Link from "next/link";
import {ServiceOffering} from "@/types/service-offering.types";

const ManagedServicePanel = ({businessId, serviceOffering}: {
  businessId: string;
  serviceOffering: ServiceOffering;
}) => {
  return (
    <div
      className="w-full bg-background-secondary rounded-md shadow-md flex flex-col lg:flex-row-reverse overflow-hidden">

      <ImageContainer image={serviceOffering.image} alt={`${serviceOffering.name}'s Image`}/>

      <div className="w-full p-4 flex flex-col gap-2 overflow-hidden">
        <h2 className="font-semibold text-xl">{serviceOffering.name}</h2>
        <p>Created At: {new Date(serviceOffering.createdAt).toLocaleDateString()}</p>
        <p>Type: {serviceOffering.type}</p>
        <p>{serviceOffering.description}</p>

        <Link href={`/businesses/manage/${businessId}/services/${serviceOffering.id}`}
              className="submit-btn3 mt-auto">Manage</Link>
      </div>
    </div>
  );
};

export default ManagedServicePanel;
import React from 'react';
import ImageContainer from "@/components/util/ImageContainer";
import Link from "next/link";
import {Service} from "@/types/business.types";

const ManagedServicePanel = ({businessId, service}: {
  businessId: string;
  service: Service;
}) => {
  return (
    <div
      className="w-full bg-background-secondary rounded-md shadow-md flex flex-col lg:flex-row-reverse overflow-hidden">

      <ImageContainer image={service.image} alt={`${service.name}'s Image`}/>

      <div className="w-full p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-xl">{service.name}</h2>
        <p>Created At: {new Date(service.createdAt).toLocaleDateString()}</p>
        <p>Type: {service.type}</p>
        <p>{service.description}</p>

        <Link href={`/businesses/manage/${businessId}/services/${service.id}`}
              className="submit-btn3 mt-auto">Manage</Link>
      </div>
    </div>
  );
};

export default ManagedServicePanel;
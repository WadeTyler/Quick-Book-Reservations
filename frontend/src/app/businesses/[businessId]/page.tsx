import React from 'react';
import BusinessContainer from "@/components/businesses/business/BusinessContainer";
import {Metadata} from "next";
import {fetchBusinessById} from "@/lib/business.service";


type Props = {
  params: Promise<{ businessId: string }>
}

export async function generateMetadata(
  { params, }: Props,
): Promise<Metadata> {
  const businessId = (await params).businessId

  const business = await fetchBusinessById(businessId);

  const title = business ? `${business.name} | Quick Book` : 'Business | Quick Book';
  const description = business ? `${business.description} | Quick Book` : `A business for Quick Book Reservations.`;


  return {
    title,
    description
  }
}

const BusinessPage = () => {
  return (
    <div className="page-padding w-full min-h-screen flex flex-col items-center">
      <BusinessContainer />
    </div>
  );
};

export default BusinessPage;
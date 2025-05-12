import React from 'react';
import {Metadata} from "next";
import {fetchBusinessById} from "@/features/business/lib/business.service";
import CreateReservationsContainer
  from "@/features/reservation/components/CreateReservationsContainer";

type Props = {
  params: Promise<{ businessId: string }>
}

export async function generateMetadata(
  { params, }: Props,
): Promise<Metadata> {
  const businessId = (await params).businessId

  const business = await fetchBusinessById(businessId);

  const title = business ? `Make Reservation at ${business.name} | Quick Book` : 'Make Reservation | Quick Book';
  const description = business ? `${business.description} | Quick Book` : `Create a reservation!`;

  return {
    title,
    description
  }
}

const CreateReservationPage = () => {

  return (
    <div className="w-full h-screen relative">
      <CreateReservationsContainer />
    </div>
  );
};

export default CreateReservationPage;
"use client";
import React from 'react';
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchBusinessById} from "@/lib/business.service";
import AuthProvider from "@/providers/AuthProvider";
import LoadingHandler from "@/components/util/LoadingHandler";
import ImageContainer from "@/components/util/ImageContainer";
import ServiceOfferingList from "@/components/businesses/business/ServiceOfferingList";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";
import Link from "next/link";

const BusinessContainer = () => {

  const {businessId} = useParams();

  const {data: business, isPending: isLoadingBusiness, error: loadBusinessError} = useQuery({
    queryKey: ['business'],
    queryFn: () => fetchBusinessById(businessId as string)
  })

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser,
  });

  return (
    <AuthProvider>
      <LoadingHandler isLoading={isLoadingBusiness} object={business} error={loadBusinessError} errorBackLink={"/"} errorBackLinkText={"Back to Home"}>
        {business && (
          <div className="flex flex-col gap-8 w-full max-w-[55rem]">
            {/* Business Details */}
            <div className="w-full flex flex-col justify-between bg-background-secondary rounded-md shadow-md overflow-hidden">
              {/* Image */}
              <ImageContainer image={business.image} alt={`Image for ${business.image}`} />

              {/* Info */}
              <div className="flex flex-col gap-4 p-4 w-full">
                <h1>{business.name}</h1>
                <p>{business.description}</p>


                {/* Manage Buttons */}
                {authUser && (business.ownerId === authUser.id || business.staffIds.includes(authUser.id)) && (
                  <Link href={`/businesses/manage/${businessId}`} className="submit-btn3">Manage Business</Link>
                )}
              </div>
            </div>

            <ServiceOfferingList business={business} />

          </div>
        )}
      </LoadingHandler>
    </AuthProvider>
  );
};

export default BusinessContainer;
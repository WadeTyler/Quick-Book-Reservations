"use client";
import React from 'react';
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";
import {useQuery} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/lib/business.service";
import {useParams} from "next/navigation";

const DeleteBusinessPageBreadcrumbs = () => {

  const {businessId} = useParams();

  const {
    data: managedBusiness,
  } = useQuery<ManagedBusiness | null>({
    queryKey: ['managedBusiness'],
    queryFn: async () => await fetchManagedBusinessById((businessId as string)),
    retry: 1
  });

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
    {name: `${managedBusiness ? managedBusiness.name : "Manage Business"}`, href: `/businesses/manage/${businessId}`},
    {name: "Delete Business", href: `/businesses/manage/${businessId}/delete`}
  ]

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs} />
  );
};

export default DeleteBusinessPageBreadcrumbs;
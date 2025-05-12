"use client";
import React from 'react';
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";
import {useQuery} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/features/business/lib/manage-business.service";
import {useParams} from "next/navigation";

const CreateServicePageBreadcrumbs = () => {
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
    {name: 'Manage Services', href: `/businesses/manage/${businessId}/services`},
    {name: 'Create Service', href: `/businesses/manage/${businessId}/services/create`}
  ]

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs}/>
  );
};

export default CreateServicePageBreadcrumbs;
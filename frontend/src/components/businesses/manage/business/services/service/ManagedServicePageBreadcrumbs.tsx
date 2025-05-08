"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {ManagedBusiness} from "@/types/business.types";
import {fetchManagedBusinessById} from "@/lib/business.service";
import {useParams} from "next/navigation";
import Breadcrumbs, {Breadcrumb} from "@/components/Breadcrumbs";

const ManagedServicePageBreadcrumbs = () => {

  const {businessId, serviceId} = useParams();

  const {
    data: managedBusiness,
  } = useQuery<ManagedBusiness | null>({
    queryKey: ['managedBusiness'],
    queryFn: async () => await fetchManagedBusinessById((businessId as string)),
    retry: 1
  });

  const {data: targetService} = useQuery({
    queryKey: ['targetService'],
    queryFn: () => {
      if (!managedBusiness) {
        throw new Error("Managed business not found.");
      }

      const service = managedBusiness.serviceOfferings.find(s => s.id === parseInt(serviceId as string));

      if (!service) throw new Error("Service not found.");
      return service;
    }
  });

  const breadcrumbs: Breadcrumb[] = [
    {name: "Manage Businesses", href: "/businesses/manage"},
    {name: `${managedBusiness ? managedBusiness.name : "Manage Business"}`, href: `/businesses/manage/${businessId}`},
    {name: 'Manage Services', href: `/businesses/manage/${businessId}/services`},
    {
      name: `${targetService ? targetService.name : 'Manage Service'}`,
      href: `/businesses/manage/${businessId}/services/${serviceId}`
    }
  ];

  return (
    <Breadcrumbs breadcrumbs={breadcrumbs}/>
  );
};

export default ManagedServicePageBreadcrumbs;
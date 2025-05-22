"use client";

import Image from "next/image";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import AddServiceSheet from "@/app/(management)/manage/[businessId]/services/_components/AddServiceSheet";
import {useAuth} from "@/features/auth/context/AuthContext";
import EditServiceSheet from "@/app/(management)/manage/[businessId]/services/_components/EditServiceSheet";
import DeleteServiceSheet from "@/app/(management)/manage/[businessId]/services/_components/DeleteServiceSheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";

export default function ManageServicesContainer() {

  const {managedBusiness} = useManagedBusiness();
  const {authUser} = useAuth();

  return (
    <div className="container flex flex-col gap-6 py-6">
      <ManageServicesBreadcrumbs />

      <div className="m8-8">
        <div className="mb-1">
          <h1 className="text-2xl font-bold">Manage Service Offerings</h1>
          <p className="text-muted-foreground mt-1">
            View, edit, or add services your business offers.
          </p>
        </div>
        {managedBusiness?.owner.id === authUser?.id && (
          <div className="ml-auto w-fit">
            <AddServiceSheet/>
          </div>
        )}
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {managedBusiness?.serviceOfferings.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No services yet. Click &quot;Add Service&quot; to create your first offering.
          </div>
        )}
        {managedBusiness?.serviceOfferings.map((service) => (
          <div
            key={service.id}
            className="bg-card rounded-xl shadow-sm border border-border flex flex-col overflow-hidden"
          >
            {service.image && (
              <div className="relative w-full h-40 bg-muted">
                <Image src={service.image} alt={service.name} fill className="object-cover" sizes="400px"/>
              </div>
            )}
            <div className="flex-1 flex flex-col p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg">{service.name}</h2>
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                  {service.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{service.description}</p>
              <div className="mt-auto flex gap-2">
                {managedBusiness?.owner.id === authUser?.id && <EditServiceSheet targetService={service}/>}
                {managedBusiness?.owner.id === authUser?.id && <DeleteServiceSheet targetService={service}/>}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

function ManageServicesBreadcrumbs() {
  const {managedBusiness} = useManagedBusiness()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator/>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/manage/${managedBusiness?.id}`}>{managedBusiness?.name || "Business"}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator/>
        <BreadcrumbPage>Manage Services</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
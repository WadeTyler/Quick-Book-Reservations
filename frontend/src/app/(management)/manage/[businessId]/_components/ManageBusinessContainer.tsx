"use client";
import {useManagedBusiness} from "@/features/business/hooks/ManagedBusinessContext";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import ManageBusinessHeader from "./ManageBusinessHeader";
import StatCards from "@/app/(management)/manage/[businessId]/_components/StatCards";
import ManagementPanels from "@/app/(management)/manage/[businessId]/_components/ManagementPanels";

export default function ManageBusinessContainer() {

  const {managedBusiness} = useManagedBusiness();

  if (!managedBusiness) return null;

  return (
    <div className="container py-8 flex flex-col gap-6">
      <ManageBusinessBreadcrumbs />

      {/* Business Header */}
      <ManageBusinessHeader />

      {/* Quick Stats */}
      <StatCards />

      {/* Management Sections */}
      <ManagementPanels />

    </div>
  )
}

function ManageBusinessBreadcrumbs() {
  const {managedBusiness} = useManagedBusiness()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{managedBusiness?.name}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  )
}




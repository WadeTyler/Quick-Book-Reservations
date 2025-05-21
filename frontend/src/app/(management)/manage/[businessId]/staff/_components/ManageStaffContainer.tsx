"use client";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
import {StaffTable} from "@/app/(management)/manage/[businessId]/staff/_components/StaffTable";
import AddStaffSheet from "@/app/(management)/manage/[businessId]/staff/_components/AddStaffSheet";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useAuth} from "@/features/auth/context/AuthContext";

export default function ManageStaffContainer() {

  const {managedBusiness} = useManagedBusiness();
  const staffList = managedBusiness?.staff;

  const {authUser} = useAuth();

  if (!managedBusiness || staffList === undefined || !authUser) return null;

  return (
    <div className="container py-8 flex flex-col gap-6">
      <ManageStaffBreadcrumbs />

      <section>
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Manage Staff
        </h1>
        <p>Manage staff members</p>

      </section>

      <section className="sm:ml-auto flex gap-4 flex-col sm:flex-row">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-sm text-accent">What can staff do?</TooltipTrigger>
            <TooltipContent align="center">
              <p>Staff members can view and manage reservations.</p>
              <p>Including creating, updating and deleting reservations.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {managedBusiness.owner.id === authUser.id && (
          <AddStaffSheet />
        )}
      </section>

      <section className="container bg-muted/40 rounded-md shadow-md p-4">
        <StaffTable data={staffList} />
      </section>

    </div>
  )

}

function ManageStaffBreadcrumbs() {
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
        <BreadcrumbPage>Manage Staff</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
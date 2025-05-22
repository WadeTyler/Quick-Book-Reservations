"use client";

import React, {useEffect, useState} from "react";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Reservation} from "@/features/reservation/reservation.types";
import {useManageReservation} from "@/features/reservation/context/ManageReservationContext";
import {
  ManageReservationsTable
} from "@/app/(management)/manage/[businessId]/reservations/_components/manage-reservations-table";
import Loader from "@/components/ui/loader";

export default function ManageReservationsContainer() {


  const {managedBusiness} = useManagedBusiness();
  const {loadReservations, loadReservationsError, isLoadingReservations} = useManageReservation();
  const [reservations, setReservations] = useState<Reservation[] | null>(null);

  async function handleLoadReservations() {
    if (!managedBusiness) {
      setReservations(null);
      return;
    }
    const res = await loadReservations(managedBusiness.id);
    if (res) {
      setReservations(res);
    } else {
      setReservations(null);
    }
  }

  useEffect(() => {
    handleLoadReservations();
  }, [managedBusiness]);

  return (
    <div className="container py-8 flex flex-col gap-6">
      <ManageReservationsBreadcrumbs/>

      <section>
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Manage Reservations
        </h1>
        <p>View, manage, and update your reservations.</p>
      </section>

      {isLoadingReservations && <Loader />}
      {loadReservationsError && <p className="text-destructive text-balance text-center">{loadReservationsError}</p>}
      {!isLoadingReservations && !loadReservationsError && reservations && <ManageReservationsTable data={reservations}/>}

    </div>
  )
}

function ManageReservationsBreadcrumbs() {
  const {managedBusiness} = useManagedBusiness();

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
        <BreadcrumbPage>Manage Reservations</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
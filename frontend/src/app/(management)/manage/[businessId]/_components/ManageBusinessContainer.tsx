"use client";
import {useParams} from "next/navigation";
import {useManagedBusiness} from "@/features/business/hooks/ManagedBusinessContext";
import React, {useEffect} from "react";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, CalendarDaysIcon, LayersIcon } from "lucide-react";
import Image from "next/image";

export default function ManageBusinessContainer() {
  const params = useParams<{ businessId: string }>();
  const businessId = params.businessId;

  const {
    loadManagedBusiness,
    managedBusiness,
    isLoadingManagedBusiness,
    loadManagedBusinessError
  } = useManagedBusiness();

  useEffect(() => {
    loadManagedBusiness(businessId);
  }, [businessId]);

  if (isLoadingManagedBusiness) return (
    <div className="flex w-full h-screen items-center justify-center">
      <Loader className="size-24 text-accent"/>
    </div>
  )

  else if (loadManagedBusinessError || !managedBusiness) return (
    <div className="flex w-full h-screen items-center justify-center text-center flex-col">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="tracking-wide leading-loose text-balance">
        {loadManagedBusinessError}
      </p>
      <Link href={`/dashboard`} className="link-1">
        Back to Dashboard
      </Link>
    </div>
  )

  return (
    <div className="container py-8 flex flex-col gap-6">
      <ManageBusinessBreadcrumbs />

      {/* Business Header */}
      <section className="flex flex-col md:items-center gap-6 md:gap-10">
        <div className="flex gap-4 flex-col items-center md:items-start">
          <div className="aspect-video w-full h-64 relative">
            <Image src={managedBusiness.image || "./default-image.jpg"} alt={`${managedBusiness.name} Image`} fill={true} objectFit="cover" objectPosition="center" className="aspect-square rounded-xl"/>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              {managedBusiness.name}
            </h1>
            <p className="text-muted-foreground text-base mt-1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut doloribus fuga optio quod recusandae? Ab at autem enim itaque libero magni pariatur sapiente velit! Alias aliquid aperiam, architecto consequatur corporis ducimus exercitationem fugit inventore labore laborum laudantium magnam minima, nisi nostrum praesentium qui recusandae saepe, sed ullam veniam? Accusamus, sint.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-2 md:mt-0 md:ml-auto">
          <Button variant="outline" size="sm">
            Edit Business
          </Button>
          <Link href={`/businesses/${businessId}`}>
            <Button variant="default" size="sm">
              View Public Page
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<CalendarDaysIcon className="w-6 h-6 text-accent" />}
          label="Upcoming Reservations"
          value={managedBusiness.upcomingReservationCount}
        />
        <StatCard
          icon={<LayersIcon className="w-6 h-6 text-accent" />}
          label="Services"
          value={managedBusiness.serviceOfferings.length}
        />
        <StatCard
          icon={<UserIcon className="w-6 h-6 text-accent" />}
          label="Staff"
          value={managedBusiness.staff.length}
        />
      </section>

      {/* Management Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {/* Reservations Management */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold tracking-tight">
              Reservations
            </h3>
            <p>View and manage all reservations.</p>
          </CardHeader>

          <CardContent className="mt-auto gap-4 flex flex-col">
            <Link href={`/manage/${businessId}/reservations`}>
              <Button className="w-full" variant={"secondary"}>
                Manage Reservations
              </Button>
            </Link>
            <Link href={`/businesses/${businessId}/create-reservation`} target="_blank">
              <Button className="w-full">
                Create Reservation
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Services Management */}

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold tracking-tight">
              Services
            </h3>
            <p>Edit your offered services.</p>
          </CardHeader>

          <CardContent className="mt-auto gap-4 flex flex-col">
            <Link href={`/manage/${businessId}/services`}>
              <Button className="w-full" variant={"secondary"}>
                Manage Services
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Staff Management */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold tracking-tight">
              Staff
            </h3>
            <p>Invite and manage staff members.</p>
          </CardHeader>

          <CardContent className="mt-auto gap-4 flex flex-col">
            <Link href={`/manage/${businessId}/staff`}>
              <Button className="w-full" variant={"secondary"}>
                Manage Staff
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
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

// Stat Card Component
function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <Card className="flex items-center gap-4 p-5 rounded-xl shadow-sm border-0 bg-muted/60 text-center">
      <div className="bg-accent/20 rounded-lg p-2 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold ">{value}</div>
        <div className="text-muted-foreground text-sm">{label}</div>
      </div>
    </Card>
  );
}

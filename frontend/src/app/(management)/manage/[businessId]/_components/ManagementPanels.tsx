import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";

export default function ManagementPanels() {
  const {managedBusiness} = useManagedBusiness();

  if (!managedBusiness) return null;

  return (
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
          <Link href={`/manage/${managedBusiness.id}/reservations`}>
            <Button className="w-full" variant={"secondary"}>
              Manage Reservations
            </Button>
          </Link>
          <Link href={`/businesses/${managedBusiness.id}/create-reservation`} target="_blank">
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
          <Link href={`/manage/${managedBusiness.id}/services`}>
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
          <Link href={`/manage/${managedBusiness.id}/staff`}>
            <Button className="w-full" variant={"secondary"}>
              Manage Staff
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
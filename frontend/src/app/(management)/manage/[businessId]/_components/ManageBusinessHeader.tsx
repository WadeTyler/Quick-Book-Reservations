import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {useManagedBusiness} from "@/features/business/hooks/ManagedBusinessContext";

export default function ManageBusinessHeader() {

  const {managedBusiness} = useManagedBusiness();

  if (!managedBusiness) return null;

  return (
    <section className="flex flex-col md:items-center gap-6 md:gap-10">
      <div className="flex gap-4 flex-col items-center md:items-start w-full">
        <div className="aspect-video w-full h-64 relative">
          <Image src={managedBusiness.image || "./default-image.jpg"} alt={`${managedBusiness.name} Image`} fill={true} objectFit="cover" objectPosition="center" className="aspect-square rounded-xl"/>
        </div>
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {managedBusiness.name}
          </h1>
          <p className="text-muted-foreground text-base mt-1">
            {managedBusiness.description}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-2 md:mt-0 md:ml-auto">
        <Button variant="outline" size="sm">
          Edit Business
        </Button>
        <Link href={`/businesses/${managedBusiness.id}`}>
          <Button variant="default" size="sm">
            View Public Page
          </Button>
        </Link>
      </div>
    </section>
  )
}
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {useManagedBusiness} from "@/features/business/context/ManagedBusinessContext";
import EditBusinessSheet from "@/app/(management)/manage/[businessId]/_components/EditBusinessSheet";
import {useAuth} from "@/features/auth/context/AuthContext";
import DeleteBusinessSheet from "@/app/(management)/manage/[businessId]/_components/DeleteBusinessSheet";

export default function ManageBusinessHeader() {

  const {managedBusiness} = useManagedBusiness();
  const {authUser} = useAuth();

  if (!managedBusiness || !authUser) return null;

  return (
    <section className="flex flex-col md:items-center gap-6 md:gap-10">
      <div className="flex gap-4 flex-col items-center md:items-start w-full">
        <div className="aspect-video w-full h-64 relative">
          <Image src={managedBusiness.image || "/default-image.jpg"} alt={`${managedBusiness.name} Image`} fill={true} objectFit="cover" objectPosition="center" className="aspect-square rounded-xl"/>
        </div>
        <div className="w-full wrap-anywhere">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {managedBusiness.name}
          </h1>
          <p className="text-muted-foreground text-base mt-1">
            {managedBusiness.description}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-2 md:mt-0 md:ml-auto">

        {managedBusiness.owner.id === authUser.id && <DeleteBusinessSheet />}
        {managedBusiness.owner.id === authUser.id && <EditBusinessSheet managedBusiness={managedBusiness}/>}

        <Link href={`/businesses/${managedBusiness.id}`}>
          <Button variant="default" size="sm">
            View Public Page
          </Button>
        </Link>
      </div>
    </section>
  )
}
"use client";
import {ReactNode, useEffect} from "react";
import {useManagedBusiness} from "@/features/business/hooks/ManagedBusinessContext";
import {useParams} from "next/navigation";
import Loader from "@/components/ui/loader";
import Link from "next/link";

export default function ManageBusinessLayout({children}: { children: ReactNode }) {

  const {
    managedBusiness,
    loadManagedBusiness,
    isLoadingManagedBusiness,
    loadManagedBusinessError
  } = useManagedBusiness();

  const params = useParams<{ businessId: string }>();
  const businessId = params.businessId;

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
      {loadManagedBusinessError && (
        <p className="tracking-wide leading-loose text-balance">
          {loadManagedBusinessError}
        </p>
      )}
      <Link href={`/dashboard`} className="link-1">
        Back to Dashboard
      </Link>
    </div>
  )

  return (
    <>
      {children}
    </>
  )
}
"use client";
import {ReactNode} from "react";
import {useAuth} from "@/features/auth/context/AuthContext";
import Loader from "@/components/ui/loader";
import {useRouter} from "next/navigation";

export default function UnAuthOnly({children, redirect = false, redirectTo = "/dashboard", showLoader = true}: {children: ReactNode, redirect?: boolean, redirectTo?: string, showLoader?: boolean}) {

  const router = useRouter();

  const {authUser, isLoadingAuthUser} = useAuth();

  if (isLoadingAuthUser) return showLoader ? <Loader /> : null;

  else if (!authUser && !isLoadingAuthUser) return (
    <>
      {children}
    </>
  )

  else if (redirect) {
    router.push(redirectTo);
  }

  return null;
}
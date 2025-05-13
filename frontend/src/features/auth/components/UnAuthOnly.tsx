"use client";
import {ReactNode} from "react";
import {useAuth} from "@/features/auth/hooks/AuthContext";
import Loader from "@/components/ui/loader";
import {useRouter} from "next/navigation";

export default function UnAuthOnly({children, redirect = false, redirectTo = "/dashboard"}: {children: ReactNode, redirect?: boolean, redirectTo?: string,}) {

  const router = useRouter();

  const {authUser, isLoadingAuthUser} = useAuth();

  if (isLoadingAuthUser) return <Loader />;

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
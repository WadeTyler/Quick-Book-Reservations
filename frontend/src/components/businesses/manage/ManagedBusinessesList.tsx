'use client';
import React, {useEffect} from 'react';
import ManagedBusinessPanel from "@/components/businesses/manage/ManagedBusinessPanel";
import appProperties from "@/constants/app.properties";
import Link from "next/link";
import {LoadingSpinnerXL} from "@/components/LoadingSpinners";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Business} from "@/types/business.types";
import {fetchAllManagedBusinesses} from "@/lib/business.service";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";
import AuthProvider from "@/providers/AuthProvider";

const ManagedBusinessesList = () => {

  const queryClient = useQueryClient();

  const {
    data: managedBusinesses,
    isPending: isLoadingManagedBusinesses,
    error: loadManagedBusinessesError
  } = useQuery<Business[] | null>({
    queryKey: ['managedBusinesses'],
    queryFn: fetchAllManagedBusinesses
  });

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser
  });

  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['managedBusinesses']});
  }, [authUser, queryClient]);

  return (
    <AuthProvider forceAuth={true}>
      {managedBusinesses && !loadManagedBusinessesError && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8">
          {managedBusinesses.map((business) => (
            <ManagedBusinessPanel key={business.id} business={business}/>
          ))}

          {managedBusinesses && managedBusinesses.length < appProperties.maxUserBusinesses && (
            <Link href="/businesses/manage/create"
                  className="w-full min-h-48 h-full rounded-md border-dashed border-accent border-3 overflow-hidden flex flex-col gap-2 text-accent items-center justify-center hover:bg-accent hover:text-white group duration-200 cursor-pointer p-4 text-center">
                <span
                  className="rounded-full max-w-32 w-full max-h-32 h-full border-accent border-3 border-dashed flex items-center justify-center group-hover:border-white duration-200">
                  <span className="text-6xl" aria-hidden={true}>+</span>
                </span>

              <span>Create new Business</span>
            </Link>
          )}


        </div>
      )}
      {isLoadingManagedBusinesses && (
        <LoadingSpinnerXL/>
      )}
      {!isLoadingManagedBusinesses && !managedBusinesses && loadManagedBusinessesError && (
        <p className="text-center error-msg">{(loadManagedBusinessesError as Error).message}</p>
      )}
    </AuthProvider>
  );
};

export default ManagedBusinessesList;
'use client';
import React, {useEffect} from 'react';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {User} from "@/types/auth.types";
import LoadingScreen from "@/components/LoadingScreen";
import {usePathname, useRouter} from "next/navigation";
import {fetchUser} from '@/features/auth/lib/auth.service';

const AuthProvider = ({forceAuth = false, redirectTo = "/login", forceNoAuth = false, children}: {
  forceAuth?: boolean;
  redirectTo?: string;
  forceNoAuth?: boolean;
  children: React.ReactNode;
}) => {

  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // Auth User
  const {data: authUser, isPending: isLoadingAuthUser, error: loadUserError} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser,
  });

  async function handleLoad() {
    // Invalidate authUser
    await queryClient.invalidateQueries({queryKey: ['authUser']});

  }

  useEffect(() => {
    handleLoad();
  }, []);

  // If loading authuser show loading screen
  if (isLoadingAuthUser) {
    return <LoadingScreen/>
  }

  // Redirect if required and no authuser
  if (!authUser && !isLoadingAuthUser && forceAuth || (forceAuth && loadUserError)) {
    router.push(redirectTo);
    return null;
  }

  // Force no auth
  if (authUser && !isLoadingAuthUser && forceNoAuth || (forceNoAuth && loadUserError)) {
    router.push(redirectTo !== pathname ? redirectTo : '/not-found')
  }

  // Show
  return (
    <>
      {children}
    </>
  );
};

export default AuthProvider;
"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "@/features/auth/lib/auth.service";
import {User} from "@/types/auth.types";
import AuthProvider from "@/features/auth/providers/AuthProvider";

const AccountDetails = () => {

  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser
  })

  return (
    <AuthProvider forceAuth={true}>
      {authUser && (
        <div className="min-w-96 max-w-[55rem] w-fit bg-background-secondary shadow-md rounded-md p-4 flex flex-col">
          <h2 className="text-xl font-semibold tracking-wide">{authUser.firstName} {authUser.lastName}</h2>
          <p>Email: {authUser.username.substring(0, 3) + "*".repeat(authUser.username.length - 3)}</p>
          <p>Account Created: {new Date(authUser.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </AuthProvider>
  );
};

export default AccountDetails;
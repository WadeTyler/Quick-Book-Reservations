'use client';
import React from 'react';
import AuthProvider from "@/providers/AuthProvider";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/types/auth.types";
import {fetchUser} from "@/lib/auth.service";

const AccountPage = () => {

  // Auth User
  const {data: authUser} = useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: fetchUser
  });

  return (
    <AuthProvider forceAuth={true}>
      {authUser && (
        <div className="w-full min-h-screen flex items-center justify-center gap-16 page-padding">

          {/* Account Info */}
          <div className="w-fit h-fit flex flex-col gap-4 bg-background-secondary rounded-md md:p-8 p-4">
            <h1 className="text-3xl font-semibold tracking-wide text-accent">Account Details</h1>

            <hr className="text-accent w-full"/>

            <p><strong>First Name: </strong> {authUser.firstName}</p>
            <p><strong>Last Name: </strong> {authUser.lastName}</p>
            <p><strong>Email: </strong> {authUser.username}</p>
            <p><strong>Created At: </strong> {new Date(authUser.createdAt).toLocaleTimeString()}</p>
          </div>


        </div>
      )}
    </AuthProvider>
  );
};

export default AccountPage;
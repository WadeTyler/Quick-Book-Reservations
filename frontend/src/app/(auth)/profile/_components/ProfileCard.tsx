"use client";

import {useAuth} from "@/features/auth/context/AuthContext";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ChangePasswordSheet from "@/app/(auth)/profile/_components/ChangePasswordSheet";
import DeleteAccountSheet from "@/app/(auth)/profile/_components/DeleteAccountSheet";

export default function ProfileCard() {

  const {authUser} = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight">User Profile</CardTitle>
        <CardDescription>View and manage your account.</CardDescription>
      </CardHeader>
      <CardContent>
        {authUser ? (
          <div className="space-y-4">
            <p><strong>First Name:</strong> {authUser.firstName}</p>
            <p><strong>Last Name:</strong> {authUser.lastName}</p>
            <p><strong>Email:</strong> {authUser.username}</p>

            <div className="flex gap-4">
              <DeleteAccountSheet />
              <ChangePasswordSheet />
            </div>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </CardContent>
    </Card>
  )
}


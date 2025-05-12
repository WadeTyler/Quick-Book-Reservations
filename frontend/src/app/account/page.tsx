import React from 'react';
import AccountDetails from "@/features/auth/components/AccountDetails";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Account | Quick Book",
  description: "View or update your account details."
}

const AccountPage = () => {

  return (
    <div className="w-full min-h-screen page-padding flex flex-col gap-4 items-center">

      <header className="flex flex-col gap-2 text-center">
        <h1>Account Details</h1>
        <p>View or update your account details!</p>
      </header>

      <AccountDetails />

    </div>
  );
};

export default AccountPage;
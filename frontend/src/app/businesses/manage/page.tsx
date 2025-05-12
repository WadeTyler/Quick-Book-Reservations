import React from 'react';
import ManagedBusinessesList from "@/features/business/components/managed-business/ManagedBusinessesList";
import {Metadata} from "next";


export const metadata: Metadata = {
  title: "Managed Businesses | Quick Book",
  description: "Manage your businesses and reservations!"
}

const ManageBusinessesPage = () => {

  return (
      <div className="page-padding-with-breadcrumbs w-full min-h-screen flex flex-col items-center">

        <main className="w-full max-w-[55rem] flex flex-col gap-4 items-center">
          <header className="text-center flex flex-col gap-1">
            <h1 className="text-accent font-semibold tracking-wide text-3xl">Manage Businesses</h1>
            <p>Manage and view your businesses!</p>
          </header>

          <hr className="text-accent w-full"/>

          <ManagedBusinessesList />

        </main>
      </div>
  );
};

export default ManageBusinessesPage;
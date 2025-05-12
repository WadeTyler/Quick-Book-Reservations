import React from 'react';
import ManagedServicePageBreadcrumbs
  from "@/features/service-offering/components/ManagedServicePageBreadcrumbs";
import ManagedServiceContainer from "@/features/service-offering/components/ManagedServiceContainer";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Manage Service | Quick Book",
  description: "Manage your service for your business!"
};

const ManageServicePage = () => {
  return (
    <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col items-center gap-4">
      <ManagedServicePageBreadcrumbs/>
      <ManagedServiceContainer/>
    </div>
  );
};

export default ManageServicePage;
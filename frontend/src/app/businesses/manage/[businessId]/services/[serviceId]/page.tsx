import React from 'react';
import ManagedServicePageBreadcrumbs
  from "@/components/businesses/manage/business/services/service/ManagedServicePageBreadcrumbs";
import ManagedServiceContainer from "@/components/businesses/manage/business/services/service/ManagedServiceContainer";
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
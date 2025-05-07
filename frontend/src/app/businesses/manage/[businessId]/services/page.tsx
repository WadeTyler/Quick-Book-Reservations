import React from 'react';
import AuthProvider from "@/providers/AuthProvider";
import ManageServicesPageBreadcrumbs
  from "@/components/businesses/manage/business/services/ManageServicesPageBreadcrumbs";
import ServicesList from "@/components/businesses/manage/business/services/ServicesList";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Manage Services | Quick Book",
  description: "Manage the services for your business!"
};

const ManageServicesPage = () => {

  return (
    <AuthProvider forceAuth={true}>
      <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col items-center gap-4">
        <ManageServicesPageBreadcrumbs />
        <h1>Manage Services</h1>
        <p>Manage and Create Services for your business!</p>

        <ServicesList />
      </div>
    </AuthProvider>
  );
};

export default ManageServicesPage;
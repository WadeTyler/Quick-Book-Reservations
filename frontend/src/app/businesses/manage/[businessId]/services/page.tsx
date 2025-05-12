import React from 'react';
import AuthProvider from "@/features/auth/providers/AuthProvider";
import ManageServicesPageBreadcrumbs
  from "@/features/service-offering/components/ManageServicesPageBreadcrumbs";
import ServicesList from "@/features/service-offering/components/ServicesList";
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
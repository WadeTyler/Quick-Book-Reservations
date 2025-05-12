import React from 'react';
import CreateServicePageBreadcrumbs
  from "@/features/service-offering/components/CreateServicePageBreadcrumbs";
import CreateServiceForm from "@/features/service-offering/components/CreateServiceForm";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Create Service | Quick Book",
  description: "Create a new service for your business!"
}

const CreateServicePage = () => {
  return (
      <div className="w-full min-h-screen page-padding-with-breadcrumbs flex flex-col items-center">
        <CreateServicePageBreadcrumbs />
        <CreateServiceForm />
      </div>
  );
};

export default CreateServicePage;
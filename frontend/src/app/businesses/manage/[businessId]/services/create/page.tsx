import React from 'react';
import CreateServicePageBreadcrumbs
  from "@/components/businesses/manage/business/services/create/CreateServicePageBreadcrumbs";
import CreateServiceForm from "@/components/businesses/manage/business/services/create/CreateServiceForm";
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
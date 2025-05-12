import React from 'react';

import DeleteServicePageBreadcrumbs
  from "@/features/service-offering/components/DeleteServicePageBreadcrumbs";
import DeleteServiceForm from "@/features/service-offering/components/DeleteServiceForm";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Delete Service | Quick Book",
  description: "Delete a service from your business."
}

const DeleteServicePage = () => {

  return (
      <div className="w-full page-padding-with-breadcrumbs min-h-screen flex flex-col gap-4 items-center">
        <DeleteServicePageBreadcrumbs />
        <DeleteServiceForm />
      </div>
);
};

export default DeleteServicePage;
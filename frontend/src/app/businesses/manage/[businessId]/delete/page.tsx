import React from 'react';
import DeleteBusinessPageBreadcrumbs
  from "@/features/business/components/managed-business/DeleteBusinessPageBreadcrumbs";
import DeleteBusinessForm from "@/features/business/components/managed-business/DeleteBusinessForm";
import {Metadata} from "next";


export const metadata: Metadata = {
  title: "Delete Business | Quick Book",
  description: "Delete your business and it's data."
}

const DeleteBusinessPage = () => {

  return (
    <div className="w-full page-padding-with-breadcrumbs min-h-screen flex flex-col items-center">
      <DeleteBusinessPageBreadcrumbs/>
      <DeleteBusinessForm/>
    </div>
  );
};

export default DeleteBusinessPage;